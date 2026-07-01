import { useEffect, useState } from 'react'
import { HERO_SLIDE_INTERVAL_MS, HERO_SLIDES } from '../data/heroSlides'

export function useHeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    for (const slide of HERO_SLIDES) {
      const img = new Image()
      img.src = slide.illustrationSrc
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % HERO_SLIDES.length)
    }, HERO_SLIDE_INTERVAL_MS)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return {
    activeSlide,
    setActiveSlide,
    slideCount: HERO_SLIDES.length,
  }
}
