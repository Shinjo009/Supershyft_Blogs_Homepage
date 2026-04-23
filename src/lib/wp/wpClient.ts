import type { WPCategory, WPPost } from './wpTypes'

const DEFAULT_HEADERS = {
  Accept: 'application/json',
} as const

/** Avoid hung requests when the API or network stalls. */
const REQUEST_TIMEOUT_MS = 18_000

async function readJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`WordPress request failed (${res.status}): ${body.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

async function fetchWpJson<T>(url: string): Promise<T> {
  const signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  const res = await fetch(url, { headers: DEFAULT_HEADERS, signal })
  return readJson<T>(res)
}

export async function fetchCategories(apiBase: string): Promise<WPCategory[]> {
  const url = new URL(`${apiBase.replace(/\/$/, '')}/categories`)
  url.searchParams.set('per_page', '100')
  url.searchParams.set('hide_empty', 'false')
  return fetchWpJson<WPCategory[]>(url.toString())
}

export async function fetchPosts(
  apiBase: string,
  options: { categoryId?: number | null; perPage?: number } = {},
): Promise<WPPost[]> {
  const url = new URL(`${apiBase.replace(/\/$/, '')}/posts`)
  url.searchParams.set('_embed', '1')
  url.searchParams.set('per_page', String(options.perPage ?? 12))
  url.searchParams.set('orderby', 'date')
  url.searchParams.set('order', 'desc')
  if (options.categoryId) {
    url.searchParams.set('categories', String(options.categoryId))
  }
  return fetchWpJson<WPPost[]>(url.toString())
}

export function sortPostsForHome(posts: WPPost[]): WPPost[] {
  return [...posts].sort((a, b) => {
    if (a.sticky !== b.sticky) {
      return a.sticky ? -1 : 1
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
