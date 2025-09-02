// src/content/external-tools-new/qwen-chat.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "qwen-chat",
  "title": "Qwen Chat : La Puissance Open-Source d'Alibaba",
  "description": "Découvrez Qwen Chat, la plateforme gratuite qui donne accès aux modèles Qwen 3 d'Alibaba, réputés pour leurs performances en mathématiques et en codage.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chat.qwen.ai/",
  "category": "chatbot",
  "capabilities": [],
  "use_cases": [
    "Calculs mathématiques",
    "Support multilingue",
    "Analyse technique"
  ],
  "color": "bg-rose-500",
  "tldr": "IA d'Alibaba gratuite, excellente en maths et codage. Support multilingue robuste, idéale pour calculs complexes et analyse technique.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Qwen Chat ?\n\nQwen Chat (aussi connu sous le nom de Tongyi Qianwen) est l'interface de conversation développée par Alibaba Cloud. Similaire à ChatGPT ou DeepSeek Chat, cette plateforme se distingue en donnant un accès **totalement gratuit** à sa puissante famille de modèles open-source : **Qwen 3**.\n\nSous licence Apache 2.0, ces modèles peuvent être utilisés commercialement, ce qui témoigne de l'engagement d'Alibaba dans l'écosystème open-source. Pour les étudiants, c'est une nouvelle opportunité d'accéder à une technologie de pointe sans frais.\n\n## Les Modèles Qwen 3 (Prévisions 2025)\n\nLa famille Qwen 3, sortie en avril 2025, offre une gamme de modèles adaptés à différents besoins, allant de versions légères pouvant tourner localement à des modèles extrêmement puissants.\n\n- **Qwen3-235B-A22B :** Le modèle phare, une architecture *Mixture-of-Experts (MoE)* avec 235 milliards de paramètres, offrant des performances de premier plan, notamment en raisonnement, en mathématiques et en programmation.\n- **Qwen3-32B :** Une version dense, plus petite mais optimisée pour la créativité et le raisonnement complexe.\n- **Versions plus petites (14B, 3B) :** Conçues pour être un excellent compromis performance/ressources, idéales pour un usage local.\n\nTous ces modèles supportent une fenêtre de contexte allant jusqu'à **128K tokens**.\n\n## Une Suite d'Outils Créatifs et Gratuits\n\nTout comme DeepSeek, Qwen Chat intègre une série d'outils avancés accessibles gratuitement (en date d'août 2025) :\n\n- **Deep Research :** Un agent de recherche capable de compiler des rapports complets sur des sujets complexes en analysant des centaines de sources et en posant des questions pour affiner la recherche.\n- **Image Edit :** Un outil de retouche d'images puissant qui permet des modifications haute-fidélité avec un contrôle sémantique (par exemple : \"change la couleur de la blouse sans altérer le fond\").\n- **Web Dev :** Un agent de développement *full-stack* capable de créer des applications web complètes à partir de simples descriptions en langage naturel.\n- **Image Generation :** Un générateur d'images intégré (Qwen-Image) particulièrement doué pour le rendu précis de texte à l'intérieur des images.\n\n## Avantages et Inconvénients\n\n| Avantages | Inconvénients |\n| :--- | :--- |\n| ✅ **Totalement Gratuit :** Accès illimité à toute la suite Qwen 3 sans frais. | ⚠️ **Confidentialité :** Service hébergé en Asie. La prudence est de mise pour les données personnelles ou sensibles. |\n| ✅ **Open-Source (Apache 2.0) :** Transparence et flexibilité pour la communauté. | ⚠️ **Focalisation Asiatique :** Les modèles et l'interface peuvent être optimisés en priorité pour les langues et cultures asiatiques. |\n| ✅ **Excellence en Maths/Code :** Les modèles Qwen 3 sont reconnus pour leurs performances dans ces domaines. | |\n| ✅ **Outils Créatifs Puissants :** L'édition d'image et le développement web sont des atouts uniques. | |\n\n## Conclusion\n\nQwen Chat est une autre excellente alternative gratuite pour les étudiants. Ses solides performances en raisonnement et en mathématiques en font un bon candidat pour résoudre des problèmes scientifiques et analyser des données. Les outils créatifs comme l'édition d'image et le développement web ouvrent également des possibilités intéressantes pour la création de supports de cours ou de présentations originales.\n\nComme pour les autres plateformes gratuites hébergées hors d'Europe, il est recommandé de l'utiliser pour des travaux de recherche et d'exploration tout en évitant de partager des informations confidentielles."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);