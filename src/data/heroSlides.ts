/** Shared display aspect ratio — matches slide 1 illustration (1376×768). */
export const HERO_ILLUSTRATION_ASPECT = 1376 / 768

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
  titleLines: HeroTitleLine[]
}

export const HERO_SLIDE_INTERVAL_MS = 4000

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'small-steps',
    illustrationSrc: asset('assets/blogs-hero-illustration.png'),
    titleLines: [
      { parts: [{ text: 'Small Steps.' }] },
      { parts: [{ text: 'Smarter Health.', bold: true }] },
    ],
  },
  {
    id: 'health-complex',
    illustrationSrc: asset('assets/blogs-hero-illustration-2.png'),
    titleLines: [
      { parts: [{ text: 'Health Is Complex.' }] },
      { parts: [{ text: "Understanding It Shouldn't Be.", bold: true }] },
    ],
  },
  {
    id: 'what-age',
    illustrationSrc: asset('assets/blogs-hero-illustration-3.png'),
    titleLines: [
      {
        parts: [
          { text: 'What Age Is ' },
          { text: 'Your Health?', bold: true },
        ],
      },
    ],
  },
]
