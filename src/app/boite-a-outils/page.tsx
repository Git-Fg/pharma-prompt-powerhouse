"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit3, ExternalLink } from "lucide-react";

export default function ToolboxPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Ma Boîte à Outils</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ici, je rassemble les outils que j'ai développés pour mes propres besoins
          et ceux que je recommande après les avoir évalués et testés en profondeur.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {/* Section Outils Internes */}
        <Link href="/boite-a-outils/editeur-prompt" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Edit3 className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Mes Outils Internes</CardTitle>
                  <CardDescription>
                    Les outils que j'ai développés dans ce carnet.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>Éditeur de Prompts</li>
                <li>Constructeur de Tableaux</li>
                <li>Générateur de Mnémoniques</li>
                <li>Et d'autres à venir...</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        {/* Section Outils Externes */}
        <Link href="/boite-a-outils/outils-externes" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <ExternalLink className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Mes Outils Externes Recommandés</CardTitle>
                  <CardDescription>
                    Ma sélection d'outils tiers, testés et approuvés.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Découvrez mes analyses, avis et guides détaillés sur les
                meilleures IA pour la pharmacie.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
