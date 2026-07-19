import type { StrapiArticle } from '~/types/strapi'

export const useNewsData = () => {
  const {
    data: response,
    pending,
    error,
    refresh,
  } = useStrapiArticles()

  const articles = computed<StrapiArticle[]>(() => {
    return response.value?.data ?? []
  })

  const featuredArticle = computed<StrapiArticle | null>(() => {
    return articles.value.find(article => article.featured)
      ?? articles.value[0]
      ?? null
  })

  const remainingArticles = computed<StrapiArticle[]>(() => {
    return articles.value.filter(
      article =>
        article.documentId !== featuredArticle.value?.documentId,
    )
  })

  const homepageArticles = computed<StrapiArticle[]>(() => {
    return remainingArticles.value.slice(0, 4)
  })

  return {
    articles,
    featuredArticle,
    remainingArticles,
    homepageArticles,
    pending,
    error,
    refresh,
  }
}