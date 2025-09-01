// src/app/not-found.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center px-4 py-8 text-center">
      <Card className="max-w-lg">
        <CardHeader>
          <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
          <CardTitle className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Page Introuvable
          </CardTitle>
          <CardDescription className="mt-4 text-base text-muted-foreground">
            Désolé, nous n'avons pas trouvé la page que vous cherchez.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/">Retourner à l'accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
