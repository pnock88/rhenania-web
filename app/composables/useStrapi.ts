export function useStrapi() {
  const config = useRuntimeConfig()

  const baseURL = String(
    config.public.strapiUrl
    || 'http://localhost:1338',
  ).replace(/\/+$/, '')

  const strapi = $fetch.create({
    baseURL,

    headers: {
      Accept: 'application/json',
    },
  })

  const getMediaUrl = (
    path?: string | null,
  ): string => {
    if (!path) {
      return ''
    }

    if (
      path.startsWith('http://')
      || path.startsWith('https://')
      || path.startsWith('data:')
      || path.startsWith('blob:')
    ) {
      return path
    }

    return `${baseURL}/${path.replace(/^\/+/, '')}`
  }

  return {
    strapi,
    baseURL,
    getMediaUrl,
  }
}