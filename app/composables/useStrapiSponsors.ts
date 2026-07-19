import type {
  StrapiCollectionResponse,
  StrapiSponsor,
} from '~/types/strapi'

export const useStrapiSponsors = () => {
  const config = useRuntimeConfig()

  return useFetch<StrapiCollectionResponse<StrapiSponsor>>(
    `${config.public.strapiUrl}/api/sponsors`,
    {
      key: 'strapi-sponsors',

      query: {
        populate: '*',
        'filters[active][$eq]': true,
        sort: 'order:asc',
        'pagination[pageSize]': 100,
      },
    },
  )
}