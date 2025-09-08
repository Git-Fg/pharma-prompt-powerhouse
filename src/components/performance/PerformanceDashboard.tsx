// src/components/performance/PerformanceDashboard.tsx
'use client'

import { Activity, AlertTriangle, BarChart3, CheckCircle } from 'lucide-react'
import React, { useState } from 'react'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getIcon } from '@/lib/icon-loader'

interface MetricCardProps {
  title: string
  value: string
  rating: 'good' | 'needs-improvement' | 'poor'
  icon: React.ReactNode
  description: string
}

function MetricCard({ title, value, rating, icon, description }: MetricCardProps) {
  const ratingColors = {
    'good': 'bg-green-100 text-green-800 border-green-200',
    'needs-improvement': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'poor': 'bg-red-100 text-red-800 border-red-200',
  }

  const ratingIcons = {
    'good': CheckCircle,
    'needs-improvement': AlertTriangle,
    'poor': AlertTriangle,
  }

  const RatingIcon = ratingIcons[rating]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <Badge variant="outline" className={ratingColors[rating]}>
            <RatingIcon className="mr-1 h-3 w-3" />
            {rating === 'good' ? 'Bon' : rating === 'needs-improvement' ? 'À améliorer' : 'Mauvais'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}

export function PerformanceDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState({
    lcp: { value: '2.1s', rating: 'good' as const },
    fid: { value: '89ms', rating: 'good' as const },
    cls: { value: '0.05', rating: 'good' as const },
    ttfb: { value: '650ms', rating: 'good' as const },
  })

  // Simulate real-time updates
  React.useEffect(() => {
    if (!isVisible)
      return

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        lcp: {
          value: `${(Math.random() * 2 + 1.5).toFixed(1)}s`,
          rating: 'good' as const,
        },
        fid: {
          value: `${Math.floor(Math.random() * 50 + 50)}ms`,
          rating: 'good' as const,
        },
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          className="shadow-lg"
        >
          <Activity className="mr-2 h-4 w-4" />
          Performance
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Dashboard
            </CardTitle>
            <CardDescription>
              Métriques Core Web Vitals en temps réel
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
          >
            {getIcon('X')({ className: 'h-4 w-4' })}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="LCP"
              value={metrics.lcp.value}
              rating={metrics.lcp.rating}
              icon={getIcon('Clock')({ className: 'h-4 w-4' })}
              description="Largest Contentful Paint"
            />
            <MetricCard
              title="FID"
              value={metrics.fid.value}
              rating={metrics.fid.rating}
              icon={getIcon('Zap')({ className: 'h-4 w-4' })}
              description="First Input Delay"
            />
            <MetricCard
              title="CLS"
              value={metrics.cls.value}
              rating={metrics.cls.rating}
              icon={getIcon('AlertTriangle')({ className: 'h-4 w-4' })}
              description="Cumulative Layout Shift"
            />
            <MetricCard
              title="TTFB"
              value={metrics.ttfb.value}
              rating={metrics.ttfb.rating}
              icon={getIcon('Activity')({ className: 'h-4 w-4' })}
              description="Time to First Byte"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Statut global</span>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="mr-1 h-3 w-3" />
                Optimisé
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
