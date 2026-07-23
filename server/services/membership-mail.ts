import nodemailer from 'nodemailer'

import type {
  PreparedMembershipRequest,
} from '../types/membership'

type MembershipSmtpConfig = {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  fromName: string
  fromEmail: string
}

type SendMembershipMailOptions = {
  request: PreparedMembershipRequest
  pdf: Uint8Array
  recipient: string
  smtp: MembershipSmtpConfig
}

const escapeHtml = (value?: string | null) => {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const sendMembershipMails = async ({
  request,
  pdf,
  recipient,
  smtp,
}: SendMembershipMailOptions) => {
  if (
    !smtp.host
    || !smtp.port
    || !smtp.user
    || !smtp.password
    || !smtp.fromEmail
  ) {
    throw new Error(
      'Die SMTP-Konfiguration ist unvollständig.',
    )
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.password,
    },
  })

  const attachment = {
    filename:
      `Mitgliedsanmeldung-${request.requestNumber}.pdf`,
    content: Buffer.from(pdf),
    contentType: 'application/pdf',
  }

  const from = {
    name: smtp.fromName,
    address: smtp.fromEmail,
  }

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: request.guardianEmail,
    subject:
      `Neue Mitgliedsanmeldung ${request.requestNumber}`,
    text: [
      `Neue Mitgliedsanmeldung ${request.requestNumber}`,
      '',
      `Mitglied: ${request.playerFirstName} ${request.playerLastName}`,
      `Mannschaft: ${request.team}`,
      `Kontakt: ${request.guardianFirstName} ${request.guardianLastName}`,
      `E-Mail: ${request.guardianEmail}`,
      `Telefon: ${request.guardianPhone}`,
      '',
      'Die vollständigen Angaben befinden sich im PDF-Anhang.',
    ].join('\n'),
    html: `
      <h1>Neue Mitgliedsanmeldung</h1>

      <p>
        Anmeldenummer:
        <strong>${escapeHtml(request.requestNumber)}</strong>
      </p>

      <h2>Mitglied</h2>

      <p>
        ${escapeHtml(request.playerFirstName)}
        ${escapeHtml(request.playerLastName)}<br>
        Mannschaft: ${escapeHtml(request.team)}
      </p>

      <h2>Kontakt</h2>

      <p>
        ${escapeHtml(request.guardianFirstName)}
        ${escapeHtml(request.guardianLastName)}<br>

        <a href="mailto:${escapeHtml(request.guardianEmail)}">
          ${escapeHtml(request.guardianEmail)}
        </a><br>

        ${escapeHtml(request.guardianPhone)}
      </p>

      <p>
        Die vollständigen Angaben einschließlich der Kontodaten
        befinden sich ausschließlich im PDF-Anhang.
      </p>
    `,
    attachments: [attachment],
  })

  await transporter.sendMail({
    from,
    to: request.guardianEmail,
    subject:
      `Deine Mitgliedsanmeldung ${request.requestNumber}`,
    text: [
      `Hallo ${request.guardianFirstName},`,
      '',
      `die Anmeldung für ${request.playerFirstName} ${request.playerLastName} ist bei uns eingegangen.`,
      '',
      `Anmeldenummer: ${request.requestNumber}`,
      '',
      'Wir prüfen die Angaben und melden uns wegen der weiteren Schritte.',
      '',
      'Die übermittelten Angaben findest du im PDF-Anhang.',
      '',
      'Sportliche Grüße',
      'SC Rhenania Hochdahl 1925 e.V.',
    ].join('\n'),
    html: `
      <h1>Vielen Dank für die Anmeldung</h1>

      <p>
        Hallo ${escapeHtml(request.guardianFirstName)},
      </p>

      <p>
        die Anmeldung für
        <strong>
          ${escapeHtml(request.playerFirstName)}
          ${escapeHtml(request.playerLastName)}
        </strong>
        ist bei uns eingegangen.
      </p>

      <p>
        Anmeldenummer:
        <strong>${escapeHtml(request.requestNumber)}</strong>
      </p>

      <p>
        Wir prüfen die Angaben und melden uns wegen der weiteren
        Schritte. Die übermittelten Angaben findest du im
        PDF-Anhang.
      </p>

      <p>
        Sportliche Grüße<br>
        <strong>SC Rhenania Hochdahl 1925 e.V.</strong>
      </p>
    `,
    attachments: [attachment],
  })
}