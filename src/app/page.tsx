"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  Lightbulb,
  Settings,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Zap,
  Brain,
  Shield,
  TargetIcon,
  TrendingUp,
  Heart,
  Code,
  FileText,
  GitBranch,
} from "lucide-react";

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container-fluid py-section">
        <div className="text-center container-tight">
          <Badge variant="secondary" className="mb-4 animate-fade-in-up">
            <Sparkles className="w-4 h-4 mr-2" />
            Plateforme d'Apprentissage 2025
          </Badge>
          <h1 className="mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in-up" 
              style={{animationDelay: '0.1s'}}>
            Pharma Prompt Powerhouse
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up max-w-none"
             style={{animationDelay: '0.2s'}}>
            Maîtrisez l'ingénierie de prompts moderne appliquée aux sciences
            pharmaceutiques avec nos outils et ressources spécialisés, optimisés
            pour les modèles SOTA 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
               style={{animationDelay: '0.3s'}}>
            <Button size="lg" className="group focus-ring">
              Explorer les prompts
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="focus-ring">
              Lire les guides
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-fluid py-section-sm">
        <div className="text-center mb-12">
          <h2 className="mb-4">Ce que nous proposons</h2>
          <p className="text-muted-foreground container-tight max-w-none">
            Une collection complète d'outils et de ressources pour vous aider
            dans votre apprentissage de l'ingénierie de prompts appliquée aux
            sciences de la santé, avec les techniques les plus avancées de 2025.
          </p>
        </div>

        <div className="grid-responsive">
          <Card className="group hover-lift animate-fade-in-up">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Explorer les prompts</CardTitle>
              <CardDescription>
                Notre collection de prompts optimisés pour divers cas d'usage en
                pharmacie, structurés avec XML et variables.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover-lift animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Lire les guides</CardTitle>
              <CardDescription>
                Nos guides pratiques pour comprendre les bases et techniques
                avancées, incluant XML, Tree-of-Thought et Self-Consistency.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover-lift animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">
                Comprendre la philosophie
              </CardTitle>
              <CardDescription>
                Notre vision de l'IA comme un outil d'apprentissage et
                d'assistance, avec les principes éthiques et pratiques.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover-lift animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Utiliser les outils</CardTitle>
              <CardDescription>
                Nos outils interactifs pour créer et tester vos propres prompts
                avec les techniques modernes de 2025.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* New Guides Section */}
      <section className="container-fluid py-section-sm">
        <div className="text-center mb-12">
          <h2 className="mb-4">Nouveaux Guides 2025</h2>
          <p className="text-muted-foreground container-tight max-w-none">
            Découvrez nos guides les plus récents, basés sur les méthodologies
            de prompting modernes et optimisés pour les modèles SOTA.
          </p>
        </div>

        <div className="grid-cards max-w-6xl mx-auto">
          <Card className="group hover-lift border-primary/20 animate-fade-in-up">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Code className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-lg">XML Prompting Pharma</CardTitle>
              <CardDescription>
                Maîtrisez la structuration XML pour des prompts précis et
                efficaces, recommandée par Anthropic pour Claude 4.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guides/xml-prompting-pharma">
                <Button variant="outline" className="w-full focus-ring">
                  Lire le guide
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover-lift border-primary/20 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-lg">Variables & Templates</CardTitle>
              <CardDescription>
                Créez des prompts réutilisables avec des variables et templates
                pour optimiser votre productivité.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guides/variables-templates-prompts">
                <Button variant="outline" className="w-full focus-ring">
                  Lire le guide
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover-lift border-primary/20 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <GitBranch className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-lg">Tree-of-Thought</CardTitle>
              <CardDescription>
                Résolvez des cas cliniques complexes en explorant
                systématiquement toutes les hypothèses possibles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guides/tree-of-thought-clinique">
                <Button variant="outline" className="w-full focus-ring">
                  Lire le guide
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Principles Section */}
      <section className="container-fluid py-section-sm">
        <div className="text-center mb-12">
          <h2 className="mb-4">Nos principes</h2>
          <p className="text-muted-foreground container-tight max-w-none">
            Les valeurs qui guident notre approche de l'ingénierie de prompts
            modernes.
          </p>
        </div>

        <div className="grid-responsive max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-fade-in-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TargetIcon className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Précision</CardTitle>
              <CardDescription>
                Nous nous concentrons sur des prompts qui produisent des
                résultats précis et fiables pour la pratique pharmaceutique,
                grâce aux techniques XML et Tree-of-Thought.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-fade-in-up" 
                style={{animationDelay: '0.1s'}}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Progression</CardTitle>
              <CardDescription>
                Une approche étape par étape pour maîtriser progressivement
                l'ingénierie de prompts, des bases XML aux techniques avancées.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-fade-in-up" 
                style={{animationDelay: '0.2s'}}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Communauté</CardTitle>
              <CardDescription>
                Nous partageons nos connaissances pour aider la communauté
                pharmaceutique à progresser ensemble dans l'IA moderne.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="container-fluid py-section-sm">
        <div className="text-center mb-12">
          <h2 className="mb-4">Outils IA Recommandés</h2>
          <p className="text-muted-foreground container-tight max-w-none">
            Découvrez les plateformes d'IA les plus performantes pour vos
            besoins pharmaceutiques, optimisées pour nos techniques de
            prompting.
          </p>
        </div>

        <div className="grid-cards max-w-5xl mx-auto">
          <Card className="group hover-lift animate-fade-in-up">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Brain className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Vertex AI Studio</CardTitle>
              <CardDescription>
                Plateforme Google pour l'expérimentation et le déploiement de
                modèles d'IA, optimisée pour Gemini 2.5 Pro.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guides/vertex-ai-studio-pharmacie">
                <Button variant="outline" className="w-full focus-ring">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover-lift animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-lg">Z.ai</CardTitle>
              <CardDescription>
                Assistant IA spécialisé dans la recherche et l'analyse de
                documents, parfait pour nos techniques de prompting structuré.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guides/z-ai-etudes-pharmaceutiques">
                <Button variant="outline" className="w-full focus-ring">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover-lift animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Lightbulb className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-lg">Gemini Deep Research</CardTitle>
              <CardDescription>
                Modèle Google pour la recherche approfondie et l'analyse
                complexe, idéal pour nos approches Tree-of-Thought.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guides/gemini-deep-research-pharmacie">
                <Button variant="outline" className="w-full focus-ring">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-fluid py-section-sm">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden animate-fade-in-up">
          <div className="relative z-10">
            <h2 className="mb-4">Prêt à commencer ?</h2>
            <p className="text-lg opacity-90 mb-8 container-tight mx-auto max-w-none">
              Rejoignez notre communauté et commencez votre voyage dans
              l'ingénierie de prompts moderne appliquée aux sciences
              pharmaceutiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 transition-colors focus-ring"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Commencer l'apprentissage
                <ArrowRight
                  className={`w-4 h-4 ml-2 transition-transform ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary transition-colors focus-ring"
              >
                Explorer les guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-fluid py-section-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground text-sm sm:text-base">Prompts optimisés</div>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="text-3xl font-bold text-primary mb-2">28+</div>
            <div className="text-muted-foreground text-sm sm:text-base">Guides pratiques</div>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-muted-foreground text-sm sm:text-base">Outils interactifs</div>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground text-sm sm:text-base">Gratuit</div>
          </div>
        </div>
      </section>
    </div>
  );
}
