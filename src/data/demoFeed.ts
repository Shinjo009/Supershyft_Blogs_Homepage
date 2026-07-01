import type { BlogCategory, BlogPost } from '../types/blog'

/** Placeholder categories when `VITE_WP_API_BASE=demo`. */
export const DEMO_CATEGORIES: BlogCategory[] = [
  { id: 1, name: 'Nutrition', slug: 'nutrition' },
  { id: 2, name: 'Bio-AI', slug: 'bio-ai' },
  { id: 3, name: "Founder's Story", slug: 'founders-story' },
  { id: 4, name: 'Uncategorized', slug: 'uncategorized' },
]

const LIVE_POST: BlogPost = {
  id: 595,
  title: 'Precision Nutrition vs Personalized Nutrition',
  excerpt:
    "What's the Difference – And Why It Matters for Your Health Journey. If you're exploring nutrition options through SuperShyft you may wonder what's the difference between precision nutrition and personalized nutrition?",
  author: 'Rishi Nagar',
  dateDisplay: 'Mar 09, 2025',
  dateIso: '2025-03-09T00:00:00',
  readMinutes: 4,
  categoryLabel: 'Nutrition',
  imageUrl: 'https://blogs.supershyft.com/wp-content/uploads/2026/02/nutri.png',
  href: 'https://blogs.supershyft.com/2026/04/21/precision-nutrition-vs-personalized-nutrition/',
}

/** Offline demo posts; mirrors live site (×3 for grid layout). */
export const DEMO_POSTS: BlogPost[] = [
  LIVE_POST,
  { ...LIVE_POST, id: 596 },
  { ...LIVE_POST, id: 597 },
]

export function filterDemoByCategory(categoryId: number | null): BlogPost[] {
  if (categoryId == null) {
    return DEMO_POSTS
  }
  const name = DEMO_CATEGORIES.find((c) => c.id === categoryId)?.name ?? 'Article'
  return DEMO_POSTS.map((p, idx) =>
    idx === 0
      ? {
          ...p,
          categoryLabel: name,
        }
      : p,
  )
}
