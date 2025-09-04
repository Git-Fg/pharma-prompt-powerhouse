import { CheckCircle, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface KeyTakeawaysProps {
  points: string[]
}

export function KeyTakeaways({ points }: KeyTakeawaysProps) {
  if (!points || points.length === 0) {
    return null
  }

  return (
    <Card className="my-8 bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg text-primary">
          <Info className="size-6" />
          À Retenir (TL;DR)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="size-5 text-green-600 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{point}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
