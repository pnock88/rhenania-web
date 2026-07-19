import type {
  StrapiArticle,
  StrapiCollectionResponse,
} from '~/types/strapi'

export const useStrapiArticles = () => {
  const config = useRuntimeConfig()

  return useFetch<StrapiCollectionResponse<StrapiArticle>>(
    `${config.public.strapiUrl}/api/articles`,
    {
      key: 'strapi-articles',

      query: {
        populate: '*',
        sort: 'date:desc',
      },
    },
  )
}