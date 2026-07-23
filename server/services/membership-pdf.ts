import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib'

import type {
  PreparedMembershipRequest,
} from '../types/membership'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const PAGE_MARGIN = 48
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2

const cleanText = (value?: string | null) => {
  return String(value ?? '')
    .replace(/\r/g, '')
    .trim()
}

const formatDate = (value: string) => {
  if (!value) {
    return ''
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

const formatCreatedAt = (value: Date) => {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)
}

const genderLabel = (
  value: PreparedMembershipRequest['gender'],
) => {
  switch (value) {
    case 'male':
      return 'Männlich'

    case 'female':
      return 'Weiblich'

    case 'diverse':
      return 'Divers'

    default:
      return ''
  }
}

const registrationLabel = (
  value: PreparedMembershipRequest['registrationType'],
) => {
  return value === 'transfer'
    ? 'Vereinswechsel'
    : 'Erstanmeldung'
}

const wrapText = (
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
) => {
  const words = cleanText(text)
    .split(/\s+/)
    .filter(Boolean)

  if (!words.length) {
    return []
  }

  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const candidate = currentLine
      ? `${currentLine} ${word}`
      : word

    if (
      font.widthOfTextAtSize(candidate, size)
      <= maxWidth
    ) {
      currentLine = candidate
      continue
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    currentLine = word
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

export const createMembershipPdf = async (
  request: PreparedMembershipRequest,
): Promise<Uint8Array> => {
  const document = await PDFDocument.create()

  const regularFont = await document.embedFont(
    StandardFonts.Helvetica,
  )

  const boldFont = await document.embedFont(
    StandardFonts.HelveticaBold,
  )

  let page: PDFPage
  let y = 0

  const addPage = () => {
    page = document.addPage([
      PAGE_WIDTH,
      PAGE_HEIGHT,
    ])

    y = PAGE_HEIGHT - PAGE_MARGIN

    page.drawText(
      'SC Rhenania Hochdahl 1925 e.V.',
      {
        x: PAGE_MARGIN,
        y,
        size: 17,
        font: boldFont,
        color: rgb(0.06, 0.18, 0.32),
      },
    )

    page.drawText('Mitgliedsanmeldung', {
      x: PAGE_MARGIN,
      y: y - 24,
      size: 10,
      font: regularFont,
      color: rgb(0.38, 0.42, 0.48),
    })

    page.drawLine({
      start: {
        x: PAGE_MARGIN,
        y: y - 40,
      },
      end: {
        x: PAGE_WIDTH - PAGE_MARGIN,
        y: y - 40,
      },
      thickness: 1,
      color: rgb(0.83, 0.86, 0.9),
    })

    y -= 65
  }

  const ensureSpace = (height: number) => {
    if (y - height < PAGE_MARGIN) {
      addPage()
    }
  }

  const drawSection = (title: string) => {
    ensureSpace(45)

    y -= 10

    page.drawText(title, {
      x: PAGE_MARGIN,
      y,
      size: 13,
      font: boldFont,
      color: rgb(0.06, 0.18, 0.32),
    })

    y -= 10

    page.drawLine({
      start: {
        x: PAGE_MARGIN,
        y,
      },
      end: {
        x: PAGE_WIDTH - PAGE_MARGIN,
        y,
      },
      thickness: 0.75,
      color: rgb(0.85, 0.87, 0.9),
    })

    y -= 20
  }

  const drawRow = (
    label: string,
    value?: string | null,
  ) => {
    const cleanedValue = cleanText(value)

    if (!cleanedValue) {
      return
    }

    const valueLines = wrapText(
      cleanedValue,
      regularFont,
      10,
      CONTENT_WIDTH - 135,
    )

    const requiredHeight =
      Math.max(1, valueLines.length) * 15 + 4

    ensureSpace(requiredHeight)

    page.drawText(label, {
      x: PAGE_MARGIN,
      y,
      size: 9,
      font: boldFont,
      color: rgb(0.4, 0.44, 0.5),
    })

    valueLines.forEach((line, index) => {
      page.drawText(line, {
        x: PAGE_MARGIN + 135,
        y: y - index * 15,
        size: 10,
        font: regularFont,
        color: rgb(0.08, 0.11, 0.16),
      })
    })

    y -= requiredHeight
  }

  addPage()

  page.drawText(
    `Anmeldung ${request.requestNumber}`,
    {
      x: PAGE_MARGIN,
      y,
      size: 20,
      font: boldFont,
      color: rgb(0.06, 0.18, 0.32),
    },
  )

  y -= 26

  page.drawText(
    `Eingegangen am ${formatCreatedAt(request.createdAt)}`,
    {
      x: PAGE_MARGIN,
      y,
      size: 9,
      font: regularFont,
      color: rgb(0.4, 0.44, 0.5),
    },
  )

  y -= 32

  drawSection('Art der Anmeldung')

  drawRow(
    'Anmeldung',
    registrationLabel(request.registrationType),
  )

  if (request.registrationType === 'transfer') {
    drawRow('Bisheriger Verein', request.previousClub)
  }

  drawSection('Daten des Mitglieds')

  drawRow(
    'Name',
    `${request.playerFirstName} ${request.playerLastName}`,
  )

  drawRow('Geschlecht', genderLabel(request.gender))

  drawRow(
    'Anschrift',
    `${request.playerStreet}, ${request.playerZip} ${request.playerCity}`,
  )

  drawRow(
    'Geburtsdatum',
    formatDate(request.birthDate),
  )

  drawRow('Geburtsort', request.birthPlace)
  drawRow('Nationalität', request.nationality)

  drawSection('Erziehungsberechtigte Person')

  drawRow(
    'Name',
    `${request.guardianFirstName} ${request.guardianLastName}`,
  )

  drawRow(
    'Anschrift',
    `${request.guardianStreet}, ${request.guardianZip} ${request.guardianCity}`,
  )

  drawRow('E-Mail', request.guardianEmail)
  drawRow('Telefon', request.guardianPhone)

  drawSection('Kontodaten')

  drawRow('Kontoinhaber', request.accountHolder)
  drawRow('IBAN', request.iban)
  drawRow('Kreditinstitut', request.bankName)

  drawSection('Sportliche Zuordnung')

  drawRow('Mannschaft', request.team)

  if (request.message) {
    drawRow('Bemerkung', request.message)
  }

  ensureSpace(75)

  y -= 20

  page.drawText(
    'Die Angaben wurden über das Onlineformular des SC Rhenania Hochdahl übermittelt.',
    {
      x: PAGE_MARGIN,
      y,
      size: 9,
      font: regularFont,
      color: rgb(0.4, 0.44, 0.5),
    },
  )

  y -= 15

  page.drawText(
    'Die Verarbeitung erfolgt ausschließlich zum Zweck der Vereinsanmeldung.',
    {
      x: PAGE_MARGIN,
      y,
      size: 9,
      font: regularFont,
      color: rgb(0.4, 0.44, 0.5),
    },
  )

  return document.save()
}