import React from 'react';

interface State { hasError: boolean }

/**
 * Catches chunk-load failures that happen when a new deployment changes
 * content-hashed JS filenames. Old chunk URLs return 404 → lazy imports fail.
 * Solution: force a full page reload so the browser fetches fresh URLs.
 */
export class ChunkErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Importing a module script failed') ||
      error.message.includes('error loading dynamically imported module');

    if (isChunkError) {
      // Short delay so we don't get into an infinite reload loop
      setTimeout(() => window.location.reload(), 100);
    }
  }

  render() {
    if (this.state.hasError) {
      // Brief blank screen while reload triggers
      return <div style={{ minHeight: '100vh' }} />;
    }
    return this.props.children;
  }
}
