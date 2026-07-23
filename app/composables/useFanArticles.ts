import type {
  StrapiCollectionResponse,
  StrapiFanArticle,
} from '~/types/strapi'

import { mapFanArticle } from '~/utils/shop'

export const useFanArticles = () => {
  const {
    strapi,
    getMediaUrl,
  } = useStrapi()

  const {
    data,
    status,
    error,
    refresh,
  } = useAsyncData(
    'fan-articles',
    async () => {
      const query = [
        'populate[images]=true',
        'populate[categories]=true',
        'populate[sizes]=true',
        'populate[badges]=true',
        'populate[colors][populate][Bild]=true',
        'sort[0]=Reihenfolge:asc',
        'sort[1]=Name:asc',
        'filters[Aktiv][$eq]=true',
        'pagination[pageSize]=100',
      ].join('&')

      return await strapi<
        StrapiCollectionResponse<StrapiFanArticle>
      >(`/api/fanartikels?${query}`)
    },
  )

  const articles = computed(() => {
    return (data.value?.data ?? [])
      .filter((article) => {
        return (
          article.Aktiv !== false
          && (
            article.Lagerbestand == null
            || article.Lagerbestand > 0
          )
        )
      })
      .map((article) => {
        return mapFanArticle(
          article,
          getMediaUrl,
        )
      })
  })

  return {
    articles,
    status,
    error,
    refresh,
  }
}