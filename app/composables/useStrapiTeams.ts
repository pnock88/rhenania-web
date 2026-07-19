import type {
  StrapiCollectionResponse,
  StrapiTeam,
} from '~/types/strapi'

export const useStrapiTeams = () => {
  const config = useRuntimeConfig()

  return useFetch<StrapiCollectionResponse<StrapiTeam>>(
    `${config.public.strapiUrl}/api/teams`,
    {
      key: 'strapi-teams',

      query: {
        'populate[image]': 'true',
        'populate[trainingSessions]': 'true',
        'populate[coaches][populate][image]': 'true',

        'filters[active][$eq]': true,

        sort: 'order:asc',

        'pagination[pageSize]': 100,
      },
    },
  )
}