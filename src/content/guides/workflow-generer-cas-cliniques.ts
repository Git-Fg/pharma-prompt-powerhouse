import type { GuideInput } from '@/types/content';

export const guide = {
  "slug": "workflow-generer-cas-cliniques",
  "title": "Workflow : Générer des Cas Cliniques pour la Révision",
  "description": "Apprenez à utiliser l'IA pour générer des cas cliniques riches, pertinents et adaptés à votre niveau d'étude, transformant la préparation aux examens.",
  "icon": "ClipboardList",
  "category": "cas-pratiques",
  "difficulty": "intermédiaire",
  "estimatedTime": "20 min",
  "tags": [],
  "isFavorite": false,
  "isWorkflow": true,
  "keyTakeaways": [
    "Utilisez un prompt 'maître' structuré pour générer des cas cliniques réalistes avec des problèmes pharmaceutiques ciblés.",
    "L'IA peut créer une infinité de scénarios, vous permettant de vous entraîner sur une grande diversité de cas.",
    "Enrichissez vos cas en intégrant des 'pièges' subtils et des questions à complexité progressive pour un apprentissage actif."
  ],
  "conceptSlugs": [
    "structuration-par-balises",
    "chaîne-de-prompts"
  ],
  "content": [
    {
      "type": "markdown",
      "content": "## Le Problème : Le Manque de Cas Pratiques\n\nLa théorie, c'est bien. La pratique, c'est mieux. L'un des plus grands défis pour les étudiants en pharmacie est de trouver suffisamment de cas cliniques variés pour s'entraîner. L'IA résout ce problème en devenant un générateur de scénarios inépuisable."
    },
    {
      "type": "markdown",
      "content": "### L'Outil Idéal pour la Création de Contenu Structuré"
    },
    {
      "type": "toolRecommendation",
      "slug": "google-ai-studio",
      "reason": "AI Studio est parfait pour cette tâche. Son accès à Gemini 2.5 Pro et son mode 'System Prompt' permettent de définir un rôle de 'professeur' expert, garantissant des cas cliniques cohérents et pédagogiques."
    },
    {
      "type": "markdown",
      "content": "## Le Prompt \"Maître\" pour Générer des Cas\n\nCe prompt est un template puissant. Vous le copiez dans **Google AI Studio** (le rôle dans le `System Prompt`, le reste dans le `User Prompt`), vous remplissez les variables, et l'IA génère un cas sur mesure."
    },
    {
      "type": "multiFormatPrompt",
      "alternativeVersions": {
        "aiStudio": {
          "systemPrompt": "Tu es un professeur de pharmacie clinique chevronné, spécialisé dans la création de cas cliniques pédagogiques pour la préparation aux examens. Tu conçois des scénarios réalistes, cohérents et stimulants.",
          "userPrompt": "Génère un cas clinique complet et réaliste basé sur les spécifications suivantes. Le cas doit être structuré en quatre parties : Présentation, Données cliniques/biologiques, Prescription, et Questions.\n\n**Spécifications :**\n- **Spécialité :** {{SPECIALITE}}\n- **Niveau de l'étudiant :** {{NIVEAU_ETUDE}}\n- **Profil patient :** {{PROFIL_PATIENT}}\n- **Problèmes à intégrer :** {{PROBLEMES}}\n\nGénère maintenant le cas au format Markdown. Les questions doivent être de difficulté progressive."
        }
      },
      "recommendedTools": {
        "aiStudio": [ "Google AI Studio" ]
      },
      "variables": [ "SPECIALITE", "NIVEAU_ETUDE", "PROFIL_PATIENT", "PROBLEMES" ]
    },
    {
      "type": "card",
      "title": "Comment Remplir les Variables ?",
      "content": "-   `{{SPECIALITE}}` : Cardiologie, Infectiologie, Gériatrie...\n-   `{{NIVEAU_ETUDE}}` : 4ème année, préparation à l'internat...\n-   `{{PROFIL_PATIENT}}` : \"Femme de 82 ans, 55kg, insuffisante rénale chronique stade 3\"\n-   `{{PROBLEMES}}` : \"une interaction médicamenteuse, une posologie à adapter à la fonction rénale, une contre-indication liée aux antécédents\""
    },
    {
      "type": "markdown",
      "content": "## Conclusion\n\nL'IA transforme la création de cas cliniques d'un exercice fastidieux en un processus créatif et efficace. En maîtrisant cette technique, vous créez un arsenal illimité de scénarios d'apprentissage qui s'adaptent parfaitement à vos besoins."
    }
  ]
} satisfies GuideInput;