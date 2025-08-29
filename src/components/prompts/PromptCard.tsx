"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "@/components/ui";
import { Clock, User, Star, Target, Tag, Copy, Check } from "lucide-react";
import { PromptCardProps } from "@/types";

export const PromptCard: React.FC<PromptCardProps> = ({
  title,
  description,
  difficulty,
  estimatedTime,
  author,
  isFavorite,
  tags,
  category,
  targetTool,
  onUse,
  onFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  const difficultyColors = {
    beginner:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const difficultyLabels = {
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
          {isFavorite && (
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          )}
        </div>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={difficultyColors[difficulty]}>
            {difficultyLabels[difficulty]}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {estimatedTime}
          </Badge>
          {author && (
            <Badge variant="outline" className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {author}
            </Badge>
          )}
          {targetTool && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {targetTool}
            </Badge>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto space-y-2">
          <div className="flex gap-2">
            <Button onClick={onUse} className="flex-1">
              Utiliser ce prompt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="px-3"
              aria-label="Copier le prompt"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
