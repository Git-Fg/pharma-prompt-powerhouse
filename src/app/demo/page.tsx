import { ShadcnExamples } from '@/components/examples/ShadcnExamples'

export default function DemoPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Démo des Composants shadcn/ui</h1>
        <p className="text-lg text-muted-foreground">
          Découvrez les nouveaux composants shadcn/ui intégrés dans Pharma Prompt Powerhouse
        </p>
      </div>

      <ShadcnExamples />
    </div>
  )
}
