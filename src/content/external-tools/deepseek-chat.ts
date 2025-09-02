// src/content/external-tools-new/deepseek-chat.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "deepseek-chat",
  "title": "DeepSeek Chat : L'IA Gratuite et Open-Source à la Pointe",
  "description": "Découvrez DeepSeek Chat, une plateforme propulsée par des modèles open-source puissants, offrant des outils de raisonnement, de recherche et de développement sans frais.",
  "difficulty": "débutant",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chat.deepseek.com/",
  "category": "chatbot",
  "capabilities": [],
  "use_cases": [
    "Raisonnement logique",
    "Recherche web intégrée",
    "Développement de code"
  ],
  "color": "bg-indigo-500",
  "tldr": "IA gratuite open-source excellente en raisonnement et code. Recherche web intégrée, alternative performante aux outils payants.",
  "content": [
    {
      "type": "markdown",
      "content": "# DeepSeek Chat : L'IA Gratuite et Open-Source à la Pointe\n\n<Alert type=\"destructive\">\n  <AlertDescription>\n    **⚠️ Avertissement de Confidentialité :** Cette plateforme est hébergée en Asie avec des lois sur les données souples. Considérez que tout ce que vous écrivez peut devenir public. À utiliser uniquement pour l'expérimentation sur des données publiques.\n  </AlertDescription>\n</Alert>\n\n## Qu'est-ce que DeepSeek Chat ?\n\nDeepSeek Chat est une interface de conversation développée par DeepSeek AI, une entreprise qui se distingue par son engagement envers l'**open-source**. Elle donne accès gratuitement à une famille de modèles d'IA très performants, ce qui en fait une alternative extrêmement compétitive face aux géants comme OpenAI ou Google, surtout pour un public étudiant.\n\nLa plateforme se démarque par ses capacités de raisonnement mathématique et de programmation, mais aussi par une suite d'outils intégrés très complète.\n\n## Les Modèles Disponibles (Prévisions 2025)\n\nDeepSeek Chat s'appuie sur ses propres modèles, dont les performances rivalisent avec les meilleurs du marché :\n\n- **DeepSeek V3.1 (Août 2025) :** Le cheval de bataille de la plateforme. Un modèle à architecture *Mixture-of-Experts (MoE)* très puissant, particulièrement doué en raisonnement, en mathématiques et en codage. Son contexte de **128K tokens** permet de travailler sur des documents de taille conséquente.\n- **DeepSeek R1 (Reasoning) :** Un modèle spécialisé, activé via la fonctionnalité **DeepThink**, conçu spécifiquement pour le raisonnement complexe et la logique étape par étape. Il est plus coûteux en ressources mais offre une profondeur d'analyse supérieure pour les problèmes ardus.\n\n## Une Boîte à Outils Gratuite et Complète\n\nL'un des plus grands atouts de DeepSeek Chat est la richesse de ses fonctionnalités, toutes accessibles gratuitement (en date d'août 2025) :\n\n- **DeepThink (R1) :**\n  - Active le modèle de raisonnement spécialisé **DeepSeek R1**.\n  - Idéal pour résoudre des problèmes complexes qui nécessitent une analyse logique et structurée (ex: cas cliniques, analyse de protocoles).\n  - Limité à **50 messages par jour** en mode gratuit, ce qui est très généreux pour un usage étudiant.\n\n- **Recherche Web en Temps Réel :**\n  - Permet à l'IA d'accéder aux informations les plus récentes sur Internet, avec la possibilité de citer ses sources.\n\n- **Analyse de Fichiers Multi-formats :**\n  - Uploadez jusqu'à **50 fichiers simultanément** (100 Mo max par fichier).\n  - Formats supportés : PDF, Word, Excel, PowerPoint, texte, et même des images (JPEG, PNG).\n  - Parfait pour synthétiser des annales, des cours ou des articles scientifiques.\n\n- **Développement Web (DeepSite) :**\n  - Un outil impressionnant qui permet de créer un site web complet (HTML/CSS/JS) à partir d'une simple description en langage naturel. Un excellent moyen de visualiser des concepts ou de créer des présentations interactives sans coder.\n\n- **Génération d'Images (Janus-Pro) :**\n  - Un modèle de génération d'images très performant, capable de rivaliser avec DALL-E 3, pour créer des illustrations, des schémas ou des supports visuels.\n\n## Avantages et Inconvénients pour un Étudiant\n\n| Avantages | Inconvénients |\n| :--- | :--- |\n| ✅ **Totalement Gratuit :** Accès à des modèles de pointe sans aucun frais. | ⚠️ **Confidentialité :** Comme pour la plupart des services gratuits hébergés en Asie, la prudence est de mise avec les données sensibles. |\n| ✅ **Suite d'outils complète :** Recherche, analyse de fichiers, génération de site/image. | ⚠️ **Limitation de DeepThink :** Les 50 messages/jour sont généreux, mais peuvent être une limite pour des projets très intensifs. |\n| ✅ **Open-Source :** Les modèles sont publics et auditables, un gage de transparence. | ⚠️ **Interface en Anglais/Mandarin :** L'interface et les performances sont optimisées pour ces langues. |\n| ✅ **Haute performance :** Excellentes capacités en logique et raisonnement. | |\n\n## Conclusion\n\nDeepSeek Chat est une option de premier choix pour les étudiants en pharmacie qui cherchent une alternative gratuite et puissante. Sa capacité à analyser de multiples documents, combinée à son mode de raisonnement avancé **DeepThink**, en fait un outil redoutable pour la préparation d'examens, l'analyse de cas cliniques ou la recherche bibliographique. \n\nC'est la preuve que l'on peut accéder à des technologies de pointe sans avoir à sortir sa carte de crédit, à condition de rester vigilant sur la nature des données que l'on partage."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);