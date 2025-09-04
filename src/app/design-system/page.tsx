// src/app/design-system/page.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System | Pharma Prompt Powerhouse',
  description: 'Modern design system with Tailwind v4 tokens and component variants',
};

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl font-bold text-pretty title-flow">
              Design System
            </h1>
            <p className="text-lg text-muted-foreground paragraph-flow">
              Modernised components with Tailwind v4 tokens and component variants
            </p>
          </div>

          {/* Button Variants Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Button Components</CardTitle>
              <CardDescription>
                Enhanced with new animation variants and modern interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Variants</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Animation Effects</h4>
                <div className="flex flex-wrap gap-2">
                  <Button animation="none">No Animation</Button>
                  <Button animation="subtle">Subtle (Default)</Button>
                  <Button animation="bounce">Bounce</Button>
                  <Button animation="glow">Glow</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badge Variants Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Badge Components</CardTitle>
              <CardDescription>
                Enhanced with new variants and size options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Variants</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm">Small</Badge>
                  <Badge size="default">Default</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Typography System</CardTitle>
              <CardDescription>
                Modern text-wrapping utilities and responsive typography
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h1 className="text-balance title-flow text-4xl font-bold mb-2">
                  This is a title with optimal text-balance
                </h1>
                <p className="text-pretty paragraph-flow text-muted-foreground">
                  This paragraph uses text-pretty for optimal line breaks and paragraph-flow 
                  for orphan and widow control. The typography system now includes modern 
                  CSS text-wrapping utilities that make content more readable across all 
                  device sizes.
                </p>
              </div>

              <div>
                <h2 className="responsive-heading">Responsive Heading</h2>
                <p className="responsive-text">
                  This text scales responsively from mobile to desktop using CSS custom properties.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recipe System Info */}
          <Card>
            <CardHeader>
              <CardTitle>tailwind-variants Recipe System</CardTitle>
              <CardDescription>
                Modern component architecture with design tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">🎯 Benefits</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Centralised design tokens in @theme</li>
                    <li>Systematic component variants</li>
                    <li>Better maintainability and consistency</li>
                    <li>Type-safe variant composition</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">🔧 Implementation</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Design tokens in src/app/globals.css @theme</li>
                    <li>Component variants using class-variance-authority</li>
                    <li>Enhanced existing components with modern interactions</li>
                    <li>Full TypeScript integration for variant props</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">✨ Modern Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>CSS text-pretty, text-balance, text-flow for optimal typography</li>
                    <li>Modern easing curves (spring, bounce, smooth)</li>
                    <li>Automatic reduced motion preference respect</li>
                    <li>Hover, focus, and interaction micro-animations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}