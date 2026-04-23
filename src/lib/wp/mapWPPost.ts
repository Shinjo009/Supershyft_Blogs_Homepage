import type { BlogPost } from '../../types/blog'
import { firstImageUrlFromHtml, stripHtml } from '../html'
import { estimateReadMinutes } from '../readingTime'
import type { WPPost } from './wpTypes'

const FALLBACK_CARD =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect fill="#f3f4f6" width="800" height="450"/></svg>',
  )

function featuredImageUrl(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  if (media?.source_url) {
    return media.source_url
  }
  const fromContent = firstImageUrlFromHtml(post.content?.rendered ?? '')
  if (fromContent) {
    return fromContent
  }
  return FALLBACK_CARD
}

function authorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name?.trim() || 'Editorial team'
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function categoryFromEmbedded(post: WPPost): string | null {
  const groups = post._embedded?.['wp:term']
  if (!groups?.length) {
    return null
  }
  const cats = groups[0]?.filter((t) => t.taxonomy === 'category') ?? []
  return cats[0]?.name ?? null
}

export function mapWPPost(
  post: WPPost,
  categoryById: ReadonlyMap<number, string>,
): BlogPost {
  const primaryCategoryId = post.categories[0]
  const categoryLabel =
    categoryFromEmbedded(post) ||
    (primaryCategoryId !== undefined ? categoryById.get(primaryCategoryId) : undefined) ||
    'Article'

  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered) || stripHtml(post.content.rendered).slice(0, 220),
    author: authorName(post),
    dateDisplay: formatDate(post.date),
    readMinutes: estimateReadMinutes(post.content.rendered || post.excerpt.rendered),
    categoryLabel,
    imageUrl: featuredImageUrl(post),
    href: post.link,
  }
}
