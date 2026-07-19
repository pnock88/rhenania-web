type SponsorRequest = {
  company?: string
  contactPerson?: string
  email?: string
  phone?: string
  package?: string
  message?: string
  privacyAccepted?: boolean
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SponsorRequest>(event)

  if (
    !body.company
    || !body.contactPerson
    || !body.email
    || !body.package
    || body.privacyAccepted !== true
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bitte fülle alle Pflichtfelder aus.',
    })
  }

  console.info('Neue Sponsoring-Anfrage:', body)

  return {
    message:
      'Vielen Dank! Deine Sponsoring-Anfrage wurde erfolgreich übermittelt.',
  }
})