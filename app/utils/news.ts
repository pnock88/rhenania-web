import { newsItems } from '~/data/news'

export const getNewsItems = () => {
  return [...newsItems].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime()
      - new Date(a.publishedAt).getTime(),
  )
}

export const getNewsBySlug = (slug: string) => {
  return newsItems.find(item => item.slug === slug)
}