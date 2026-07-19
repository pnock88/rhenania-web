type ContactRequest = {
  name?: string
  email?: string
  subject?: string
  message?: string
  privacyAccepted?: boolean
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactRequest>(event)

  if (
    !body.name
    || !body.email
    || !body.subject
    || !body.message
    || body.privacyAccepted !== true
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bitte fülle alle Pflichtfelder aus.',
    })
  }

  console.info('Neue Kontaktanfrage:', body)

  return {
    message:
      'Vielen Dank! Deine Nachricht wurde erfolgreich übermittelt.',
  }
})