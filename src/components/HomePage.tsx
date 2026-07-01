import { AllArticles } from './AllArticles'
import { CategoryStrip } from './CategoryStrip'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { useHomeFeed } from '../hooks/useHomeFeed'

export function HomePage() {
  const { demoMode, loading, error, categories, selectedCategoryId, setSelectedCategoryId, posts, refetch } =
    useHomeFeed()

  return (
    <div className="hi-page">
      <SiteHeader />
      <div className="hi-canvas">
        <main className="hi-main">
          <div className="hi-content">
          {demoMode && (
            <p className="hi-banner">
              Demo mode: <code className="hi-code">VITE_WP_API_BASE=demo</code> uses built-in sample posts (no
              network). For live WordPress, set <code className="hi-code">VITE_WP_API_BASE</code> to your REST
              base (for example <code className="hi-code">https://example.com/wp-json/wp/v2</code>) or remove
              the variable to use the default API host.
            </p>
          )}
          {loading && <p className="hi-status">Loading articles…</p>}
          {error && (
            <div className="hi-error" role="alert">
              <p>Could not load posts from WordPress.</p>
              <p className="hi-error__detail">
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
              <button type="button" className="hi-retry" onClick={() => void refetch()}>
                Retry
              </button>
            </div>
          )}
          {!loading && !error && (
            <>
              <CategoryStrip
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelect={setSelectedCategoryId}
              />
              <AllArticles posts={posts} />
            </>
          )}
        </div>
      </main>
      </div>
      <SiteFooter />
    </div>
  )
}
