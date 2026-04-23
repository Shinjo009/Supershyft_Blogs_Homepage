import { stripHtml } from './html'

const WORDS_PER_MINUTE = 200

export function estimateReadMinutes(html: string): number {
  const text = stripHtml(html)
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
