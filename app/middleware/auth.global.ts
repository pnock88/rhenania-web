export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) {
    return
  }

  const username = 'rhenania'
  const password = '1925'

  const key = 'site-authenticated'

  if (sessionStorage.getItem(key)) {
    return
  }

  const user = window.prompt('Benutzername')

  if (user !== username) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht autorisiert',
    })
  }

  const pass = window.prompt('Passwort')

  if (pass !== password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht autorisiert',
    })
  }

  sessionStorage.setItem(key, 'true')
})