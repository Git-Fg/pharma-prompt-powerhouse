import * as LucideIcons from "lucide-react";

// ============================================================================
// TAXONOMIE COMPLÈTE DES ICÔNES LUCIDE REACT
// ============================================================================

/**
 * Type pour tous les noms d'icônes disponibles dans Lucide React
 */
export type LucideIconName = keyof typeof LucideIcons;

/**
 * Taxonomie organisée des icônes par domaine d'usage
 */
export const ICON_TAXONOMY = {
  // ============================================================================
  // PHARMACIE & MÉDECINE
  // ============================================================================
  pharmacie: {
    general: [
      "Pill", "Pills", "Stethoscope", "Heart", "Activity", "Microscope",
      "FlaskConical", "TestTube", "Beaker", "Syringe", "Thermometer",
      "PlusCircle", "Cross", "HeartHandshake", "Tablets"
    ] as const,
    securite: [
      "Shield", "ShieldAlert", "ShieldCheck", "ShieldX", "Lock",
      "AlertTriangle", "AlertCircle", "OctagonAlert", "TriangleAlert"
    ] as const,
    recherche: [
      "Search", "SearchCheck", "SearchX", "Microscope", "ScanSearch",
      "TestTube2", "FlaskRound", "Atom", "Dna", "ChartLine"
    ] as const,
    donnees: [
      "Database", "HardDrive", "Server", "FileText", "FileMedical",
      "Clipboard", "ClipboardList", "BarChart3", "TrendingUp"
    ] as const,
  },

  // ============================================================================
  // INTELLIGENCE ARTIFICIELLE & TECHNOLOGIE  
  // ============================================================================
  ia: {
    general: [
      "Brain", "BrainCircuit", "Cpu", "Zap", "Sparkles", "Bot",
      "Robot", "CircuitBoard", "Microchip", "Binary"
    ] as const,
    prompting: [
      "MessageSquare", "MessageCircle", "MessagesSquare", "Send",
      "Terminal", "Code", "FileCode", "Edit3", "PenTool"
    ] as const,
    analyse: [
      "ScanLine", "ScanText", "Radar", "Target", "Focus",
      "Eye", "EyeCheck", "Lightbulb", "Puzzle"
    ] as const,
    workflow: [
      "Workflow", "GitBranch", "Network", "Shuffle", "Route",
      "ArrowRight", "ArrowDown", "ChevronRight", "Play"
    ] as const,
  },

  // ============================================================================
  // ÉDUCATION & PÉDAGOGIE
  // ============================================================================
  education: {
    apprentissage: [
      "GraduationCap", "BookOpen", "Book", "Library", "NotebookPen",
      "PenTool", "Highlighter", "School", "Users", "UserCheck"
    ] as const,
    evaluation: [
      "CheckCircle", "XCircle", "Star", "Award", "Trophy",
      "Target", "Bullseye", "CheckSquare", "ListChecks"
    ] as const,
    ressources: [
      "FolderOpen", "FileText", "Files", "Archive", "Package",
      "Bookmark", "BookmarkPlus", "Layers", "Grid3X3"
    ] as const,
    outils: [
      "Wrench", "Settings", "Cog", "Tool", "Hammer",
      "Scissors", "Calculator", "Ruler", "Compass"
    ] as const,
  },

  // ============================================================================
  // COMMUNICATION & INTERFACE
  // ============================================================================
  interface: {
    navigation: [
      "Home", "ArrowLeft", "ArrowRight", "ChevronLeft", "ChevronRight",
      "Menu", "X", "Plus", "Minus", "MoreHorizontal"
    ] as const,
    actions: [
      "Copy", "Download", "Upload", "Share", "Save",
      "Edit", "Trash2", "RefreshCw", "RotateCcw", "Undo2"
    ] as const,
    status: [
      "CheckCircle2", "AlertCircle", "Info", "HelpCircle",
      "Loader2", "Clock", "Calendar", "Timer", "Hourglass"
    ] as const,
    media: [
      "Image", "Video", "Camera", "Mic", "Volume2",
      "Play", "Pause", "Square", "SkipForward", "SkipBack"
    ] as const,
  },

  // ============================================================================
  // ORGANISATION & STRUCTURE
  // ============================================================================
  organisation: {
    categorisation: [
      "Tag", "Tags", "Hash", "Folder", "FolderTree",
      "TreePine", "Boxes", "Package2", "Grid2X2", "LayoutGrid"
    ] as const,
    hierarchie: [
      "ChevronDown", "ChevronUp", "ChevronsDown", "ChevronsUp",
      "ArrowUp", "ArrowDown", "MoveUp", "MoveDown", "Layers3"
    ] as const,
    liens: [
      "Link", "Link2", "ExternalLink", "Globe", "MapPin",
      "Navigation", "Compass", "Route", "Waypoints"
    ] as const,
  },

  // ============================================================================
  // SÉCURITÉ & CONFIDENTIALITÉ
  // ============================================================================
  securite: {
    protection: [
      "Lock", "Unlock", "Key", "KeyRound", "Shield",
      "ShieldCheck", "ShieldAlert", "ShieldX", "Eye", "EyeOff"
    ] as const,
    alertes: [
      "AlertTriangle", "AlertOctagon", "AlertCircle", "Ban",
      "XOctagon", "Skull", "Zap", "Fire", "Flame"
    ] as const,
    verification: [
      "Verified", "BadgeCheck", "UserCheck", "CheckCircle",
      "Certificate", "Stamp", "Fingerprint", "ScanFace"
    ] as const,
  },

  // ============================================================================
  // PERFORMANCE & OPTIMISATION
  // ============================================================================
  performance: {
    vitesse: [
      "Zap", "Bolt", "Gauge", "Timer", "Stopwatch",
      "FastForward", "SkipForward", "TrendingUp", "Rocket"
    ] as const,
    efficacite: [
      "Target", "Bullseye", "Crosshair", "Aim", "Focus",
      "CheckCircle2", "ThumbsUp", "Award", "Trophy"
    ] as const,
    mesures: [
      "BarChart", "LineChart", "PieChart", "Activity",
      "Pulse", "Signal", "Wifi", "Battery", "Fuel"
    ] as const,
  },
} as const;

/**
 * Toutes les icônes valides organisées par catégorie
 */
export const ALL_VALID_ICONS = Object.values(ICON_TAXONOMY)
  .flatMap(category => Object.values(category))
  .flatMap(icons => [...icons]) as readonly LucideIconName[];

/**
 * Fonction utilitaire pour obtenir une icône Lucide React
 * @param name - Nom de l'icône
 * @param fallback - Icône de fallback (défaut: BrainCircuit)
 */
export const getIcon = (
  name: string | undefined,
  fallback: LucideIconName = "BrainCircuit"
): React.ComponentType<{ className?: string }> => {
  if (!name || !(name in LucideIcons)) {
    return LucideIcons[fallback] as React.ComponentType<{ className?: string }>;
  }
  return LucideIcons[name as LucideIconName] as React.ComponentType<{ className?: string }>;
};

/**
 * Valide qu'une icône existe dans Lucide React
 */
export const isValidIcon = (iconName: string): iconName is LucideIconName => {
  return iconName in LucideIcons;
};

/**
 * Suggestions d'icônes par domaine pour aider à l'attribution
 */
export const ICON_SUGGESTIONS = {
  hallucination: ["AlertTriangle", "AlertOctagon", "Skull"] as const,
  memoire: ["Brain", "HardDrive", "Database"] as const,
  prompting: ["MessageSquare", "Terminal", "Code"] as const,
  prescription: ["Pill", "FileText", "ClipboardList"] as const,
  temperature: ["Thermometer", "Gauge", "Activity"] as const,
  securite: ["Shield", "Lock", "AlertTriangle"] as const,
  recherche: ["Search", "Microscope", "ScanSearch"] as const,
  workflow: ["Workflow", "GitBranch", "Network"] as const,
  creativite: ["Lightbulb", "Sparkles", "Palette"] as const,
  structure: ["TreePine", "Boxes", "LayoutGrid"] as const,
  xml: ["Code", "FileCode", "Brackets"] as const,
  automatisation: ["Bot", "Zap", "Settings"] as const,
  fiches: ["FileText", "NotebookPen", "BookOpen"] as const,
  confidentialite: ["EyeOff", "Shield", "Lock"] as const,
  outils: ["Wrench", "Tool", "Settings"] as const,
  assistant: ["Bot", "MessageSquare", "UserCheck"] as const,
  tableau: ["Table", "Grid3X3", "BarChart"] as const,
  mnemonique: ["Brain", "Lightbulb", "Target"] as const,
  questions: ["HelpCircle", "MessageCircle", "CheckSquare"] as const,
  analyse: ["ScanLine", "Eye", "Target"] as const,
} as const;