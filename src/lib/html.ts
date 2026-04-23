/** Strip simple HTML from WordPress `rendered` fields for safe plain-text display. */
export function stripHtml(html: string): string {
  const el = document.createElement('div')
  el.innerHTML = html
  return (el.textContent ?? '').replace(/\s+/g, ' ').trim()
}

/** First absolute image URL inside post HTML (for posts without featured_media). */
export function firstImageUrlFromHtml(html: string): string | null {
  const re = /\bsrc\s*=\s*["']([^"']+)["']/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const url = m[1]
    if (/^https?:\/\//i.test(url) && /\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(url)) {
      return url
    }
  }
  return null
}
