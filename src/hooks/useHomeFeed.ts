import { useQuery } from '@tanstack/react-query'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { DEMO_CATEGORIES, filterDemoByCategory } from '../data/demoFeed'
import { mapWPPost } from '../lib/wp/mapWPPost'
import { fetchCategories, fetchPosts, sortPostsForHome } from '../lib/wp/wpClient'
import type { BlogCategory, BlogPost } from '../types/blog'

const CATEGORY_ORDER = [
  'metabolic-health',
  'nutrition',
  'risk-prediction',
  'lifestyle',
  'research',
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
  const defaultCategoryApplied = useRef(false)
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

  /** Match reference: first available pill in design order is active (not "All"). */
  useEffect(() => {
    if (defaultCategoryApplied.current) {
      return
    }
    if (!demoMode && wpQuery.isPending) {
      return
    }
    const cats = demoMode ? demo.categories : (wpQuery.data?.categories ?? [])
    if (cats.length === 0) {
      if (!demoMode && (wpQuery.isFetched || wpQuery.isError)) {
        defaultCategoryApplied.current = true
      }
      return
    }
    const slug = CATEGORY_ORDER.find((s) => cats.some((c) => c.slug === s))
    const match = slug ? cats.find((c) => c.slug === slug) : null
    if (match) {
      startTransition(() => {
        setSelectedCategoryId(match.id)
      })
    }
    defaultCategoryApplied.current = true
  }, [
    demoMode,
    demo.categories,
    wpQuery.data?.categories,
    wpQuery.isPending,
    wpQuery.isFetched,
    wpQuery.isError,
  ])

  const loading = !demoMode && wpQuery.isPending
  const error = !demoMode && wpQuery.isError ? wpQuery.error : null

  const categories = demoMode ? demo.categories : (wpQuery.data?.categories ?? [])
  const allPosts = demoMode ? demo.posts : (wpQuery.data?.posts ?? [])

  const featured = allPosts[0] ?? null
  const latest: BlogPost[] = featured ? allPosts.filter((p) => p.id !== featured.id).slice(0, 6) : []

  return {
    demoMode,
    loading,
    error,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    featured,
    latest,
    refetch: wpQuery.refetch,
  }
}
