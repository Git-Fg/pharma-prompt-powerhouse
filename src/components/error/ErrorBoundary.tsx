// src/components/error/ErrorBoundary.tsx
'use client'

import React from 'react'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getIcon } from '@/lib/icon-loader'
import { cn } from '@/lib/utils'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error, errorInfo: React.ErrorInfo }>
  className?: string
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log error to error tracking service (if available)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  // eslint-disable-next-line react/no-unused-class-component-members -- May be used in future implementations
  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback

      return (
        <div className={cn('p-4', this.props.className)}>
          <FallbackComponent
            error={this.state.error!}
            errorInfo={this.state.errorInfo!}
          />
        </div>
      )
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error }: { error: Error, errorInfo: React.ErrorInfo }) {
  return (
    <Card className="w-full prose-description mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          {getIcon('AlertTriangle')({ className: 'h-6 w-6 text-destructive' })}
        </div>
        <CardTitle className="text-xl">Une erreur est survenue</CardTitle>
        <CardDescription>
          Désolé, une erreur inattendue s'est produite. Veuillez réessayer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {process.env.NODE_ENV === 'development' && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-mono text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <Button onClick={() => window.location.reload()} className="flex-1">
            {getIcon('RefreshCw')({ className: 'mr-2 h-4 w-4' })}
            Recharger la page
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
