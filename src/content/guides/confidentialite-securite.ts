import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'confidentialite-securite',
  title: 'Confidentialité & Sécurité IA en Santé : Guide Juridique et Technique Q3 2025',
  description: "Le guide de référence 2025 pour un usage conforme de l'IA. Analyse de l'AI Act européen, du cadre américain, des politiques \"Opt-Out\" des fournisseurs et des risques de sécurité de l'IA locale.",
  icon: 'ShieldCheck', // Icône plus positive
  category: 'bonnes-pratiques',
  difficulty: 'avancé', // Le niveau de détail justifie ce changement
  tags: ['confidentialite', 'securite', 'rgpd', 'ai-act', 'bonnes-pratiques', 'Q3 2025'],
  isFavorite: true, // Devient un guide pilier
  isWorkflow: false,
  keyTakeaways: [
    "L'AI Act européen régule le \"système d'IA\" : l'anonymisation des données ne suffit plus à garantir la conformité.",
    'La nouvelle norme des fournisseurs (Google, OpenAI, Anthropic) est l\"Opt-Out\" : vous devez désactiver manuellement l\'utilisation de vos données pour l\'entraînement.',
    "L'anonymisation manuelle est insuffisante ; des techniques modernes comme la pseudonymisation ou les données synthétiques sont nécessaires.",
    "L'IA locale offre une confidentialité des données inégalée mais vous transforme en administrateur système, avec de nouveaux risques de sécurité à gérer (réseau, supply chain).",
  ],
  // ... (conceptSlugs peuvent être ajoutés plus tard)
  estimatedTime: '30 min',
  content: [
    {
      type: 'markdown',
      content: `## Partie 1 : Le Nouveau Paysage Légal (Q3 2025)
      
      En 2025, la conformité ne se limite plus au RGPD. De nouvelles réglementations comme l'AI Act européen se concentrent sur le **système d'IA lui-même**, créant de nouvelles obligations pour les professionnels de santé.`,
    },
    // NOUVEAU BLOC : TABLEAU COMPARATIF UE vs US
    {
      type: 'table',
      caption: "Synthèse des cadres réglementaires IA en santé (Q3 2025)",
      headers: ['Critère', 'Union Européenne (AI Act + RGPD)', 'États-Unis (Lois Étatiques + HIPAA)'],
      rows: [
        ['**Champ d\'Application**', 'Régule la **donnée** (RGPD) ET le **système d\'IA** par cas d\'usage.', 'Régule la **donnée de santé identifiable** (HIPAA) ET le **processus de soin** impliquant l\'IA.'],
        ['**Catégorisation du Risque**', 'Approche à 4 niveaux. Les systèmes de santé sont souvent à **\"haut risque\"**.', 'Pas de catégorisation fédérale. Le risque est évalué au cas par cas par les États.'],
        ['**Supervision Humaine**', 'Obligation **stricte et effective** pour les systèmes à haut risque.', 'Obligation pour le professionnel de santé de conserver la **responsabilité finale**.'],
        ['**Sanctions**', "Amendes jusqu'à 35M€ ou 7% du CA mondial.", 'Varient par État. Risques accrus de **class actions** et litiges en responsabilité médicale.']
      ]
    },
    {
      type: 'alert',
      variant: 'default',
      title: "Le Paradoxe de Conformité de l'Anonymisation",
      content: `Sous l'AI Act, même si vous utilisez des données parfaitement anonymisées (conformité RGPD), si votre système d'IA a une finalité médicale (aide au diagnostic), il sera classé \"haut risque\" et devra respecter toutes les obligations de l'AI Act. **L'anonymisation des données n'exonère plus de la conformité du système.**`
    },
    {
        type: 'markdown',
        content: `## Partie 2 : Les Politiques des Fournisseurs - La Norme \"Opt-Out\"
        
        En Q3 2025, les principaux fournisseurs ont harmonisé leurs politiques : par défaut, vos conversations sont utilisées pour améliorer leurs modèles. **La responsabilité de désactiver ce paramètre vous incombe entièrement.**`
    },
    // NOUVEAU BLOC : TABLEAU COMPARATIF DES POLITIQUES DE CONFIDENTIALITÉ
    {
        type: 'table',
        caption: "Politiques de Confidentialité des Services Grand Public (Q3 2025)",
        headers: ["Critère", "OpenAI (ChatGPT)", "Google (Gemini)", "Anthropic (Claude)"],
        rows: [
            ["**Usage pour entraînement (par défaut)**", "**Activé (Opt-out)**. Désactiver via 'Data Controls'.", "**Activé (Opt-out)**. Désactiver via 'Gemini Apps Activity'.", "**Activé (Opt-out)** après le 28/09/2025. Désactiver via 'Help improve Claude'."],
            ["**Rétention (entraînement désactivé)**", "**30 jours** pour raisons de sécurité.", "Non sauvegardées dans l'activité, mais peuvent être conservées anonymisées.", "**30 jours** pour raisons de sécurité."],
            ["**Garantie Zéro-Rétention**", "**Non disponible**. Réservée aux offres API/Entreprise.", "**Non disponible**.", "**Non disponible**."]
        ]
    },
    {
      type: 'markdown',
      content: `## Partie 3 : Moderniser l'Anonymisation
      
      La simple suppression de noms et dates est une pratique dépassée et risquée. Le risque majeur est la **ré-identification par croisement d'informations indirectes** (ex: pathologie rare + localisation + âge).`
    },
    {
        type: 'card',
        title: "Techniques d'Anonymisation Modernes",
        content: `- **Masquage de données (Data Masking) :** Remplacement par des valeurs fictives réalistes.
- **Pseudonymisation (Réversible) :** Remplacement par un token. Les données restent personnelles au sens du RGPD.
- **Génération de données synthétiques :** Création d'un jeu de données artificiel qui conserve les propriétés statistiques de l'original.`
    },
    {
        type: 'markdown',
        content: `### Assistance à l'Anonymisation par IA
        
        Utiliser un LLM pour anonymiser un texte est une aide, **pas une solution garantie**. Le résultat doit **impérativement faire l'objet d'une revue humaine rigoureuse.**`
    },
    {
        type: 'codeBlock',
        language: 'text',
        filename: 'prompt-anonymisation.txt',
        content: '''RÔLE: Tu es un expert en protection des données de santé (RGPD).

TÂCHE: Analyse le texte clinique ci-dessous. Identifie et remplace TOUTES les informations personnelles identifiables (directes et indirectes) par des placeholders génériques.

IDENTIFIANTS À SUPPRIMER:
- Noms, initiales
- Adresses, hôpitaux
- Numéros de téléphone, emails
- Dates précises (remplace par des durées relatives)
- Combinaisons de faits rares (ex: profession + pathologie rare + localisation)

FORMAT DE SORTIE: Produis le texte anonymisé. Si tu as un doute sur une information, encadre-la avec des balises <AMBIGUITE>...</AMBIGUITE> pour ma relecture.

CONTEXTE:
[Coller le texte clinique ici]'''
    },
    {
        type: 'markdown',
        content: `## Partie 4 : Les Risques de Sécurité Inattendus de l'IA Locale`
    },
    // NOUVEAU BLOC : L'ENCART DE MISE EN GARDE
    {
        type: 'alert',
        variant: 'destructive',
        title: "Mise en Garde : L'IA Locale Vous Rend Administrateur Système",
        content: `Héberger un modèle en local offre une confidentialité inégalée pour vos **données**, mais vous échangez la sécurité d'une plateforme cloud contre la responsabilité totale de votre **système**. Trois risques majeurs émergent :

1.  **Exposition Réseau par Défaut :** Des outils comme Ollama peuvent démarrer un serveur sur votre réseau local. Une mauvaise configuration peut l'exposer à Internet.
2.  **Vulnérabilités de la Supply Chain :** Des modèles \"empoisonnés\" peuvent être publiés sur des hubs publics pour exfiltrer des données ou exécuter du code malveillant.
3.  **Failles du Logiciel :** Les outils (LM Studio, Ollama) peuvent avoir leurs propres failles de sécurité (CVE).

**Recommandations de mitigation :**
- Activez les options \"offline\" ou \"local-only\" dans vos outils.
- Utilisez votre pare-feu pour bloquer les connexions entrantes.
- Téléchargez les modèles uniquement depuis les comptes officiels des créateurs (Meta, Mistral).
- Mettez à jour vos outils d'IA locale systématiquement.`
    }
  ]
} satisfies Guide
