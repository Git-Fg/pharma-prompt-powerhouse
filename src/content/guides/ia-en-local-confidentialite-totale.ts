// src/content/guides/ia-en-local-confidentialite-totale.ts
import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = {
  "slug": "ia-en-local-confidentialite-totale",
  "title": "L'IA en Local : Le Guide pour une Confidentialité à 100%",
  "description": "Hébergez des modèles IA directement sur votre machine pour une confidentialité absolue. Guide complet : prérequis matériel, installation, modèles recommandés comme Qwen3-4B, et cas d'usage en recherche pharmaceutique sensible.",
  "difficulty": "avancé",
  "category": "securite",
  "estimatedTime": "30 min de lecture + 1-2h d'installation",
  "icon": "Lock",
  "isFavorite": false,
  "keyTakeaways": [
    "L'IA locale est la SEULE solution pour une confidentialité à 100%",
    "Les modèles légers comme Qwen3-4B sont efficaces et accessibles", 
    "GPU ou MacBook Pro M-series recommandés pour performances optimales",
    "Idéal pour données de recherche confidentielles et propriété intellectuelle"
  ],
  "conceptSlugs": ["context-engineering", "memoire-ia"],
  "tags": ["local", "confidentialité", "sécurité", "GPU", "recherche"],
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Le Seul Vrai Coffre-Fort Numérique",
      "content": "Quand la confidentialité est critique (recherche pharmaceutique, propriété intellectuelle, données patients), l'hébergement local des modèles IA est la **seule solution garantissant un risque zéro**. Vos données ne quittent jamais votre machine."
    },
    {
      "type": "markdown",
      "content": "## Pourquoi l'IA Locale est Incontournable"
    },
    {
      "type": "card",
      "title": "Le Problème des Plateformes Cloud",
      "description": "Pourquoi même les 'meilleures' plateformes présentent des risques",
      "content": "**Même avec les meilleures plateformes** (ChatGPT, Claude, Gemini), vos données :\n\n- Transitent par des serveurs tiers (US, Asie, Europe)\n- Sont potentiellement utilisées pour l'entraînement de futurs modèles\n- Restent soumises aux politiques de confidentialité changeantes\n- Peuvent être accessibles aux autorités locales\n\n**Pour la recherche pharmaceutique sensible**, cette exposition est inacceptable."
    },
    {
      "type": "tabs",
      "defaultValue": "local-advantages",
      "tabs": [
        {
          "value": "local-advantages",
          "title": "Avantages Locaux",
          "content": [
            {
              "type": "card",
              "title": "🔒 Confidentialité Absolue",
              "content": "✅ **Données 100% locales** - Aucune transmission sur internet\n✅ **Contrôle total** - Vous décidez de tout\n✅ **Aucun log externe** - Pas de trace chez les fournisseurs\n✅ **Conformité RGPD native** - Données dans votre juridiction\n✅ **Recherche propriétaire** - Protection de la propriété intellectuelle"
            },
            {
              "type": "card",
              "title": "⚡ Performance & Autonomie", 
              "variant": "outline",
              "content": "✅ **Pas de quotas** - Usage illimité\n✅ **Latence optimale** - Pas de réseau\n✅ **Disponibilité 24/7** - Pas de maintenance externe\n✅ **Personnalisation** - Fine-tuning possible\n✅ **Offline** - Fonctionne sans internet"
            }
          ]
        },
        {
          "value": "hardware-requirements",
          "title": "Prérequis Matériel",
          "content": [
            {
              "type": "card",
              "title": "💻 Configuration Recommandée",
              "description": "Setup optimal pour modèles performants",
              "content": "**Option 1 : PC Gaming/Workstation**\n- **GPU** : RTX 4070 ou supérieur (12 GB VRAM+)\n- **RAM** : 16 GB minimum, 32 GB recommandé\n- **Stockage** : 50 GB libres minimum\n- **OS** : Windows 10/11, Linux Ubuntu/Debian\n\n**Option 2 : MacBook Pro M-series**\n- **Processeur** : M1 Pro/Max, M2 Pro/Max/Ultra, M3 Pro/Max\n- **RAM** : 16 GB minimum, 32 GB recommandé \n- **Stockage** : 50 GB libres minimum\n- **Avantage** : MLX optimisé pour Apple Silicon"
            },
            {
              "type": "card",
              "title": "📊 Configuration Budget vs Performance",
              "content": "| **Setup** | **Budget** | **Modèles supportés** | **Performance** |\n|-----------|------------|----------------------|----------------|\n| **RTX 4060 (8GB)** | ~300€ | Qwen3-4B, Llama3.1-8B | ⭐⭐⭐ Bon |\n| **RTX 4070 (12GB)** | ~600€ | Qwen3-14B, Mixtral-8x7B | ⭐⭐⭐⭐ Très bon |\n| **MacBook Pro M3** | ~2500€ | Qwen3-32B, modèles avancés | ⭐⭐⭐⭐⭐ Excellent |\n| **RTX 4090 (24GB)** | ~1800€ | Tous modèles open-source | ⭐⭐⭐⭐⭐ Maximum |"
            }
          ]
        },
        {
          "value": "recommended-models",
          "title": "Modèles Recommandés 2025",
          "content": [
            {
              "type": "card",
              "title": "🏆 Qwen3-4B : Le Roi de l'Efficacité",
              "description": "Rapport performance/ressources imbattable",
              "content": "**Pourquoi Qwen3-4B est parfait :**\n- **Taille** : 4 milliards de paramètres - fonctionne sur presque tout\n- **Performance** : Excellence en français et raisonnement\n- **Ressources** : 8 GB RAM suffisent, GPU optionnel\n- **Licence** : Apache 2.0 - Usage commercial autorisé\n- **Spécialisations** : Excellent pour analyse de textes pharmaceutiques\n\n**Configuration minimale** : PC avec 8 GB RAM, pas de GPU obligatoire"
            },
            {
              "type": "card",
              "title": "📋 Autres Modèles Intéressants",
              "variant": "outline", 
              "content": "**Qwen3-14B** : Meilleur équilibre pour GPU moyens (RTX 4070+)\n**Llama 3.1-8B** : Alternative solide, optimisé Meta\n**Mistral 7B** : Excellent pour l'Europe, RGPD-friendly\n**CodeQwen** : Spécialisé développement et analyse de code\n**Qwen3-32B** : Pour configurations haut de gamme (M3 Pro+, RTX 4090)"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Installation et Configuration"
    },
    {
      "type": "tabs",
      "defaultValue": "lm-studio", 
      "tabs": [
        {
          "value": "lm-studio",
          "title": "LM Studio (Recommandé)",
          "content": [
            {
              "type": "card",
              "title": "🚀 Installation LM Studio",
              "description": "La solution la plus simple pour débuter",
              "content": "**1. Téléchargement**\n- Aller sur [lmstudio.ai](https://lmstudio.ai/)\n- Télécharger pour votre OS (Windows/Mac/Linux)\n- Installation classique\n\n**2. Premier lancement**\n- Interface graphique intuitive\n- Détection automatique du matériel\n- Suggestions de modèles adaptés à votre config\n\n**3. Télécharger Qwen3-4B**\n- Onglet 'Discover'\n- Rechercher 'Qwen3-4B-Instruct'\n- Cliquer 'Download' (patientez 10-30 min)\n- Modèle prêt à l'usage"
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "premier-test-qwen3.txt", 
              "content": "📋 Test Initial avec Qwen3-4B\n\n1. Dans LM Studio :\n   - Onglet 'Chat'\n   - Sélectionner Qwen3-4B-Instruct\n   - Attendre le chargement (30-60 secondes)\n\n2. Premier prompt de test :\n   \"Explique-moi les différents types d'interactions médicamenteuses \n   en pharmacocinétique. Donne des exemples concrets.\"\n   \n3. Vérifier la qualité :\n   - Réponse cohérente et détaillée\n   - Exemples pertinents\n   - Pas d'hallucinations évidentes\n   \n4. Tester la confidentialité :\n   - Débrancher internet\n   - Vérifier que le modèle fonctionne toujours\n   - ✅ Confirmation : tout fonctionne offline"
            }
          ]
        },
        {
          "value": "ollama",
          "title": "Ollama (Ligne de Commande)",
          "content": [
            {
              "type": "card",
              "title": "⚡ Installation Ollama",
              "description": "Pour les utilisateurs techniques",
              "content": "**Avantages d'Ollama :**\n- Plus léger que LM Studio\n- Gestion des modèles simplifiée\n- API REST intégrée\n- Idéal pour intégrations customs\n\n**Installation rapide :**\n```bash\n# Linux/Mac\ncurl -fsSL https://ollama.ai/install.sh | sh\n\n# Windows (via winget)\nwinget install Ollama.Ollama\n```"
            },
            {
              "type": "codeBlock",
              "language": "bash",
              "filename": "setup-ollama.sh",
              "content": "# Installation et test de Qwen3-4B avec Ollama\n\n# 1. Télécharger le modèle\nollama pull qwen2.5:4b\n\n# 2. Premier test\nollama run qwen2.5:4b \"Explique les phases de la pharmacocinétique\"\n\n# 3. Lancer en mode serveur (API)\nollama serve\n\n# 4. Tester l'API (nouveau terminal)\ncurl -X POST http://localhost:11434/api/generate \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"qwen2.5:4b\",\n    \"prompt\": \"Analyse cette interaction médicamenteuse...\",\n    \"stream\": false\n  }'"
            }
          ]
        },
        {
          "value": "mlx-macos",
          "title": "MLX (MacBook optimisé)",
          "content": [
            {
              "type": "card", 
              "title": "🍎 MLX pour Apple Silicon",
              "description": "Performances optimales sur Mac M-series",
              "content": "**MLX** est le framework d'Apple optimisé pour les puces M-series, offrant les **meilleures performances possibles** sur MacBook Pro.\n\n**Installation :**\n```bash\n# Installer MLX\npip install mlx-lm\n\n# Télécharger et lancer Qwen3-4B\nmlx_lm.generate --model mlx-community/Qwen2.5-4B-Instruct-4bit \\\n                --prompt \"Ton prompt pharmaceutique ici\"\n```\n\n**Avantages MLX :**\n- Performance native Apple Silicon\n- Consommation énergétique optimisée\n- Intégration parfaite avec macOS"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Applications en Recherche Pharmaceutique"
    },
    {
      "type": "tabs",
      "defaultValue": "confidential-use-cases",
      "tabs": [
        {
          "value": "confidential-use-cases", 
          "title": "Cas d'Usage Confidentiels",
          "content": [
            {
              "type": "card",
              "title": "🔬 Recherche & Développement",
              "description": "Applications en R&D pharmaceutique",
              "content": "**Analyse de brevets confidentiels :**\n- Lecture et synthèse de portfolios de brevets internes\n- Analyse de FTO (Freedom to Operate) sur nouvelles molécules\n- Comparaison concurrentielle sensible\n\n**Propriété intellectuelle :**\n- Rédaction d'ébauches de brevets\n- Analyse d'antériorité approfondie  \n- Stratégie de protection IP\n\n**Données précliniques :**\n- Analyse de résultats d'études non publiées\n- Synthèse de rapports d'études toxicologiques\n- Préparation de dossiers réglementaires"
            },
            {
              "type": "card",
              "title": "🏥 Recherche Clinique Sensible",
              "variant": "outline",
              "content": "**Protocoles d'études :**\n- Aide à la rédaction de protocoles innovants\n- Analyse de faisabilité sur populations spécifiques\n- Stratégie statistique pour endpoints complexes\n\n**⚠️ ATTENTION :** Même en local, ne jamais utiliser de données patients identifiables"
            }
          ]
        },
        {
          "value": "academic-research",
          "title": "Recherche Académique",
          "content": [
            {
              "type": "card",
              "title": "📚 Thèses et Publications",
              "description": "Support à la recherche académique",
              "content": "**Analyse bibliographique approfondie :**\n- Synthèse de centaines de publications sans quota\n- Identification de gaps de recherche\n- Génération d'hypothèses de travail\n\n**Rédaction scientifique :**\n- Aide à la structuration de manuscrits\n- Amélioration de la qualité rédactionnelle\n- Suggestions de références pertinentes\n\n**Données préliminaires :**\n- Analyse de résultats d'expériences pilotes\n- Préparation de demandes de financement\n- Stratégie de valorisation des travaux"
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "exemple-these-locale.txt",
              "content": "📋 Exemple : Analyse Bibliographique pour Thèse\n\nPrompt local (Qwen3-4B) :\n\"Analyse cette collection de 50 abstracts sur les nanoparticules lipidiques \npour drug delivery. Identifie :\n\n1. Les 5 approches techniques principales\n2. Les limitations récurrentes mentionnées\n3. Les axes de recherche émergents\n4. Les gaps non explorés\n\n[Coller les abstracts de PubMed...]\n\nAvantages local :\n✅ Pas de limite de tokens\n✅ Données pré-publication protégées\n✅ Analyses multi-itératives sans coût\n✅ Confidentialité absolue du projet de thèse"
            }
          ]
        },
        {
          "value": "personal-data",
          "title": "Données Personnelles",
          "content": [
            {
              "type": "card",
              "title": "👨‍🎓 Vie Étudiante & Professionnelle",
              "description": "Applications pour données sensibles personnelles",
              "content": "**CV et candidatures :**\n- Optimisation de CV avec données salariales\n- Lettres de motivation personnalisées\n- Préparation d'entretiens avec historique personnel\n\n**Finances et projets :**\n- Analyse de situation financière personnelle\n- Planification de carrière avec données privées\n- Projets entrepreneuriaux confidentiels\n\n**Correspondance professionnelle :**\n- Aide à la rédaction d'emails sensibles\n- Négociations contractuelles\n- Communications internes délicates"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "💡 Liberté Totale",
              "content": "Avec l'IA locale, vous pouvez partager **n'importe quelle information personnelle** sans risque : revenus, projets secrets, correspondances privées, données familiales. Votre machine = votre coffre-fort."
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Local vs Cloud - Quand Choisir Quoi ?",
      "content": "| **Critère** | **IA Locale (Qwen3-4B)** | **IA Cloud (ChatGPT/Claude)** |\n|-------------|---------------------------|-------------------------------|\n| **Confidentialité** | 🏆 100% garantie | ⚠️ Risque résiduel |\n| **Performance** | ⚖️ Bonne (4B params) | 🏆 Excellente (100B+ params) |\n| **Coût long terme** | 🏆 Gratuit après setup | 💰 $20+/mois récurrent |\n| **Facilité d'usage** | ⚖️ Setup technique requis | 🏆 Prêt immédiatement |\n| **Quotas/Limites** | 🏆 Illimité | ⚠️ Quotas stricts |\n| **Mise à jour** | ⚖️ Manuelle | 🏆 Automatique |\n| **Support** | ⚖️ Communautaire | 🏆 Support officiel |\n\n**Recommandation** : Utilisez le local pour le **sensible**, le cloud pour le **performance**"
    },
    {
      "type": "alert",
      "variant": "destructive",
      "title": "⚠️ Limitations à Connaître", 
      "content": "**Performance** : Les modèles locaux (4-14B params) sont moins performants que les géants cloud (100B+ params)\n\n**Maintenance** : Vous devez gérer mises à jour, bugs, et optimisations\n\n**Setup technique** : Installation et configuration requises\n\n**Pas de support** : Pas de hotline en cas de problème"
    },
    {
      "type": "tabs",
      "defaultValue": "best-practices",
      "tabs": [
        {
          "value": "best-practices",
          "title": "Bonnes Pratiques",
          "content": [
            {
              "type": "card",
              "title": "🛡️ Sécurité Maximale",
              "content": "**Configuration sécurisée :**\n- Installer sur machine dédiée si possible\n- Désactiver accès réseau pendant usage sensible\n- Chiffrer le disque dur (BitLocker/FileVault)\n- Sauvegarder les modèles téléchargés\n\n**Procédures d'usage :**\n- Vérifier mode offline avant traitement sensible\n- Nettoyer l'historique après usage critique\n- Documenter les sources et versions de modèles utilisés\n- Tester périodiquement la qualité des réponses"
            }
          ]
        },
        {
          "value": "hybrid-strategy",
          "title": "Stratégie Hybride",
          "content": [
            {
              "type": "card",
              "title": "🎯 Le Meilleur des Deux Mondes",
              "description": "Combiner local et cloud intelligemment",
              "content": "**Workflow optimal :**\n\n1. **Exploration** avec IA cloud (ChatGPT/Claude) pour brainstorming initial\n2. **Raffinement** avec données anonymisées sur plateformes publiques  \n3. **Finalisation** avec IA locale pour intégrer données sensibles\n4. **Validation** croisée entre approches locale et cloud\n\n**Règle d'or :** Sensible = Local, Performance = Cloud"
            },
            {
              "type": "codeBlock",
              "language": "text", 
              "filename": "workflow-hybride.txt",
              "content": "📋 Exemple : Analyse de Marché Pharmaceutique Confidentielle\n\n🌐 Phase Cloud (ChatGPT) :\n   \"Analyse générale du marché des antidiabétiques 2024-2025\"\n   → Tendances publiques, données génériques\n   \n🔒 Phase Locale (Qwen3-4B) :\n   \"Voici nos données internes de ventes [DONNÉES SENSIBLES].\n    Compare avec les tendances générales et propose une stratégie.\"\n   → Analyse croisée avec données propriétaires\n   \n✅ Résultat :\n   - Performance maximale (Cloud)\n   - Confidentialité totale (Local)\n   - Coût optimisé"
            }
          ]
        }
      ]
    },
    {
      "type": "guideRecommendation",
      "slug": "confidentialite-securite",
      "reason": "Approfondissez les enjeux de confidentialité dans l'IA pour comprendre pourquoi l'approche locale est parfois indispensable."
    },
    {
      "type": "guideRecommendation", 
      "slug": "le-core-kit-ia-gratuit-en-2025",
      "reason": "Pour les usages non-sensibles, le core kit gratuit Z.AI + AI Studio reste la solution optimale au quotidien."
    }
  ]
};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);