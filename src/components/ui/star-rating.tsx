'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  confidenceScore: number
  className?: string
}

export function StarRating({ confidenceScore, className = '' }: StarRatingProps) {
  const fullStars = Math.floor(confidenceScore)
  const hasHalfStar = confidenceScore % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star

          key={`full-${i}`}
          className="size-4 text-yellow-400 fill-current"
        />
      ))}
      {hasHalfStar && (
        <Star key="half" className="size-4 text-yellow-400" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star

          key={`empty-${i}`}
          className="size-4 text-gray-300"
        />
      ))}
    </div>
  )
}
