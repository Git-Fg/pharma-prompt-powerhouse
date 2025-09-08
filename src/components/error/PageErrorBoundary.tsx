// src/components/error/PageErrorBoundary.tsx
'use client'

import Link from 'next/link'
import React from 'react'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getIcon } from '@/lib/icon-loader'
import { cn } from '@/lib/utils'

interface PageErrorBoundaryProps {
  children: React.ReactNode
  className?: string
}

interface PageErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class PageErrorBoundary extends React.Component<PageErrorBoundaryProps, PageErrorBoundaryState> {
  constructor(props: PageErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): PageErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PageErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={cn('min-h-screen flex items-center justify-center p-4', this.props.className)}>
          <Card className="w-full prose-content-width">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                {getIcon('AlertTriangle')({ className: 'h-8 w-8 text-destructive' })}
              </div>
              <CardTitle className="text-2xl">Oups ! Une erreur est survenue</CardTitle>
              <CardDescription className="text-base">
                Nous sommes désolés, mais une erreur inattendue s'est produite lors du chargement de cette page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-mono text-muted-foreground break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={this.handleReset} className="flex-1">
                  {getIcon('ArrowLeft')({ className: 'mr-2 h-4 w-4' })}
                  Réessayer
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    {getIcon('Home')({ className: 'mr-2 h-4 w-4' })}
                    Accueil
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
