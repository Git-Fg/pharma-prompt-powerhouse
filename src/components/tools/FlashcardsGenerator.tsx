'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Plus, Trash2, Play, Shuffle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500', 
  hard: 'bg-red-500'
};

const difficultyLabels = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile'
};

export function FlashcardsGenerator() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState<Partial<Flashcard>>({
    front: '',
    back: '',
    tags: [],
    difficulty: 'medium'
  });
  const [studyMode, setStudyMode] = useState(false);
  const [currentStudyIndex, setCurrentStudyIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAddCard = () => {
    if (!currentCard.front?.trim() || !currentCard.back?.trim()) {
      toast({
        title: 'Erreur',
        description: 'Les deux faces de la carte sont requises.',
        variant: 'destructive'
      });
      return;
    }

    const newCard: Flashcard = {
      id: `card_${Date.now()}`,
      front: currentCard.front,
      back: currentCard.back,
      tags: currentCard.tags || [],
      difficulty: currentCard.difficulty || 'medium'
    };

    setFlashcards([...flashcards, newCard]);
    setCurrentCard({ front: '', back: '', tags: [], difficulty: 'medium' });
    
    toast({
      title: 'Carte ajoutée !',
      description: `Votre flashcard a été créée. Total : ${flashcards.length + 1} cartes.`
    });
  };

  const handleDeleteCard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
    toast({
      title: 'Carte supprimée',
      description: 'La flashcard a été supprimée de votre collection.'
    });
  };

  const handleExportAnki = () => {
    if (flashcards.length === 0) {
      toast({
        title: 'Aucune carte à exporter',
        description: 'Créez d\'abord quelques flashcards.',
        variant: 'destructive'
      });
      return;
    }

    // Format Anki : Front\tBack\tTags
    const ankiContent = flashcards.map(card => 
      `${card.front}\t${card.back}\t${card.tags.join(' ')}`
    ).join('\n');

    const blob = new Blob([ankiContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flashcards_pharma_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Export réussi !',
      description: `${flashcards.length} cartes exportées au format Anki.`
    });
  };

  const startStudy = () => {
    if (flashcards.length === 0) {
      toast({
        title: 'Aucune carte à réviser',
        description: 'Créez d\'abord quelques flashcards.',
        variant: 'destructive'
      });
      return;
    }
    setStudyMode(true);
    setCurrentStudyIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    setCurrentStudyIndex((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentStudyIndex(0);
    setShowAnswer(false);
    toast({
      title: 'Cartes mélangées !',
      description: 'L\'ordre des cartes a été randomisé.'
    });
  };

  if (studyMode && flashcards.length > 0) {
    const currentStudyCard = flashcards[currentStudyIndex];
    if (!currentStudyCard) return null;
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Mode Révision</h2>
            <div className="flex gap-2">
              <Badge variant="outline">
                {currentStudyIndex + 1} / {flashcards.length}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setStudyMode(false)}>
                Quitter
              </Button>
            </div>
          </div>

          <Card className="min-h-[400px] flex flex-col justify-center">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="text-lg font-medium text-muted-foreground">
                  {showAnswer ? 'Réponse :' : 'Question :'}
                </div>
                <div className="text-xl leading-relaxed">
                  {showAnswer ? currentStudyCard.back : currentStudyCard.front}
                </div>
                <div className="flex justify-center gap-4 pt-6">
                  {!showAnswer ? (
                    <Button onClick={() => setShowAnswer(true)} size="lg">
                      Voir la réponse
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={nextCard} variant="outline">
                        Difficile
                      </Button>
                      <Button onClick={nextCard}>
                        Moyen
                      </Button>
                      <Button onClick={nextCard} variant="secondary">
                        Facile
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" onClick={shuffleCards}>
              <Shuffle className="w-4 h-4 mr-2" />
              Mélanger
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Créer</TabsTrigger>
          <TabsTrigger value="manage">Gérer ({flashcards.length})</TabsTrigger>
          <TabsTrigger value="study">Réviser</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle flashcard</CardTitle>
              <CardDescription>
                Ajoutez des questions et réponses pour créer vos cartes de révision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="front">Question / Recto</Label>
                <Textarea
                  id="front"
                  placeholder="Ex: Quel est le mécanisme d'action de l'aspirine ?"
                  value={currentCard.front || ''}
                  onChange={(e) => setCurrentCard({ ...currentCard, front: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="back">Réponse / Verso</Label>
                <Textarea
                  id="back"
                  placeholder="Ex: Inhibition irréversible de la cyclooxygénase (COX), bloquant la synthèse des prostaglandines..."
                  value={currentCard.back || ''}
                  onChange={(e) => setCurrentCard({ ...currentCard, back: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <Select
                    value={currentCard.difficulty}
                    onValueChange={(value: 'easy' | 'medium' | 'hard') =>
                      setCurrentCard({ ...currentCard, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Facile</SelectItem>
                      <SelectItem value="medium">Moyen</SelectItem>
                      <SelectItem value="hard">Difficile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Textarea
                    id="tags"
                    placeholder="pharmacologie, aspirine, AINS"
                    value={currentCard.tags?.join(', ') || ''}
                    onChange={(e) =>
                      setCurrentCard({
                        ...currentCard,
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                      })
                    }
                    className="h-10"
                  />
                </div>
              </div>

              <Button onClick={handleAddCard} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter la carte
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Mes Flashcards ({flashcards.length})</h2>
            <Button onClick={handleExportAnki} disabled={flashcards.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Exporter pour Anki
            </Button>
          </div>

          <div className="grid gap-4">
            {flashcards.map((card) => (
              <Card key={card.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="font-medium">Q: {card.front}</div>
                      <div className="text-muted-foreground">R: {card.back}</div>
                      <div className="flex gap-2 items-center">
                        <div className={`w-3 h-3 rounded-full ${difficultyColors[card.difficulty]}`} />
                        <span className="text-sm text-muted-foreground">
                          {difficultyLabels[card.difficulty]}
                        </span>
                        {card.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {flashcards.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Aucune flashcard créée pour le moment.</p>
                  <p className="text-sm">Utilisez l'onglet "Créer" pour commencer.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="study" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mode Révision</CardTitle>
              <CardDescription>
                Révisez vos flashcards de manière interactive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{flashcards.length}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {flashcards.filter(c => c.difficulty === 'easy').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Faciles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {flashcards.filter(c => c.difficulty === 'hard').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Difficiles</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={startStudy} disabled={flashcards.length === 0}>
                  <Play className="w-4 h-4 mr-2" />
                  Commencer la révision
                </Button>
                <Button variant="outline" onClick={shuffleCards} disabled={flashcards.length === 0}>
                  <Shuffle className="w-4 h-4 mr-2" />
                  Mélanger les cartes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}