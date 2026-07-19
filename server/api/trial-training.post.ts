type TrialTrainingRequest = {
  firstName?: string
  lastName?: string
  birthDate?: string
  email?: string
  phone?: string
  team?: string
  experience?: string
  message?: string
  parentName?: string
  parentEmail?: string
  privacyAccepted?: boolean
}

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const isMinor = (birthDate: string) => {
  const birth = new Date(birthDate)

  if (Number.isNaN(birth.getTime())) {
    return false
  }

  const today = new Date()

  let age = today.getFullYear() - birth.getFullYear()

  const birthdayHasNotOccurred =
    today.getMonth() < birth.getMonth()
    || (
      today.getMonth() === birth.getMonth()
      && today.getDate() < birth.getDate()
    )

  if (birthdayHasNotOccurred) {
    age--
  }

  return age < 18
}

export default defineEventHandler(async (event) => {
  const body = await readBody<TrialTrainingRequest>(event)

  if (
    !body.firstName
    || !body.lastName
    || !body.birthDate
    || !body.email
    || !body.team
    || !body.experience
    || body.privacyAccepted !== true
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bitte fülle alle Pflichtfelder aus.',
    })
  }

  if (!isValidEmail(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    })
  }

  const birthDate = new Date(body.birthDate)

  if (Number.isNaN(birthDate.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bitte gib ein gültiges Geburtsdatum ein.',
    })
  }

  if (birthDate > new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Das Geburtsdatum darf nicht in der Zukunft liegen.',
    })
  }

  if (isMinor(body.birthDate)) {
    if (!body.parentName || !body.parentEmail) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Bei Minderjährigen werden die Kontaktdaten einer erziehungsberechtigten Person benötigt.',
      })
    }

    if (!isValidEmail(body.parentEmail)) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Bitte gib eine gültige E-Mail-Adresse der erziehungsberechtigten Person ein.',
      })
    }
  }

  const request = {
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
    birthDate: body.birthDate,
    email: body.email.trim().toLowerCase(),
    phone: body.phone?.trim() || null,
    team: body.team,
    experience: body.experience,
    message: body.message?.trim() || null,
    parentName: body.parentName?.trim() || null,
    parentEmail: body.parentEmail?.trim().toLowerCase() || null,
    submittedAt: new Date().toISOString(),
  }

  /*
   * Aktuell wird die Anfrage nur im Server-Terminal ausgegeben.
   * Später können wir hier E-Mail-Versand, CMS oder Datenbank anbinden.
   */
  console.info('Neue Probetraining-Anfrage:', request)

  return {
    message:
      'Vielen Dank! Deine Anfrage wurde erfolgreich übermittelt. Wir melden uns so bald wie möglich bei dir.',
  }
})