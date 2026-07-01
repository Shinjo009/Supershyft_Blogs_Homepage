export type BlogPost = {
  id: number
  title: string
  excerpt: string
  author: string
  dateDisplay: string
  dateIso: string
  readMinutes: number
  categoryLabel: string
  imageUrl: string
  href: string
}

export type BlogCategory = {
  id: number
  name: string
  slug: string
}
