import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { DEMO_CATEGORIES, filterDemoByCategory } from '../data/demoFeed'
import { mapWPPost } from '../lib/wp/mapWPPost'
import { fetchCategories, fetchPosts, sortPostsForHome } from '../lib/wp/wpClient'
import type { BlogCategory } from '../types/blog'

const CATEGORY_ORDER = [
  'nutrition',
  'bio-ai',
  'founders-story',
  'metabolic-health',
  'risk-prediction',
  'lifestyle',
  'research',
  'uncategorized',
]

/** Live site default when `VITE_WP_API_BASE` is not set. */
const DEFAULT_WP_API_BASE = 'https://blogs.supershyft.com/wp-json/wp/v2'

function orderCategories(cats: BlogCategory[]): BlogCategory[] {
  const rank = new Map(CATEGORY_ORDER.map((slug, i) => [slug, i]))
  return [...cats].sort((a, b) => {
    const ra = rank.get(a.slug) ?? 99
    const rb = rank.get(b.slug) ?? 99
    if (ra !== rb) return ra - rb
    return a.name.localeCompare(b.name)
  })
}

const rawWpBase = import.meta.env.VITE_WP_API_BASE?.trim()

/** Explicit `VITE_WP_API_BASE=demo` uses built-in placeholder content (no network). */
function isDemoMode(): boolean {
  return rawWpBase?.toLowerCase() === 'demo'
}

function getEffectiveWpApiBase(): string {
  if (rawWpBase && rawWpBase.toLowerCase() !== 'demo') {
    return rawWpBase
  }
  return DEFAULT_WP_API_BASE
}

export function useHomeFeed() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const demoMode = isDemoMode()
  const apiBase = getEffectiveWpApiBase()

  const wpQuery = useQuery({
    queryKey: ['home-feed', apiBase, selectedCategoryId],
    enabled: !demoMode,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10_000),
    queryFn: async () => {
      const [rawCats, rawPosts] = await Promise.all([
        fetchCategories(apiBase),
        fetchPosts(apiBase, { categoryId: selectedCategoryId ?? undefined }),
      ])
      const cats: BlogCategory[] = rawCats.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      }))
      const categoryById = new Map<number, string>(cats.map((c) => [c.id, c.name]))
      const sorted = sortPostsForHome(rawPosts)
      const mapped = sorted.map((p) => mapWPPost(p, categoryById))
      return { categories: orderCategories(cats), posts: mapped }
    },
  })

  const demo = useMemo(() => {
    const posts = filterDemoByCategory(selectedCategoryId)
    return {
      categories: orderCategories(DEMO_CATEGORIES),
      posts,
    }
  }, [selectedCategoryId])

  const loading = !demoMode && wpQuery.isPending
  const error = !demoMode && wpQuery.isError ? wpQuery.error : null

  const categories = demoMode ? demo.categories : (wpQuery.data?.categories ?? [])
  const posts = demoMode ? demo.posts : (wpQuery.data?.posts ?? [])

  return {
    demoMode,
    loading,
    error,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    posts,
    refetch: wpQuery.refetch,
  }
}
