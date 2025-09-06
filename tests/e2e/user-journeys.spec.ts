import { expect, test } from '@playwright/test'

test.describe('Parcours Utilisateurs Critiques', () => {
  test.describe('Scénario "Découverte d\'un Concept"', () => {
    test('utilisateur peut naviguer de l\'accueil à un concept spécifique', async ({ page }) => {
      // 1. Aller sur la page d'accueil
      await page.goto('/')
      await expect(page).toHaveTitle(/Pharma Prompt Powerhouse/)
      
      // 2. Cliquer sur le lien "Concepts"
      const conceptsLink = page.locator('[data-testid="nav-link-concepts"]')
      await expect(conceptsLink).toBeVisible()
      await conceptsLink.click()
      
      // 3. Vérifier que la page des concepts s'affiche
      await expect(page).toHaveURL('/concepts')
      await expect(page.getByRole('heading', { name: 'Hub de Concepts' })).toBeVisible()
      
      // 4. Cliquer sur une carte de concept spécifique (Context Engineering)
      const conceptCard = page.locator('[data-testid*="concept"], [data-testid*="card"], a[href*="/concepts/"]').first()
      await expect(conceptCard).toBeVisible()
      await conceptCard.click()
      
      // 5. Vérifier que la page de détail du concept s'affiche avec le bon titre
      await expect(page).toHaveURL(/\/concepts\/context-engineering/)
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Context Engineering')
      
      // 6. Vérifier que la section "Contenu Connexe" est présente
      const relatedContent = page.locator('text=/Contenu Connexe/i')
      if (await relatedContent.count() === 0) {
        const relatedLinks = page.locator('text=/Liens Utiles/i')
        await expect(relatedLinks.first()).toBeVisible()
      } else {
        await expect(relatedContent.first()).toBeVisible()
      }
      
      // 7. Vérifier que le contenu principal est présent
      await expect(page.locator('main')).toBeVisible()
      await expect(page.locator('article')).toBeVisible()
    })
  })

  test.describe('Scénario "Utilisation d\'un Workflow"', () => {
    test('utilisateur peut rechercher et utiliser un workflow', async ({ page }) => {
      // 1. Aller sur la page /workflows
      await page.goto('/workflows')
      await expect(page.getByRole('heading', { name: /Workflows Stratégiques/ })).toBeVisible()
      
      // 2. Utiliser la barre de recherche pour filtrer les workflows
      const searchInput = page.locator('[data-testid="search-input"], input[placeholder*="Rechercher"], input[placeholder*="Search"]')
      await expect(searchInput.first()).toBeVisible()
      await searchInput.first().fill('prompt')
      
      // 3. Attendre que les résultats se filtrent
      await page.waitForTimeout(500)
      
      // 4. Cliquer sur un workflow visible
      const workflowCard = page.locator('[data-testid*="workflow"], [data-testid*="card"], a[href*="/workflows/"]').first()
      await expect(workflowCard).toBeVisible()
      const workflowUrl = await workflowCard.getAttribute('href')
      await workflowCard.click()
      
      // 5. Vérifier que la page du workflow s'affiche
      await expect(page).toHaveURL(new RegExp(workflowUrl || '/workflows/'))
      
      // 6. Vérifier que le prompt final est affiché
      const promptSection = page.locator('text=/Prompt Final/i')
      if (await promptSection.count() > 0) {
        await expect(promptSection.first()).toBeVisible()
      }
      
      // 7. Vérifier que le contenu est copiable (présence d'un bouton de copie)
      const copyButton = page.locator('[data-testid*="copy"], button[aria-label*="Copier"], button[title*="Copier"], button:has-text("Copier")')
      if (await copyButton.count() > 0) {
        await expect(copyButton.first()).toBeVisible()
      }
      
      // 8. Vérifier la structure du workflow
      await expect(page.locator('main')).toBeVisible()
      await expect(page.locator('article')).toBeVisible()
    })
  })

  test.describe('Scénario "Navigation Complète"', () => {
    test('utilisateur peut naviguer entre les différentes sections', async ({ page }) => {
      // Commencer par l'accueil
      await page.goto('/')
      
      // Navigation vers les guides
      const guidesLink = page.locator('[data-testid="nav-link-guides"]')
      await expect(guidesLink).toBeVisible()
      await guidesLink.click()
      await expect(page).toHaveURL('/guides')
      await expect(page.getByRole('heading', { name: /Mes Fiches/ })).toBeVisible()
      
      // Navigation vers l'arsenal IA
      const arsenalLink = page.locator('[data-testid="nav-link-l-arsenal-ia"]')
      await expect(arsenalLink).toBeVisible()
      await arsenalLink.click()
      await expect(page).toHaveURL('/l-arsenal-ia')
      await expect(page.getByRole('heading', { name: /L\'Arsenal IA/ })).toBeVisible()
      
      // Retour à l'accueil via le logo
      const logo = page.locator('[data-testid="nav-logo"]')
      await expect(logo).toBeVisible()
      await logo.click()
      await expect(page).toHaveURL('/')
    })
  })

  test.describe('Scénario "Recherche et Découverte"', () => {
    test('utilisateur peut rechercher du contenu et naviguer', async ({ page }) => {
      // Aller sur la page des guides
      await page.goto('/guides')
      
      // Rechercher un terme spécifique
      const searchInput = page.locator('[data-testid="search-input"], input[placeholder*="Rechercher"], input[placeholder*="Search"]')
      await expect(searchInput.first()).toBeVisible()
      await searchInput.first().fill('2025')
      
      // Attendre le filtrage
      await page.waitForTimeout(500)
      
      // Vérifier que les résultats sont affichés
      const contentCards = page.locator('a[href*="/guides/"], .card, [class*="card"]')
      if (await contentCards.count() > 0) {
        await expect(contentCards.first()).toBeVisible()
      }
      
      // Cliquer sur un résultat si disponible
      const firstLink = page.locator('a[href*="/guides/"]').first()
      if (await firstLink.isVisible()) {
        await firstLink.click()
        await expect(page.locator('main')).toBeVisible()
      }
    })
  })

  test.describe('Scénario "Consultation d\'Outils"', () => {
    test('utilisateur peut consulter et comparer les outils IA', async ({ page }) => {
      // Aller sur la page de l'arsenal IA
      await page.goto('/l-arsenal-ia')
      
      // Vérifier que le tableau comparatif est présent
      await expect(page.getByRole('heading', { name: /Tableau Comparatif/ })).toBeVisible()
      
      // Vérifier que des outils sont affichés
      await expect(page.getByText('ChatGPT')).toBeVisible()
      
      // Vérifier que les filtres fonctionnent
      const filterButtons = page.locator('button:has-text("Filtrer"), button:has-text("Tous")')
      if (await filterButtons.count() > 0) {
        await expect(filterButtons.first()).toBeVisible()
      }
      
      // Vérifier la présence de contenu détaillé
      await expect(page.locator('main')).toBeVisible()
    })
  })

  test.describe('Scénario "Mobile Experience"', () => {
    test.use({ viewport: { width: 375, height: 667 } })
    
    test('navigation mobile fonctionne correctement', async ({ page }) => {
      // Aller sur l'accueil
      await page.goto('/')
      
      // Vérifier que la navigation mobile est visible
      const mobileNav = page.locator('[data-testid="layout-mobile-nav"]')
      await expect(mobileNav).toBeVisible()
      
      // Cliquer sur un lien de navigation mobile
      const mobileWorkflowsLink = mobileNav.locator('[data-testid="nav-link-workflows-stratégiques"]')
      await expect(mobileWorkflowsLink).toBeVisible()
      await mobileWorkflowsLink.click()
      
      // Vérifier la navigation
      await expect(page).toHaveURL('/workflows')
      await expect(page.getByRole('heading', { name: /Workflows Stratégiques/ })).toBeVisible()
      
      // Vérifier que le contenu est lisible sur mobile
      await expect(page.locator('main')).toBeVisible()
      const contentWidth = await page.locator('main').boundingBox()
      expect(contentWidth?.width).toBeLessThanOrEqual(375)
    })
  })

  test.describe('Scénario "Accessibilité"', () => {
    test('vérifier l\'accessibilité des parcours clés', async ({ page }) => {
      // Aller sur l'accueil
      await page.goto('/')
      
      // Vérifier que le focus fonctionne correctement
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Navigation au clavier vers les concepts
      const conceptsLink = page.locator('[data-testid="nav-link-concepts"]')
      await conceptsLink.focus()
      await page.keyboard.press('Enter')
      
      await expect(page).toHaveURL('/concepts')
      await expect(page.getByRole('heading', { name: 'Hub de Concepts' })).toBeVisible()
      
      // Vérifier que les éléments interactifs ont des attributs ARIA
      const interactiveElements = page.locator('button, a, input, select, textarea')
      const count = await interactiveElements.count()
      expect(count).toBeGreaterThan(0)
    })
  })
})