export const formatArticleDate = (
  date: string | null | undefined,
) => {
  if (!date) {
    return ''
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate)
}