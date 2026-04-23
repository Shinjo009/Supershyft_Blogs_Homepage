import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }

type State = {
  hasError: boolean
  message?: string
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[Health Insights]', error, info.componentStack)
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, message: undefined })
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="hi-page">
          <main className="hi-main hi-shell" role="alert">
            <div className="hi-error">
              <p>Something went wrong while loading this page.</p>
              {this.state.message ? <p className="hi-error__detail">{this.state.message}</p> : null}
              <button type="button" className="hi-retry" onClick={this.handleRetry}>
                Try again
              </button>
            </div>
          </main>
        </div>
      )
    }
    return this.props.children
  }
}
