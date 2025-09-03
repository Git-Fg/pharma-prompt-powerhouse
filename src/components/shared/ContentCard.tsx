import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { contentCardVariants, statusBadgeVariants } from "@/components/ui/variants"
import type { ContentCardVariants, StatusBadgeVariants } from "@/components/ui/variants"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface ContentCardProps {
  title: string
  description: string
  category?: string
  status?: StatusBadgeVariants["status"]
  variant?: ContentCardVariants["variant"]
  href?: string
  features?: string[]
  className?: string
}

export function ContentCard({
  title,
  description,
  category,
  status = "available",
  variant = "concept",
  href,
  features = [],
  className
}: ContentCardProps) {
  return (
    <Card className={cn(contentCardVariants({ variant }), className)}>
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex gap-2">
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
              <Badge className={statusBadgeVariants({ status })}>
                {status === "available" ? "Disponible" : 
                 status === "coming-soon" ? "Bientôt disponible" :
                 status === "development" ? "En développement" : "Déprécié"}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        {features.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-medium">Fonctionnalités :</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        {href && (
          <Button asChild className="w-full" size="sm">
            <a href={href}>
              Voir plus
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}