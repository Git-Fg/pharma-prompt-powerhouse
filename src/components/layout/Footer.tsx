"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Brain, BookOpen, Shield, ExternalLink, Wrench, Target } from "lucide-react";

const footerSections = [
  {
    title: "Navigation",
    links: [
      { name: "Par où commencer ?", href: "/par-ou-commencer", icon: Target },
      { name: "Workflows Stratégiques", href: "/workflows", icon: BookOpen },
      { name: "L'Arsenal IA", href: "/l-arsenal-ia", icon: ExternalLink },
      { name: "Concepts", href: "/concepts", icon: Brain },
    ],
  },
  {
    title: "Outils",
    links: [
      { name: "Ma Boîte à Outils", href: "/boite-a-outils", icon: Wrench },
    ],
  },
  {
    title: "Sécurité & Légal",
    links: [
      {
        name: "Confidentialité",
        href: "/guides/confidentialite-securite",
        icon: Shield,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Pharma Prompt</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Mon carnet de notes personnel pour travailler avec l'IA en
              pharmacie, partagé avec la communauté pour contribuer à
              l'innovation pédagogique.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2",
                        link.icon === ExternalLink && "inline-flex"
                      )}
                    >
                      {link.icon !== ExternalLink && (
                        <link.icon className="w-4 h-4" />
                      )}
                      <span>{link.name}</span>
                      {link.icon === ExternalLink && (
                        <link.icon className="w-3 h-3 ml-1" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Pharma Prompt Powerhouse. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground">
                Mon carnet de notes, partagé avec ❤️ pour la communauté
                pharmaceutique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
