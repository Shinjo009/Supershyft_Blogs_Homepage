export type WPEmbeddedMedia = {
  source_url?: string
}

export type WPEmbeddedAuthor = {
  name?: string
}

export type WPEmbeddedTerm = {
  name: string
  taxonomy: string
}

export type WPPostEmbedded = {
  'wp:featuredmedia'?: WPEmbeddedMedia[]
  author?: WPEmbeddedAuthor[]
  /** [categories[], tags[]] when using `_embed`. */
  'wp:term'?: WPEmbeddedTerm[][]
}

export type WPPost = {
  id: number
  date: string
  link: string
  sticky: boolean
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  categories: number[]
  _embedded?: WPPostEmbedded
}

export type WPCategory = {
  id: number
  name: string
  slug: string
}
