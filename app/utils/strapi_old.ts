import type { StrapiMedia } from '~/types/strapi'

export const getStrapiMediaUrl = (
  media: StrapiMedia | null | undefined,
) => {
  if (!media?.url) {
    return '/images/news/news-1.jpg'
  }

  if (
    media.url.startsWith('http://')
    || media.url.startsWith('https://')
  ) {
    return media.url
  }

  const config = useRuntimeConfig()

  return `${config.public.strapiUrl}${media.url}`
}