import type { StrapiMedia } from '~/types/strapi'

export const useStrapiMedia = () => {
  const config = useRuntimeConfig()

  const getStrapiMediaUrl = (
    media: StrapiMedia | null | undefined,
    fallback = '/images/news/news-1.jpg',
  ) => {
    if (!media?.url) {
      return fallback
    }

    if (
      media.url.startsWith('http://')
      || media.url.startsWith('https://')
    ) {
      return media.url
    }

    const baseUrl = String(config.public.strapiUrl).replace(/\/$/, '')
    const mediaPath = media.url.startsWith('/')
      ? media.url
      : `/${media.url}`

    return `${baseUrl}${mediaPath}`
  }

  return {
    getStrapiMediaUrl,
  }
}