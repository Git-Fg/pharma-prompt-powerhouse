import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { contentCardVariants, statusBadgeVariants } from "@/components/ui/variants"
import type { ContentCardVariants, StatusBadgeVariants } from "@/components/ui/variants"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { MagneticCard } from "@/components/ui/interactions"

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
    <MagneticCard 
      className={cn(contentCardVariants({ variant }), "group", className)}
      intensity={0.2}
      distance={120}
    >
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
              {title}
            </CardTitle>
            <div className="flex gap-2">
              {category && (
                <Badge variant="outline" className="text-xs hover-scale">
                  {category}
                </Badge>
              )}
              <Badge className={cn(statusBadgeVariants({ status }), "hover-scale")}>
                {status === "available" ? "Disponible" : 
                 status === "coming-soon" ? "Bientôt disponible" :
                 status === "development" ? "En développement" : "Déprécié"}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-200">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        {features.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-medium">Fonctionnalités :</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-center gap-2 group-hover:text-foreground transition-colors duration-200">
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse-subtle" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        {href && (
          <Button asChild className="w-full hover-lift hover-scale" size="sm">
            <a href={href} className="inline-flex items-center">
              Voir plus
              <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        )}
      </CardContent>
    </MagneticCard>
  )
}