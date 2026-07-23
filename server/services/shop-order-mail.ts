import nodemailer from 'nodemailer'

import type { PreparedShopOrder } from '../types/shop'

type SendShopOrderMailOptions = {
  order: PreparedShopOrder
  pdf: Uint8Array
  recipient: string
  smtp: {
    host: string
    port: number
    secure: boolean
    user: string
    password: string
    fromName: string
    fromEmail: string
  }
}

const escapeHtml = (value?: string | null) => {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export const sendShopOrderMails = async ({
  order,
  pdf,
  recipient,
  smtp,
}: SendShopOrderMailOptions) => {
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

  const pdfBuffer = Buffer.from(pdf)

  const attachment = {
    filename: `Bestellung-${order.orderNumber}.pdf`,
    content: pdfBuffer,
    contentType: 'application/pdf',
  }

  const itemRows = order.items
    .map((item) => {
      const variants = [
        item.size ? `Größe: ${escapeHtml(item.size)}` : '',
        item.color ? `Farbe: ${escapeHtml(item.color)}` : '',
      ]
        .filter(Boolean)
        .join(' · ')

      return `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;">
            <strong>${escapeHtml(item.name)}</strong>
            ${
              variants
                ? `<br><small>${variants}</small>`
                : ''
            }
          </td>

          <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center;">
            ${item.quantity}
          </td>

          <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:right;">
            ${formatCurrency(item.price * item.quantity)}
          </td>
        </tr>
      `
    })
    .join('')

  const from = {
    name: smtp.fromName,
    address: smtp.fromEmail,
  }

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: order.customer.email,
    subject: `Neue Fanartikelbestellung ${order.orderNumber}`,
    text: [
      `Neue Fanartikelbestellung ${order.orderNumber}`,
      '',
      `${order.customer.firstName} ${order.customer.lastName}`,
      order.customer.street,
      `${order.customer.zip} ${order.customer.city}`,
      order.customer.email,
      order.customer.phone,
      '',
      `Gesamtsumme: ${formatCurrency(order.calculatedTotal)}`,
      '',
      'Die vollständige Bestellung befindet sich im PDF-Anhang.',
    ].join('\n'),
    html: `
      <h1>Neue Fanartikelbestellung</h1>

      <p>
        Bestellnummer:
        <strong>${escapeHtml(order.orderNumber)}</strong>
      </p>

      <h2>Besteller</h2>

      <p>
        ${escapeHtml(order.customer.firstName)}
        ${escapeHtml(order.customer.lastName)}<br>
        ${escapeHtml(order.customer.street)}<br>
        ${escapeHtml(order.customer.zip)}
        ${escapeHtml(order.customer.city)}<br><br>

        E-Mail:
        <a href="mailto:${escapeHtml(order.customer.email)}">
          ${escapeHtml(order.customer.email)}
        </a><br>

        Telefon:
        ${escapeHtml(order.customer.phone)}
      </p>

      <h2>Artikel</h2>

      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="padding:10px;text-align:left;">Artikel</th>
            <th style="padding:10px;text-align:center;">Menge</th>
            <th style="padding:10px;text-align:right;">Summe</th>
          </tr>
        </thead>

        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <p style="font-size:20px;text-align:right;">
        Gesamtsumme:
        <strong>${formatCurrency(order.calculatedTotal)}</strong>
      </p>

      ${
        order.customer.note
          ? `
            <h2>Bemerkung</h2>
            <p>${escapeHtml(order.customer.note)}</p>
          `
          : ''
      }
    `,
    attachments: [attachment],
  })

  await transporter.sendMail({
    from,
    to: order.customer.email,
    subject:
      `Deine Fanartikelbestellung ${order.orderNumber}`,
    text: [
      `Hallo ${order.customer.firstName},`,
      '',
      'vielen Dank für deine Fanartikelbestellung beim SC Rhenania Hochdahl.',
      '',
      `Bestellnummer: ${order.orderNumber}`,
      `Gesamtsumme: ${formatCurrency(order.calculatedTotal)}`,
      '',
      'Wir melden uns kurzfristig wegen Abholung und Bezahlung.',
      '',
      'Die Bestellübersicht findest du im PDF-Anhang.',
      '',
      'Sportliche Grüße',
      'SC Rhenania Hochdahl 1925 e.V.',
    ].join('\n'),
    html: `
      <h1>Vielen Dank für deine Bestellung</h1>

      <p>
        Hallo ${escapeHtml(order.customer.firstName)},
      </p>

      <p>
        deine Fanartikelbestellung beim
        <strong>SC Rhenania Hochdahl</strong>
        ist bei uns eingegangen.
      </p>

      <p>
        Bestellnummer:
        <strong>${escapeHtml(order.orderNumber)}</strong>
      </p>

      <p>
        Gesamtsumme:
        <strong>${formatCurrency(order.calculatedTotal)}</strong>
      </p>

      <p>
        Wir melden uns kurzfristig wegen Abholung und Bezahlung.
        Die Bestellübersicht findest du im PDF-Anhang.
      </p>

      <p>
        Sportliche Grüße<br>
        <strong>SC Rhenania Hochdahl 1925 e.V.</strong>
      </p>
    `,
    attachments: [attachment],
  })
}