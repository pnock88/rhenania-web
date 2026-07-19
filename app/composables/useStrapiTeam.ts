import type {
  StrapiCollectionResponse,
  StrapiTeam,
} from '~/types/strapi'

export const useStrapiTeam = (
  slug: MaybeRefOrGetter<string>,
) => {
  const config = useRuntimeConfig()

  return useFetch<StrapiCollectionResponse<StrapiTeam>>(
    `${config.public.strapiUrl}/api/teams`,
    {
      key: () => `strapi-team-${toValue(slug)}`,

      query: computed(() => ({
        'filters[slug][$eq]': toValue(slug),
        'filters[active][$eq]': true,

        'populate[image]': 'true',
        'populate[trainingSessions]': 'true',
        'populate[coaches][populate][image]': 'true',
      })),
    },
  )
}