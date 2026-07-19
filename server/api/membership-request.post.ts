type MembershipRequest = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  birthDate?: string
  membershipType?: string
  message?: string
  privacyAccepted?: boolean
}

export default defineEventHandler(async (event) => {
  const body = await readBody<MembershipRequest>(event)

  if (
    !body.firstName
    || !body.lastName
    || !body.email
    || !body.birthDate
    || !body.membershipType
    || body.privacyAccepted !== true
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bitte fülle alle Pflichtfelder aus.',
    })
  }

  console.info('Neue Mitgliedsanfrage:', body)

  return {
    message:
      'Vielen Dank! Deine Mitgliedsanfrage wurde erfolgreich übermittelt.',
  }
})