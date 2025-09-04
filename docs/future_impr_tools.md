**1. L'Éditeur de Prompts (Prompt Editor)**
*   **Emplacement :** `/boite-a-outils/prompt-editor`
*   **Composant principal :** `src/components/prompts/PromptEditor.tsx`
*   **Objectif :** Fournir un "bac à sable" simple pour que les utilisateurs puissent créer, tester et affiner manuellement leurs propres prompts.
*   **Fonctionnalités Clés :**
    *   Un champ pour le **System Prompt** (définir le rôle de l'IA).
    *   Un champ principal pour le **User Prompt** (la question ou l'instruction).
    *   Boutons pour **Copier** l'ensemble du prompt ou le **Télécharger** en fichier `.txt`.
*   **Contexte Important :** La description de l'outil précise que les templates de prompts structurés sont désormais intégrés directement dans les **Workflows Stratégiques**. Cet éditeur sert donc principalement d'outil d'expérimentation rapide plutôt que de constructeur de prompts complexes.

**2. Le Générateur de Flashcards (Flashcards Generator)**
*   **Emplacement :** `/boite-a-outils/flashcards-generator`
*   **Composant principal :** `src/components/tools/FlashcardsGenerator.tsx`
*   **Objectif :** Permettre aux étudiants de créer des cartes mémoire personnalisées pour leurs révisions.
*   **Fonctionnalités Clés :**
    *   **Mode Création :** Saisie manuelle du recto, du verso, de la difficulté et des tags.
    *   **Mode Gestion :** Visualisation de toutes les cartes créées, avec possibilité de les supprimer.
    *   **Export Anki :** Un bouton pour télécharger les cartes dans un format texte directement importable dans le logiciel de répétition espacée Anki.
    *   **Mode Révision :** Une interface interactive pour réviser les cartes directement sur le site, avec une option pour mélanger le paquet.

**2. Éditeur Markdown**
*   **Statut :** "Bientôt disponible".
*   **Objectif Prévu :** Offrir un éditeur pour rédiger des fiches de révision en Markdown avec des templates académiques.

**3. Éditeur de Diagrammes**
*   **Statut :** "Bientôt disponible".
*   **Objectif Prévu :** Permettre de créer des schémas (par exemple, des mécanismes d'action) en utilisant la syntaxe Mermaid.

**4. Assistant Document Prompt**
*   **Statut :** "En développement".
*   **Objectif Prévu :** Permettre d'uploader des documents (PDF, DOCX) pour en extraire le contenu et générer des prompts d'analyse pertinents, permettant aux utilisateurs d'utiliser clientside une librairie comme tesseract pour générer les prompts sous forme de texte.

