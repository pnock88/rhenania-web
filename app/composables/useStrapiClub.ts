import type {
  StrapiClub,
  StrapiSingleResponse,
} from '~/types/strapi'

export const useStrapiClub = () => {
  const config = useRuntimeConfig()

  return useFetch<StrapiSingleResponse<StrapiClub>>(
    `${config.public.strapiUrl}/api/verein`,
    {
      key: 'strapi-club',
      query: {
        'populate[heroImage]': 'true',
        'populate[historyImage]': 'true',
        'populate[historyEntries][populate][image]': 'true',
        'populate[chairman][populate][image]': 'true',
        'populate[viceChairman][populate][image]': 'true',
        'populate[managingDirector][populate][image]': 'true',
        'populate[cashier][populate][image]': 'true',
        'populate[viceCashier][populate][image]': 'true',
        'populate[youthManager][populate][image]': 'true',
        'populate[viceYouthManager][populate][image]': 'true',
        },
    },
  )
}