"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  Lightbulb, 
  Shield,
  Target,
  BookOpen,
  Heart,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

// Philosophy concepts data
const philosophyConcepts = [
  {
    id: "ia-stagiaire",
    title: "L'IA comme un Stagiaire Brillant",
    description: "Je considère l'IA comme un stagiaire très brillant mais naïf, qui a besoin de guidance et de contexte pour exceller.",
    icon: Brain,
    color: "bg-purple-500",
    principles: [
      "L'IA a une connaissance vaste mais manque de jugement pratique",
      "Elle a besoin d'instructions claires et précises",
      "Le contexte est essentiel pour de bonnes réponses",
      "Elle apprend et s'adapte avec le bon feedback"
    ]
  },
  {
    id: "iteration-dialogue",
    title: "L'Art de l'Itération et du Dialogue",
    description: "Je crois que la meilleure façon d'utiliser l'IA est through un processus continu d'itération et de dialogue.",
    icon: ArrowRight,
    color: "bg-blue-500",
    principles: [
      "La première réponse est rarement la meilleure",
      "Chaque interaction affine la compréhension",
      "Le dialogue construit une relation de confiance",
      "L'itération mène à l'excellence"
    ]
  },
  {
    id: "confidentialite",
    title: "Confidentialité et Éthique",
    description: "Je place la confidentialité et l'éthique au cœur de ma pratique de l'ingénierie de prompts.",
    icon: Shield,
    color: "bg-green-500",
    principles: [
      "Aucune donnée patient confidentielle n'est partagée",
      "Toujours vérifier l'exactitude des informations médicales",
      "Respecter les directives réglementaires",
      "Maintenir un jugement critique humain"
    ]
  }
];

// Core principles data
const corePrinciples = [
  {
    id: "context-window",
    title: "La Fenêtre de Contexte comme Mémoire de Travail",
    description: "La fenêtre de contexte de l'IA fonctionne comme notre mémoire de travail - limitée mais puissante.",
    icon: Brain,
    color: "bg-orange-500"
  },
  {
    id: "hallucinations",
    title: "Les Hallucinations comme Effets Indésirables",
    description: "Les hallucinations de l'IA sont comme des effets indésirables - elles doivent être identifiées et gérées.",
    icon: Heart,
    color: "bg-red-500"
  },
  {
    id: "prompt-prescription",
    title: "Le Prompt comme Ordonnance",
    description: "Un bon prompt est comme une ordonnance médicale - précis, dosé, et adapté au patient.",
    icon: BookOpen,
    color: "bg-blue-500"
  },
  {
    id: "temperature-dosage",
    title: "La Température comme Dosage",
    description: "La température d'un modèle est comme le dosage d'un médicament - elle contrôle l'intensité de la réponse.",
    icon: Zap,
    color: "bg-purple-500"
  }
];

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Lightbulb className="w-4 h-4 mr-2" />
              Ma Philosophie
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Ma Vision de l'IA en Pharmacie</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Je partage ici ma philosophie personnelle sur l'utilisation de l'IA dans le domaine 
              pharmaceutique. Ces principes guident ma pratique et mon enseignement.
            </p>
          </div>
        </div>
      </div>

      {/* Main Concepts */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mes Concepts Fondamentaux</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ces concepts forment la base de mon approche de l'ingénierie de prompts appliquée à la pharmacie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {philosophyConcepts.map((concept) => {
            const IconComponent = concept.icon;
            return (
              <Card key={concept.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-16 h-16 ${concept.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{concept.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Principes clés :
                    </h4>
                    <ul className="space-y-2">
                      {concept.principles.map((principle, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Core Principles */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mes Principes Pratiques</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des analogies concrètes pour comprendre et appliquer l'ingénierie de prompts au quotidien.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {corePrinciples.map((principle) => {
            const IconComponent = principle.icon;
            return (
              <Card key={principle.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${principle.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{principle.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed mt-2">
                        {principle.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Personal Note */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Une Note Personnelle</CardTitle>
            </CardHeader>
            <CardContent className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Je développe cette approche depuis mes études en pharmacie, où j'ai compris que 
                l'IA pouvait être un outil précieux pour l'apprentissage et la pratique. 
                Ma philosophie évolue avec chaque interaction et chaque découverte.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Je vous invite à adopter ces principes comme point de départ, et à développer 
                votre propre philosophie au fur et à mesure de votre expérience avec l'IA.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}