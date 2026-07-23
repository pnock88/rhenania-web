import type {
  FanArticle,
  FanArticleBadge,
  FanArticleCategory,
  FanArticleColor,
  FanArticleImage,
} from '~/types/shop'

import type {
  StrapiFanArticle,
  StrapiFanArticleBadge,
  StrapiFanArticleCategory,
  StrapiFanArticleColor,
  StrapiFanArticleSize,
  StrapiMedia,
} from '~/types/strapi'

const FALLBACK_IMAGE = '/images/fanshop-placeholder.svg'

const HEX_COLOR_PATTERN =
  /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

const normalizeHexColor = (
  value: string | null | undefined,
  fallback: string,
): string => {
  const color = value?.trim()

  if (!color) {
    return fallback
  }

  return HEX_COLOR_PATTERN.test(color)
    ? color
    : fallback
}

const getMediaPath = (
  media: StrapiMedia,
): string => {
  return (
    media.formats?.medium?.url
    ?? media.formats?.small?.url
    ?? media.formats?.large?.url
    ?? media.url
  )
}

const mapImages = (
  images: StrapiMedia[] | null | undefined,
  articleName: string,
  getMediaUrl: (path?: string | null) => string,
): FanArticleImage[] => {
  return (images ?? [])
    .map((image) => {
      const path = getMediaPath(image)
      const src = getMediaUrl(path)

      if (!src) {
        return null
      }

      return {
        src,
        alt:
          image.alternativeText?.trim()
          || articleName,
      }
    })
    .filter(
      (
        image,
      ): image is FanArticleImage => image !== null,
    )
}

const mapColors = (
  colors: StrapiFanArticleColor[] | null | undefined,
  articleName: string,
  getMediaUrl: (path?: string | null) => string,
): FanArticleColor[] => {
  return (colors ?? [])
    .filter((color) => {
      return Boolean(color.Name?.trim())
    })
    .map((color) => {
      const imagePath = color.Bild
        ? getMediaPath(color.Bild)
        : null

      return {
        name: color.Name.trim(),

        value: normalizeHexColor(
          color.Farbwert,
          '#305CDE',
        ),

        image: imagePath
          ? getMediaUrl(imagePath)
          : undefined,
      }
    })
}

const mapSizes = (
  sizes: StrapiFanArticleSize[] | null | undefined,
): string[] => {
  return [...(sizes ?? [])]
    .filter((size) => {
      return (
        size.Aktiv !== false
        && Boolean(size.Bezeichnung?.trim())
      )
    })
    .sort((a, b) => {
      return (
        (a.Sortierung ?? Number.MAX_SAFE_INTEGER)
        - (b.Sortierung ?? Number.MAX_SAFE_INTEGER)
      )
    })
    .map(size => size.Bezeichnung.trim())
}

const mapBadges = (
  badges: StrapiFanArticleBadge[] | null | undefined,
): FanArticleBadge[] => {
  return [...(badges ?? [])]
    .filter((badge) => {
      return (
        badge.Aktiv !== false
        && Boolean(badge.Titel?.trim())
      )
    })
    .sort((a, b) => {
      return (
        (a.Sortierung ?? Number.MAX_SAFE_INTEGER)
        - (b.Sortierung ?? Number.MAX_SAFE_INTEGER)
      )
    })
    .map((badge) => {
      return {
        id:
          badge.documentId
          || String(badge.id),

        label: badge.Titel.trim(),

        backgroundColor: normalizeHexColor(
          badge.Hintergrundfarbe,
          '#1e293b',
        ),

        textColor: normalizeHexColor(
          badge.Textfarbe,
          '#ffffff',
        ),
      }
    })
}

const mapCategories = (
  categories:
    | StrapiFanArticleCategory[]
    | null
    | undefined,
): FanArticleCategory[] => {
  return (categories ?? [])
    .filter((category) => {
      return (
        category.Aktiv !== false
        && Boolean(category.Name?.trim())
        && Boolean(category.Slug?.trim())
      )
    })
    .map((category) => {
      return {
        id:
          category.documentId
          || String(category.id),

        name: category.Name.trim(),
        slug: category.Slug.trim(),
      }
    })
}

const removeDuplicateImages = (
  images: FanArticleImage[],
): FanArticleImage[] => {
  return images.filter((image, index, allImages) => {
    return (
      allImages.findIndex((candidate) => {
        return candidate.src === image.src
      }) === index
    )
  })
}

export const mapFanArticle = (
  article: StrapiFanArticle,
  getMediaUrl: (path?: string | null) => string,
): FanArticle => {
  const regularImages = mapImages(
    article.images,
    article.Name,
    getMediaUrl,
  )

  const colors = mapColors(
    article.colors,
    article.Name,
    getMediaUrl,
  )

  const colorImages: FanArticleImage[] = colors
    .filter((color) => {
      return Boolean(color.image)
    })
    .map((color) => {
      return {
        src: color.image!,
        alt: `${article.Name} – ${color.name}`,
        color: color.name,
      }
    })

  const images = removeDuplicateImages([
    ...regularImages,
    ...colorImages,
  ])

  return {
    id:
      article.documentId
      || article.Slug
      || String(article.id),

    slug: article.Slug,
    name: article.Name,

    subtitle:
      article.Kurzbeschreibung?.trim()
      || undefined,

    description:
      article.Beschreibung?.trim()
      || undefined,

    material:
      article.Material?.trim()
      || undefined,

    price: Number(article.Preis),

    oldPrice:
      article.AlterPreis == null
        ? undefined
        : Number(article.AlterPreis),

    image:
      images[0]?.src
      ?? FALLBACK_IMAGE,

    images:
      images.length > 0
        ? images
        : undefined,

    sizes: mapSizes(article.sizes),
    colors,
    badges: mapBadges(article.badges),
    categories: mapCategories(article.categories),

    stock: Math.max(
      0,
      Number(article.Lagerbestand ?? 0),
    ),

    highlight:
      article.Highlight === true,
  }
}