import { randomUUID } from 'node:crypto'

import type {
  PreparedShopOrder,
  ServerShopOrder,
} from '../../types/shop'

import { createShopOrderPdf } from '../../services/shop-order-pdf'
import { sendShopOrderMails } from '../../services/shop-order-mail'

import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const cleanString = (
  value: unknown,
  maxLength = 500,
) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const createOrderNumber = () => {
  const date = new Date()

  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('')

  const randomPart = randomUUID()
    .replace(/-/g, '')
    .slice(0, 8)
    .toUpperCase()

  return `RH-${datePart}-${randomPart}`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const body = await readBody<ServerShopOrder>(event)

  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ungültige Bestellung.',
    })
  }

  const customer = {
    firstName: cleanString(body.customer?.firstName, 100),
    lastName: cleanString(body.customer?.lastName, 100),
    street: cleanString(body.customer?.street, 150),
    zip: cleanString(body.customer?.zip, 20),
    city: cleanString(body.customer?.city, 100),
    email: cleanString(body.customer?.email, 200),
    phone: cleanString(body.customer?.phone, 50),
    note: cleanString(body.customer?.note, 2_000),
    privacyAccepted:
      body.customer?.privacyAccepted === true,
  }

  if (
    !customer.firstName
    || !customer.lastName
    || !customer.street
    || !customer.zip
    || !customer.city
    || !customer.email
    || !customer.phone
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Bitte alle Pflichtfelder vollständig ausfüllen.',
    })
  }

  if (!isValidEmail(customer.email)) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Bitte eine gültige E-Mail-Adresse angeben.',
    })
  }

  if (!customer.privacyAccepted) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Die Datenschutzerklärung muss bestätigt werden.',
    })
  }

  if (
    !Array.isArray(body.items)
    || body.items.length === 0
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Der Warenkorb ist leer.',
    })
  }

  if (body.items.length > 100) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Der Warenkorb enthält zu viele Positionen.',
    })
  }

  const items = body.items.map((item) => {
    const quantity = Number(item.quantity)
    const price = Number(item.price)

    if (
      !item.productId
      || !item.name
      || !Number.isFinite(quantity)
      || quantity < 1
      || quantity > 100
      || !Number.isFinite(price)
      || price < 0
      || price > 10_000
    ) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Der Warenkorb enthält ungültige Artikel.',
      })
    }

    return {
      cartId: cleanString(item.cartId, 250),
      productId: cleanString(item.productId, 150),
      name: cleanString(item.name, 200),
      subtitle: cleanString(item.subtitle, 200),
      image: cleanString(item.image, 500),
      price: Math.round(price * 100) / 100,
      quantity: Math.floor(quantity),
      size: cleanString(item.size, 50),
      color: cleanString(item.color, 100),
    }
  })

  const calculatedTotal = Math.round(
    items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0,
    ) * 100,
  ) / 100

  if (calculatedTotal <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Die Bestellung besitzt keine gültige Gesamtsumme.',
    })
  }

  const order: PreparedShopOrder = {
    customer,
    items,
    total: calculatedTotal,
    calculatedTotal,
    orderNumber: createOrderNumber(),
    createdAt: new Date(),
  }

  const recipient = String(
    config.shopOrderEmail ?? '',
  ).trim()

  if (!recipient) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Für Bestellungen ist keine Empfängeradresse konfiguriert.',
    })
  }

  try {
    const pdf = await createShopOrderPdf(order)
    
    const pdfPath = join(
    process.cwd(),
    'pdf_bestellungen',
    `Bestellung-${order.orderNumber}.pdf`,
    )

    await writeFile(pdfPath, pdf)

    console.log('PDF gespeichert:', pdfPath)
    /*await sendShopOrderMails({
      order,
      pdf,
      recipient,
      smtp: {
        host: String(config.smtp.host ?? ''),
        port: Number(config.smtp.port ?? 587),
        secure: Boolean(config.smtp.secure),
        user: String(config.smtp.user ?? ''),
        password: String(config.smtp.password ?? ''),
        fromName: String(
          config.smtp.fromName
          ?? 'SC Rhenania Hochdahl',
        ),
        fromEmail: String(
          config.smtp.fromEmail
          ?? config.smtp.user
          ?? '',
        ),
      },
    })*/

    const smtpConfigured =
        Boolean(config.smtp.host)
        && Boolean(config.smtp.user)
        && Boolean(config.smtp.password)
        && Boolean(config.smtp.fromEmail)

        if (smtpConfigured) {
        await sendShopOrderMails({
            order,
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
        }
        else {
        console.warn(
            `SMTP nicht konfiguriert. Bestellung ${order.orderNumber} wurde nur lokal verarbeitet.`,
        )

        console.info({
            orderNumber: order.orderNumber,
            recipient,
            customer: order.customer,
            items: order.items,
            total: order.calculatedTotal,
            pdfBytes: pdf.length,
        })
        }

    console.info(
      `Fanartikelbestellung ${order.orderNumber} wurde versendet.`,
    )

    return {
      message:
        'Deine Bestellung wurde erfolgreich übermittelt.',
      orderNumber: order.orderNumber,
    }
  }
  catch (error) {
    console.error(
      `Fanartikelbestellung ${order.orderNumber} fehlgeschlagen:`,
      error,
    )

    throw createError({
      statusCode: 500,
      statusMessage:
        'Die Bestellung konnte derzeit nicht versendet werden. Bitte versuche es später erneut.',
    })
  }
})