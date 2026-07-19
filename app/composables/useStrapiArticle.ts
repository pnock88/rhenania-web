import type {
  StrapiArticle,
  StrapiCollectionResponse,
} from '~/types/strapi'

export const useStrapiArticle = (
  slug: MaybeRefOrGetter<string>,
) => {
  const config = useRuntimeConfig()

  return useFetch<StrapiCollectionResponse<StrapiArticle>>(
    `${config.public.strapiUrl}/api/articles`,
    {
      key: () => `strapi-article-${toValue(slug)}`,

      query: computed(() => ({
        'filters[slug][$eq]': toValue(slug),
        populate: '*',
      })),
    },
  )
}