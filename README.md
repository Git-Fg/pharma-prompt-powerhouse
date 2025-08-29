# 🚀 Pharma Prompt Powerhouse

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-teal?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Plateforme d'apprentissage moderne** dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques et de la santé, optimisée selon les standards web 2025.

![Platform Preview](https://github.com/user-attachments/assets/b1d2c4c7-f8f2-4202-958c-04111ef9bb33)

## ✨ Standards 2025 Implémentés

### 🎨 **Expérience Utilisateur Moderne**
- **Mobile-First Responsive Design** avec container queries
- **Typographie fluide** avec système `clamp()` et design tokens
- **Safe Areas** pour appareils avec encoche (iPhone, Android)
- **Animations optimisées** pour 60fps avec hardware acceleration
- **Accessibilité WCAG 2.2 AA+** avec focus management avancé

### ⚡ **Performance & Standards Web**
- **Core Web Vitals** optimisés (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Dynamic Viewport Units** (`100dvh`, `100svh`) pour mobile
- **Container Queries** pour adaptation contextuelle
- **CSS Grid Subgrid** avec fallbacks gracieux
- **View Transitions API** pour navigation fluide
- **Prefers-* Media Queries** pour respecter les préférences utilisateur

### 🔒 **Sécurité & Accessibilité**
- **Content Security Policy** avec nonce pour scripts inline
- **Focus Management** avec skip links et ARIA live regions
- **High Contrast Mode** support
- **Forced Colors Mode** support
- **Screen Reader** optimizations avec landmarks sémantiques

## 🏗️ Architecture Technique

### **Stack Technologique 2025**
```yaml
Frontend:
  - Next.js 15 (App Router, React Server Components)
  - React 19 (Concurrent Features, Compiler)
  - TypeScript 5+ (Latest features)
  - Tailwind CSS 4 (Container Queries, Modern CSS)

Styling & UI:
  - shadcn/ui (Radix UI primitives)
  - Framer Motion 12 (Advanced animations)
  - CSS Custom Properties (Design tokens)
  - Modern CSS Features (color-mix, container queries, subgrid)

Content & Data:
  - Content Collections (Type-safe content management)
  - MDX (Interactive documentation)
  - Zod (Runtime validation)

Performance:
  - Image Optimization (next/image with AVIF/WebP)
  - Font Optimization (font-display: swap)
  - Bundle Splitting (Automatic by Next.js)
  - Static Generation (ISG when possible)
```

### **Structure du Projet**
```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (routes)/          # Route groups
│   ├── globals.css        # Global styles + design tokens
│   ├── layout.tsx         # Root layout with metadata API
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── content/              # Content collections
│   ├── guides/           # Educational content
│   ├── prompts/          # Prompt library
│   └── tools/            # Tool descriptions
├── lib/                  # Utilities & configurations
└── types/                # TypeScript definitions
```

## 🚀 Installation & Développement

### **Prérequis**
- Node.js 18+ (recommandé: 20+)
- pnpm 8+ (ou npm 10+)
- Git

### **Installation Rapide**
```bash
# Cloner le repository
git clone https://github.com/Git-Fg/pharma-prompt-powerhouse.git
cd pharma-prompt-powerhouse

# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm dev
```

### **Scripts Disponibles**
```bash
# Développement
pnpm dev          # Démarrer en mode développement
pnpm build        # Build de production
pnpm start        # Démarrer le serveur de production
pnpm lint         # Linting avec ESLint
pnpm type-check   # Vérification TypeScript
pnpm content      # Build des content collections
```

## 📱 Fonctionnalités Principales

### 🧠 **Collection de Prompts Spécialisés**
- **50+ prompts optimisés** pour la pharmacie
- **Techniques XML** recommandées par Anthropic
- **Tree-of-Thought** pour cas cliniques complexes
- **Self-Consistency** pour validation croisée
- **Templates réutilisables** avec variables

### 📖 **Guides d'Apprentissage 2025**
- **XML Prompting Pharma** - Structuration moderne des prompts
- **Variables & Templates** - Prompts réutilisables
- **Tree-of-Thought Clinique** - Raisonnement structuré
- **Méthodologies SOTA** - Techniques état de l'art

### 🛠️ **Outils Interactifs**
- **Éditeur de prompts** avec prévisualisation en temps réel
- **Générateur de templates** avec variables
- **Testeur de prompts** multi-modèles
- **Analyseur de performance** avec métriques

### 🔗 **Intégrations IA Modernes**
- **Vertex AI Studio** (Gemini 2.5 Pro)
- **Z.ai** (Analyse de documents)
- **Gemini Deep Research** (Recherche approfondie)
- **ChatGPT** (GPT-4, GPT-o1)

## 🎯 Standards UX/UI 2025

### **Design System**
```css
/* Design tokens fluides */
--space-sm: clamp(0.75rem, 1.5vw, 1rem);
--font-size-lg: clamp(1.125rem, 1.4vw, 1.25rem);

/* Container queries contextuelles */
@container card (min-width: 300px) {
  .content { grid-template-columns: 1fr 1fr; }
}

/* Safe areas pour appareils mobiles */
padding-top: max(1rem, env(safe-area-inset-top));
```

### **Accessibilité Avancée**
- **Ratio de contraste 4.5:1** minimum
- **Zones de toucher 44px** minimum sur mobile
- **Navigation clavier** complète
- **Screen readers** avec ARIA landmarks
- **Focus visible** avec ring personnalisé

## 📊 Performance & Métriques

### **Core Web Vitals Optimisés**
- **LCP**: < 2.5s (optimisé avec next/image et fonts)
- **FID**: < 100ms (React Server Components)
- **CLS**: < 0.1 (réservation d'espace pour images)
- **TTFB**: < 800ms (edge caching)

### **Lighthouse Score Cible**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🤝 Contribution & Développement

### **Guidelines de Contribution**
1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commiter** vos changements (`git commit -m 'Add amazing feature'`)
4. **Push** sur la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

### **Standards de Code**
- **TypeScript strict** activé
- **ESLint** avec règles étendues
- **Prettier** pour le formatage
- **Conventional Commits** pour les messages
- **Tests** requis pour les features critiques

## 🔧 Configuration & Déploiement

### **Variables d'Environnement**
```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://pharmaprompt.com
GOOGLE_SITE_VERIFICATION=your_verification_code
```

### **Déploiement Vercel (Recommandé)**
```bash
# Déploiement automatique avec Vercel
vercel --prod
```

### **Déploiement Docker**
```bash
# Build de l'image
docker build -t pharma-prompt-powerhouse .

# Run du container
docker run -p 3000:3000 pharma-prompt-powerhouse
```

## 📈 Roadmap 2025

### **Q1 2025**
- [ ] **API REST** pour prompts et templates
- [ ] **PWA** avec service worker
- [ ] **Mode hors-ligne** pour content essentiel
- [ ] **Synchronisation multi-device**

### **Q2 2025**
- [ ] **IA intégrée** pour génération de prompts
- [ ] **Analytics** d'utilisation des prompts
- [ ] **Communauté** avec système de votes
- [ ] **Marketplace** de templates

### **Q3 2025**
- [ ] **Mobile app** (React Native)
- [ ] **Extensions navigateur** (Chrome, Firefox)
- [ ] **Intégrations** avec plus d'outils IA
- [ ] **API webhooks** pour automatisation

## 📚 Ressources & Documentation

### **Liens Utiles**
- [🌐 Site Web](https://pharmaprompt.com)
- [📖 Documentation](https://pharmaprompt.com/docs)
- [🎓 Guides d'Apprentissage](https://pharmaprompt.com/guides)
- [🔧 API Reference](https://pharmaprompt.com/api)

### **Communauté**
- [💬 Discussions GitHub](https://github.com/Git-Fg/pharma-prompt-powerhouse/discussions)
- [🐛 Issues & Bugs](https://github.com/Git-Fg/pharma-prompt-powerhouse/issues)
- [🚀 Feature Requests](https://github.com/Git-Fg/pharma-prompt-powerhouse/issues/new?template=feature_request.md)

## 📄 Licence & Mentions

### **Licence MIT**
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

### **Crédits**
- **Design inspiration**: Material Design 3, Apple HIG
- **Icons**: Lucide React, Heroicons
- **Fonts**: Inter (Google Fonts), JetBrains Mono
- **UI Components**: Radix UI, shadcn/ui

### **Remerciements**
Merci à la communauté pharmaceutique pour ses retours et contributions, et aux mainteneurs des projets open-source utilisés.

---

**🧑‍💻 Développé avec ❤️ par la communauté pharmaceutique**

*Plateforme moderne d'ingénierie de prompts, optimisée selon les standards web 2025*

[![Deployed on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Git-Fg/pharma-prompt-powerhouse)
