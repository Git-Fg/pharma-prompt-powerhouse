// src/components/error/withErrorBoundary.tsx
'use client'

import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'

interface WithErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: Error, errorInfo: React.ErrorInfo }>
  className?: string
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  { fallback, className }: WithErrorBoundaryProps = {},
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback} className={className}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

// Hook for error handling in functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    setError(error)
    console.error('Error caught by useErrorHandler:', error)
  }, [])

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { handleError, resetError }
}
