import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib'

import type {
  PreparedShopOrder,
  ServerOrderItem,
} from '../types/shop'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const PAGE_MARGIN = 50
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const cleanText = (value?: string | null) => {
  return String(value ?? '')
    .replace(/\r/g, '')
    .trim()
}

const wrapText = (
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number,
) => {
  const words = cleanText(text).split(/\s+/).filter(Boolean)

  if (!words.length) {
    return ['']
  }

  const lines: string[] = []
  let currentLine = ''

  words.forEach((word) => {
    const candidate = currentLine
      ? `${currentLine} ${word}`
      : word

    const width = font.widthOfTextAtSize(
      candidate,
      fontSize,
    )

    if (width <= maxWidth) {
      currentLine = candidate
      return
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    currentLine = word
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

const getItemDescription = (item: ServerOrderItem) => {
  const variants = [
    item.size ? `Größe: ${item.size}` : '',
    item.color ? `Farbe: ${item.color}` : '',
  ].filter(Boolean)

  return variants.join(' · ')
}

export const createShopOrderPdf = async (
  order: PreparedShopOrder,
): Promise<Uint8Array> => {
  const pdfDocument = await PDFDocument.create()

  const regularFont = await pdfDocument.embedFont(
    StandardFonts.Helvetica,
  )

  const boldFont = await pdfDocument.embedFont(
    StandardFonts.HelveticaBold,
  )

  let page: PDFPage
  let y: number

  const addPage = () => {
    page = pdfDocument.addPage([
      PAGE_WIDTH,
      PAGE_HEIGHT,
    ])

    y = PAGE_HEIGHT - PAGE_MARGIN

    page.drawText('SC Rhenania Hochdahl 1925 e.V.', {
      x: PAGE_MARGIN,
      y,
      size: 18,
      font: boldFont,
      color: rgb(0.06, 0.18, 0.32),
    })

    page.drawText('Fanartikel-Bestellung', {
      x: PAGE_MARGIN,
      y: y - 25,
      size: 11,
      font: regularFont,
      color: rgb(0.35, 0.4, 0.47),
    })

    page.drawLine({
      start: {
        x: PAGE_MARGIN,
        y: y - 42,
      },
      end: {
        x: PAGE_WIDTH - PAGE_MARGIN,
        y: y - 42,
      },
      thickness: 1,
      color: rgb(0.85, 0.87, 0.9),
    })

    y -= 70
  }

  const ensureSpace = (requiredHeight: number) => {
    if (y - requiredHeight < PAGE_MARGIN) {
      addPage()
    }
  }

  const drawLabelValue = (
    label: string,
    value: string,
  ) => {
    if (!cleanText(value)) {
      return
    }

    ensureSpace(34)

    page.drawText(label, {
      x: PAGE_MARGIN,
      y,
      size: 9,
      font: boldFont,
      color: rgb(0.4, 0.44, 0.5),
    })

    page.drawText(cleanText(value), {
      x: PAGE_MARGIN + 115,
      y,
      size: 10,
      font: regularFont,
      color: rgb(0.08, 0.11, 0.16),
    })

    y -= 18
  }

  addPage()

  page.drawText(`Bestellung ${order.orderNumber}`, {
    x: PAGE_MARGIN,
    y,
    size: 22,
    font: boldFont,
    color: rgb(0.06, 0.18, 0.32),
  })

  y -= 28

  page.drawText(`Eingegangen am ${formatDate(order.createdAt)}`, {
    x: PAGE_MARGIN,
    y,
    size: 10,
    font: regularFont,
    color: rgb(0.4, 0.44, 0.5),
  })

  y -= 38

  page.drawText('Besteller', {
    x: PAGE_MARGIN,
    y,
    size: 14,
    font: boldFont,
    color: rgb(0.08, 0.11, 0.16),
  })

  y -= 25

  drawLabelValue(
    'Name',
    `${order.customer.firstName} ${order.customer.lastName}`,
  )

  drawLabelValue(
    'Anschrift',
    `${order.customer.street}, ${order.customer.zip} ${order.customer.city}`,
  )

  drawLabelValue('E-Mail', order.customer.email)
  drawLabelValue('Telefon', order.customer.phone)

  y -= 18

  page.drawText('Bestellte Artikel', {
    x: PAGE_MARGIN,
    y,
    size: 14,
    font: boldFont,
    color: rgb(0.08, 0.11, 0.16),
  })

  y -= 26

  page.drawLine({
    start: {
      x: PAGE_MARGIN,
      y,
    },
    end: {
      x: PAGE_WIDTH - PAGE_MARGIN,
      y,
    },
    thickness: 1,
    color: rgb(0.8, 0.83, 0.87),
  })

  y -= 20

  order.items.forEach((item) => {
    const itemNameLines = wrapText(
      item.name,
      boldFont,
      11,
      270,
    )

    const variantText = getItemDescription(item)

    const requiredHeight =
      itemNameLines.length * 15
      + (variantText ? 17 : 0)
      + 38

    ensureSpace(requiredHeight)

    const itemTop = y

    itemNameLines.forEach((line) => {
      page.drawText(line, {
        x: PAGE_MARGIN,
        y,
        size: 11,
        font: boldFont,
        color: rgb(0.08, 0.11, 0.16),
      })

      y -= 15
    })

    if (variantText) {
      page.drawText(variantText, {
        x: PAGE_MARGIN,
        y,
        size: 9,
        font: regularFont,
        color: rgb(0.4, 0.44, 0.5),
      })

      y -= 17
    }

    page.drawText(
      `${item.quantity} × ${formatCurrency(item.price)}`,
      {
        x: PAGE_MARGIN,
        y,
        size: 10,
        font: regularFont,
        color: rgb(0.25, 0.29, 0.35),
      },
    )

    const totalText = formatCurrency(
      item.price * item.quantity,
    )

    page.drawText(totalText, {
      x:
        PAGE_WIDTH
        - PAGE_MARGIN
        - boldFont.widthOfTextAtSize(totalText, 11),
      y: itemTop,
      size: 11,
      font: boldFont,
      color: rgb(0.08, 0.11, 0.16),
    })

    y -= 18

    page.drawLine({
      start: {
        x: PAGE_MARGIN,
        y,
      },
      end: {
        x: PAGE_WIDTH - PAGE_MARGIN,
        y,
      },
      thickness: 0.5,
      color: rgb(0.9, 0.91, 0.93),
    })

    y -= 18
  })

  ensureSpace(80)

  const totalText = formatCurrency(
    order.calculatedTotal,
  )

  page.drawText('Gesamtsumme', {
    x: PAGE_MARGIN,
    y,
    size: 14,
    font: boldFont,
    color: rgb(0.08, 0.11, 0.16),
  })

  page.drawText(totalText, {
    x:
      PAGE_WIDTH
      - PAGE_MARGIN
      - boldFont.widthOfTextAtSize(totalText, 16),
    y,
    size: 16,
    font: boldFont,
    color: rgb(0.06, 0.18, 0.32),
  })

  y -= 42

  if (cleanText(order.customer.note)) {
    ensureSpace(100)

    page.drawText('Bemerkung', {
      x: PAGE_MARGIN,
      y,
      size: 12,
      font: boldFont,
      color: rgb(0.08, 0.11, 0.16),
    })

    y -= 20

    const noteLines = wrapText(
      order.customer.note ?? '',
      regularFont,
      10,
      CONTENT_WIDTH,
    )

    noteLines.forEach((line) => {
      ensureSpace(18)

      page.drawText(line, {
        x: PAGE_MARGIN,
        y,
        size: 10,
        font: regularFont,
        color: rgb(0.25, 0.29, 0.35),
      })

      y -= 15
    })
  }

  ensureSpace(80)

  y -= 25

  page.drawText(
    'Abholung und Bezahlung erfolgen nach persönlicher Absprache.',
    {
      x: PAGE_MARGIN,
      y,
      size: 10,
      font: regularFont,
      color: rgb(0.35, 0.4, 0.47),
    },
  )

  y -= 16

  page.drawText(
    'Sportanlage Grünstraße · Grünstraße 17 · 40699 Erkrath',
    {
      x: PAGE_MARGIN,
      y,
      size: 10,
      font: regularFont,
      color: rgb(0.35, 0.4, 0.47),
    },
  )

  return pdfDocument.save()
}