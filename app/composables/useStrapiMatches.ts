import type {
  StrapiCollectionResponse,
  StrapiMatch,
} from '~/types/strapi'

export const useStrapiMatches = () => {
  const config = useRuntimeConfig()

  return useFetch<StrapiCollectionResponse<StrapiMatch>>(
    `${config.public.strapiUrl}/api/matches`,
    {
      key: 'strapi-matches',

      query: {
        'populate[team]': 'true',
        'populate[homeLogo]': 'true',
        'populate[awayLogo]': 'true',
        sort: 'dateTime:asc',
        'pagination[pageSize]': 500,
      },
    },
  )
}