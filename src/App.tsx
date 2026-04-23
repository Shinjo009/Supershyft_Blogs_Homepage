import { Suspense, lazy } from 'react'
import './App.css'
import { ErrorBoundary } from './components/ErrorBoundary'

const HomePage = lazy(() => import('./components/HomePage').then((m) => ({ default: m.HomePage })))

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="hi-page">
            <p className="hi-app-boot hi-shell">Loading…</p>
          </div>
        }
      >
        <HomePage />
      </Suspense>
    </ErrorBoundary>
  )
}
