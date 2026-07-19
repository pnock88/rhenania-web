import type {
  StrapiCollectionResponse,
  StrapiMatch,
} from '~/types/strapi'

export const useStrapiTeamMatches = (
  teamDocumentId: MaybeRefOrGetter<string | undefined>,
) => {
  const config = useRuntimeConfig()

  return useFetch<StrapiCollectionResponse<StrapiMatch>>(
    `${config.public.strapiUrl}/api/matches`,
    {
      key: () =>
        `strapi-team-matches-${toValue(teamDocumentId) ?? 'unknown'}`,

      immediate: false,

      watch: [() => toValue(teamDocumentId)],

      query: computed(() => ({
        'filters[team][documentId][$eq]':
          toValue(teamDocumentId) ?? '',

        'populate[team]': 'true',
        'populate[homeLogo]': 'true',
        'populate[awayLogo]': 'true',

        sort: 'dateTime:asc',

        'pagination[pageSize]': 100,
      })),
    },
  )
}