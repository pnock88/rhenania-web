import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
})

export const renderMarkdown = (content?: string | null) => {
  if (!content) {
    return ''
  }

  return markdown.render(content)
}