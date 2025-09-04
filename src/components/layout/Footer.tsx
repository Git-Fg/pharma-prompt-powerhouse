"use client";

import Link from "next/link";
import { Brain, ArrowRight } from "lucide-react";
import { getNavigationLinksBySection } from "@/lib/navigation";
import { content } from "@/lib/content-loader"; // Pour le contenu dynamique

export function Footer() {
  // Get navigation links from centralized source
  const navigationLinks = getNavigationLinksBySection('main');
  const legalLinks = getNavigationLinksBySection('legal');
  
  // Get recent workflows (prioritize favorites, then first 3)
  const recentWorkflows = content.workflows
    .filter(workflow => workflow.isFavorite)
    .slice(0, 3)
    .concat(
      content.workflows
        .filter(workflow => !workflow.isFavorite)
        .slice(0, 3 - content.workflows.filter(workflow => workflow.isFavorite).length)
    )
    .slice(0, 3);

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section - Expanded */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="size-7 text-primary-foreground" />
              </div>
              <span className="font-bold text-2xl">Pharma Prompt</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-lg text-lg">
              Mon carnet de notes personnel pour travailler avec l'IA en pharmacie, partagé avec ❤️ pour la communauté.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6 text-foreground">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center space-x-3"
                    >
                      <Icon className="size-4 group-hover:text-primary transition-colors" />
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6 text-foreground">
              Sécurité & Légal
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center space-x-3"
                    >
                      <Icon className="size-4 group-hover:text-primary transition-colors" />
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Recent Workflows Section - Dynamic */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6 text-foreground">
              Derniers Workflows
            </h3>
            <div className="space-y-4">
              {recentWorkflows.map((workflow) => (
                <Link
                  key={workflow.slug}
                  href={`/workflows/${workflow.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors group line-clamp-2 block"
                >
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="size-3 mt-0.5 text-muted-foreground/50 group-hover:text-primary transition-colors flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>{workflow.title}</span>
                  </div>
                </Link>
              ))}
              
              <Link
                href="/workflows"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors group inline-flex items-center space-x-1 mt-4"
              >
                <span>Voir tous les workflows</span>
                <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ligne de Séparation et Copyright */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pharma Prompt Powerhouse. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              Mon carnet de notes, partagé avec ❤️ pour la communauté.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
