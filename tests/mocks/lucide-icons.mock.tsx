/**
 * Comprehensive Lucide React Icons Mock
 *
 * This mock provides all the icons used across components
 * to prevent "No X export is defined" errors in tests.
 */

export const lucideIconsMock = {
  // Layout and navigation
  ArrowLeft: () => <span data-testid="arrow-left-icon">←</span>,
  ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  ChevronRight: () => <span data-testid="chevron-right-icon">▶</span>,
  ChevronRightIcon: () => <span data-testid="chevron-right-icon">▶</span>,
  ChevronDownIcon: () => <span data-testid="chevron-down-icon">▼</span>,
  ChevronUpIcon: () => <span data-testid="chevron-up-icon">▲</span>,
  PanelLeftIcon: () => <span data-testid="panel-left-icon">⬅️</span>,
  X: () => <span data-testid="x-icon">✕</span>,
  XIcon: () => <span data-testid="x-icon">✕</span>,
  MoreHorizontal: () => <span data-testid="more-horizontal-icon">⋯</span>,

  // Content and media
  Target: () => <span data-testid="target-icon">🎯</span>,
  Lightbulb: () => <span data-testid="lightbulb-icon">💡</span>,
  TrendingUp: () => <span data-testid="trending-up-icon">📈</span>,
  BookOpen: () => <span data-testid="book-open-icon">📖</span>,
  FileText: () => <span data-testid="file-text-icon">📄</span>,
  FileCode: () => <span data-testid="file-code-icon">📄</span>,
  Code: () => <span data-testid="code-icon">💻</span>,
  PlayCircle: () => <span data-testid="play-circle-icon">▶️</span>,
  Quote: () => <span data-testid="quote-icon">💬</span>,

  // User interface
  Settings: () => <span data-testid="settings-icon">⚙️</span>,
  Search: () => <span data-testid="search-icon">🔍</span>,
  SearchIcon: () => <span data-testid="search-icon">🔍</span>,
  User: () => <span data-testid="user-icon">👤</span>,
  Users: () => <span data-testid="users-icon">👥</span>,
  Globe: () => <span data-testid="globe-icon">🌍</span>,
  ExternalLink: () => <span data-testid="external-link-icon">🔗</span>,
  Copy: () => <span data-testid="copy-icon">📋</span>,
  Download: () => <span data-testid="download-icon">⬇️</span>,

  // Status and feedback
  Star: ({ className, ...props }: any) => (
    <span data-testid="star-icon" className={className} {...props}>
      ⭐
    </span>
  ),
  Check: () => <span data-testid="check-icon">✓</span>,
  CheckIcon: () => <span data-testid="check-icon">✓</span>,
  CheckCircle: () => <span data-testid="check-circle-icon">✅</span>,
  CheckCircle2: () => <span data-testid="check-circle2-icon">✅</span>,
  AlertCircle: () => <span data-testid="alert-circle-icon">⚠️</span>,
  AlertTriangle: () => <span data-testid="alert-triangle-icon">⚠️</span>,
  Info: () => <span data-testid="info-icon">ℹ️</span>,
  HelpCircle: () => <span data-testid="help-circle-icon">❓</span>,
  Shield: () => <span data-testid="shield-icon">🛡️</span>,

  // Miscellaneous
  Brain: () => <span data-testid="brain-icon">🧠</span>,
  Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
  Zap: () => <span data-testid="zap-icon">⚡</span>,
  Tag: () => <span data-testid="tag-icon">🏷️</span>,
  Clock: () => <span data-testid="clock-icon">🕒</span>,
  Cookie: () => <span data-testid="cookie-icon">🍪</span>,
  Wifi: () => <span data-testid="wifi-icon">📶</span>,
  WifiOff: () => <span data-testid="wifi-off-icon">📶</span>,
  Circle: () => <span data-testid="circle-icon">○</span>,
  CircleIcon: () => <span data-testid="circle-icon">○</span>,
  LucideIcon: () => <span data-testid="lucide-icon">⭐</span>,
}
