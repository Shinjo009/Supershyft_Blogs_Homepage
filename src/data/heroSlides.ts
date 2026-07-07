const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export type HeroTitlePart = {
  text: string
  bold?: boolean
}

export type HeroTitleLine = {
  parts: HeroTitlePart[]
}

export type HeroSlide = {
  id: string
  illustrationSrc: string
  illustrationWidth: number
  illustrationHeight: number
  titleLines: HeroTitleLine[]
  /** Optional tighter line breaks for narrow screens */
  mobileTitleLines?: HeroTitleLine[]
}

export const HERO_SLIDE_INTERVAL_MS = 4000

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'small-steps',
    illustrationSrc: asset('assets/blogs-hero-illustration.svg'),
    illustrationWidth: 1197,
    illustrationHeight: 682,
    titleLines: [
      { parts: [{ text: 'Small Steps.' }] },
      { parts: [{ text: 'Smarter Health.', bold: true }] },
    ],
  },
  {
    id: 'health-complex',
    illustrationSrc: asset('assets/blogs-hero-illustration-2.svg'),
    illustrationWidth: 1234,
    illustrationHeight: 823,
    titleLines: [
      { parts: [{ text: 'Health Is Complex.' }] },
      { parts: [{ text: "Understanding It Shouldn't Be.", bold: true }] },
    ],
  },
  {
    id: 'what-age',
    illustrationSrc: asset('assets/blogs-hero-illustration-3.svg'),
    illustrationWidth: 870,
    illustrationHeight: 486,
    titleLines: [
      { parts: [{ text: 'What Age Is' }] },
      { parts: [{ text: 'Your Health?', bold: true }] },
    ],
  },
]
