import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import type {
  MembershipGender,
  MembershipRequest,
  PreparedMembershipRequest,
  RegistrationType,
} from '../types/membership'

import {
  createMembershipPdf,
} from '../services/membership-pdf'

import {
  sendMembershipMails,
} from '../services/membership-mail'

const cleanString = (
  value: unknown,
  maxLength = 500,
) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const normalizeIban = (value: string) => {
  return value
    .replace(/\s/g, '')
    .toUpperCase()
}

const isValidIbanFormat = (value: string) => {
  return /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value)
}

const createRequestNumber = () => {
  const now = new Date()

  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('')

  const randomPart = randomUUID()
    .replace(/-/g, '')
    .slice(0, 8)
    .toUpperCase()

  return `MIT-${datePart}-${randomPart}`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const body = await readBody<MembershipRequest>(event)

  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ungültige Anmeldung.',
    })
  }

  const registrationType = cleanString(
    body.registrationType,
    20,
  ) as RegistrationType

  const gender = cleanString(
    body.gender,
    20,
  ) as MembershipGender

  const request: PreparedMembershipRequest = {
    registrationType,
    previousClub: cleanString(body.previousClub, 200),

    playerFirstName:
      cleanString(body.playerFirstName, 100),

    playerLastName:
      cleanString(body.playerLastName, 100),

    gender,

    playerStreet:
      cleanString(body.playerStreet, 150),

    playerZip:
      cleanString(body.playerZip, 20),

    playerCity:
      cleanString(body.playerCity, 100),

    birthDate:
      cleanString(body.birthDate, 20),

    birthPlace:
      cleanString(body.birthPlace, 100),

    nationality:
      cleanString(body.nationality, 100),

    guardianFirstName:
      cleanString(body.guardianFirstName, 100),

    guardianLastName:
      cleanString(body.guardianLastName, 100),

    guardianStreet:
      cleanString(body.guardianStreet, 150),

    guardianZip:
      cleanString(body.guardianZip, 20),

    guardianCity:
      cleanString(body.guardianCity, 100),

    guardianEmail:
      cleanString(body.guardianEmail, 200),

    guardianPhone:
      cleanString(body.guardianPhone, 50),

    accountHolder:
      cleanString(body.accountHolder, 200),

    iban:
      normalizeIban(cleanString(body.iban, 34)),

    bankName:
      cleanString(body.bankName, 150),

    team:
      cleanString(body.team, 150),

    message:
      cleanString(body.message, 2_000),

    privacyAccepted:
      body.privacyAccepted === true,

    requestNumber: createRequestNumber(),
    createdAt: new Date(),
  }

  if (
    !request.playerFirstName
    || !request.playerLastName
    || !request.gender
    || !request.playerStreet
    || !request.playerZip
    || !request.playerCity
    || !request.birthDate
    || !request.birthPlace
    || !request.nationality
    || !request.guardianFirstName
    || !request.guardianLastName
    || !request.guardianStreet
    || !request.guardianZip
    || !request.guardianCity
    || !request.guardianEmail
    || !request.guardianPhone
    || !request.accountHolder
    || !request.iban
    || !request.bankName
    || !request.team
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Bitte alle Pflichtfelder vollständig ausfüllen.',
    })
  }

  if (
    request.registrationType !== 'initial'
    && request.registrationType !== 'transfer'
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Die Art der Anmeldung ist ungültig.',
    })
  }

  if (
    request.registrationType === 'transfer'
    && !request.previousClub
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Bitte den bisherigen Verein angeben.',
    })
  }

  if (
    !['male', 'female', 'diverse']
      .includes(request.gender)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Bitte ein gültiges Geschlecht auswählen.',
    })
  }

  if (!isValidEmail(request.guardianEmail)) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Bitte eine gültige E-Mail-Adresse angeben.',
    })
  }

  if (!isValidIbanFormat(request.iban)) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Bitte eine gültige IBAN angeben.',
    })
  }

  if (!request.privacyAccepted) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Die Datenschutzerklärung muss bestätigt werden.',
    })
  }

  const recipient = String(
    config.membershipEmail ?? '',
  ).trim()

  if (!import.meta.dev && !recipient) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Für Mitgliedsanmeldungen ist keine Empfängeradresse konfiguriert.',
    })
  }

  try {
    const pdf = await createMembershipPdf(request)

    if (import.meta.dev) {
      const directory = join(
        process.cwd(),
        'pdf_anmeldungen',
      )

      await mkdir(directory, {
        recursive: true,
      })

      const filePath = join(
        directory,
        `Mitgliedsanmeldung-${request.requestNumber}.pdf`,
      )

      await writeFile(filePath, pdf)

      console.info(
        `Mitgliedsanmeldung lokal gespeichert: ${filePath}`,
      )
    }

    const smtpConfigured =
      Boolean(config.smtp.host)
      && Boolean(config.smtp.user)
      && Boolean(config.smtp.password)
      && Boolean(config.smtp.fromEmail)
      && Boolean(recipient)

    if (smtpConfigured) {
      await sendMembershipMails({
        request,
        pdf,
        recipient,
        smtp: {
          host: String(config.smtp.host),
          port: Number(config.smtp.port ?? 587),
          secure: Boolean(config.smtp.secure),
          user: String(config.smtp.user),
          password: String(config.smtp.password),
          fromName: String(
            config.smtp.fromName
            ?? 'SC Rhenania Hochdahl',
          ),
          fromEmail: String(config.smtp.fromEmail),
        },
      })

      console.info(
        `Mitgliedsanmeldung ${request.requestNumber} wurde per E-Mail versendet.`,
      )
    }
    else if (import.meta.dev) {
      console.warn(
        `Lokaler Entwicklungsmodus: Anmeldung ${request.requestNumber} wurde nur als PDF gespeichert.`,
      )
    }
    else {
      throw new Error(
        'Die SMTP-Konfiguration ist unvollständig.',
      )
    }

    return {
      message: import.meta.dev
        ? 'Die Mitgliedsanmeldung wurde lokal als PDF erstellt.'
        : 'Die Mitgliedsanmeldung wurde erfolgreich übermittelt.',
      requestNumber: request.requestNumber,
    }
  }
  catch (error) {
    console.error(
      `Mitgliedsanmeldung ${request.requestNumber} fehlgeschlagen.`,
      error,
    )

    throw createError({
      statusCode: 500,
      statusMessage:
        'Die Mitgliedsanmeldung konnte derzeit nicht verarbeitet werden.',
    })
  }
})