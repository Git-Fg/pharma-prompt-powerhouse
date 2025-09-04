/**
 * Design System Migration Utility
 * Helps detect and fix hardcoded values in favor of design tokens
 */

import { designTokens, type SpacingToken, type ColorToken } from './design-tokens';

interface HardcodedPattern {
  pattern: RegExp;
  type: 'spacing' | 'color' | 'fontSize' | 'borderRadius' | 'shadow';
  suggest: (value: string) => string;
}

const HARDCODED_PATTERNS: HardcodedPattern[] = [
  // Spacing patterns
  {
    pattern: /\b(\d+)px\b/g,
    type: 'spacing',
    suggest: (value: string) => {
      const px = parseInt(value.replace('px', ''));
      if (px === 4) return 'spacing-xs or 1';
      if (px === 8) return 'spacing-sm or 2';
      if (px === 12) return '3';
      if (px === 16) return 'spacing-md or 4';
      if (px === 20) return '5';
      if (px === 24) return 'spacing-lg or 6';
      if (px === 32) return 'spacing-xl or 8';
      if (px === 48) return 'spacing-2xl or 12';
      if (px === 64) return 'spacing-3xl or 16';
      return `closest spacing token (${Math.round(px / 4)})`;
    }
  },
  
  // Color patterns
  {
    pattern: /#([0-9a-f]{3}){1,2}\b/gi,
    type: 'color',
    suggest: (value: string) => {
      // Common color mappings
      const colorMap: Record<string, string> = {
        '#000000': 'foreground',
        '#ffffff': 'background', 
        '#f3f4f6': 'muted',
        '#e5e7eb': 'border',
        '#6b7280': 'muted-foreground',
      };
      return colorMap[value.toLowerCase()] || 'appropriate color token (primary, secondary, etc.)';
    }
  },
  
  // RGB/RGBA patterns
  {
    pattern: /rgba?\([^)]+\)/g,
    type: 'color',
    suggest: () => 'color token with opacity (hsl(var(--primary) / 0.8))'
  },
  
  // Font size patterns
  {
    pattern: /\b(\d+(?:\.\d+)?)rem\b/g,
    type: 'fontSize',
    suggest: (value: string) => {
      const rem = parseFloat(value.replace('rem', ''));
      if (rem === 0.75) return 'text-xs';
      if (rem === 0.875) return 'text-sm';
      if (rem === 1) return 'text-base';
      if (rem === 1.125) return 'text-lg';
      if (rem === 1.25) return 'text-xl';
      if (rem === 1.5) return 'text-2xl';
      if (rem === 1.875) return 'text-3xl';
      if (rem === 2.25) return 'text-4xl';
      return 'closest text-* token';
    }
  },
  
  // Border radius patterns
  {
    pattern: /border-radius:\s*(\d+)px/g,
    type: 'borderRadius',
    suggest: (value: string) => {
      const px = parseInt(value.match(/\d+/)?.[0] || '0');
      if (px <= 4) return 'rounded-sm';
      if (px <= 6) return 'rounded';
      if (px <= 8) return 'rounded-lg';
      if (px <= 12) return 'rounded-xl';
      return 'rounded-2xl';
    }
  }
];

export interface DetectedIssue {
  type: 'spacing' | 'color' | 'fontSize' | 'borderRadius' | 'shadow';
  value: string;
  suggestion: string;
  line?: number;
  column?: number;
  context?: string;
}

export class DesignSystemMigrator {
  private issues: DetectedIssue[] = [];
  
  /**
   * Analyze a string for hardcoded values
   */
  analyzeString(content: string, context?: string): DetectedIssue[] {
    const issues: DetectedIssue[] = [];
    
    for (const pattern of HARDCODED_PATTERNS) {
      let match;
      pattern.pattern.lastIndex = 0; // Reset regex state
      
      while ((match = pattern.pattern.exec(content)) !== null) {
        const value = match[0];
        const suggestion = pattern.suggest(value);
        
        issues.push({
          type: pattern.type,
          value,
          suggestion,
          context
        });
      }
    }
    
    return issues;
  }
  
  /**
   * Analyze a file content with line/column information
   */
  analyzeFile(content: string, filename?: string): DetectedIssue[] {
    const lines = content.split('\n');
    const allIssues: DetectedIssue[] = [];
    
    lines.forEach((line, lineIndex) => {
      const lineIssues = this.analyzeString(line, filename);
      lineIssues.forEach(issue => {
        allIssues.push({
          ...issue,
          line: lineIndex + 1,
          column: line.indexOf(issue.value) + 1
        });
      });
    });
    
    return allIssues;
  }
  
  /**
   * Check if a className contains arbitrary Tailwind values
   */
  analyzeClassName(className: string): DetectedIssue[] {
    const issues: DetectedIssue[] = [];
    const arbitraryPattern = /\[([^\]]+)\]/g;
    let match;
    
    while ((match = arbitraryPattern.exec(className)) !== null) {
      const value = match[1];
      const fullMatch = match[0];
      
      // Check if it's a hardcoded value we should suggest replacing
      const stringIssues = this.analyzeString(value);
      stringIssues.forEach(issue => {
        issues.push({
          ...issue,
          value: fullMatch,
          context: 'Tailwind arbitrary value'
        });
      });
    }
    
    return issues;
  }
  
  /**
   * Generate auto-fix suggestions
   */
  generateAutoFix(issue: DetectedIssue): string {
    switch (issue.type) {
      case 'spacing':
        if (issue.value.includes('px')) {
          const px = parseInt(issue.value.replace('px', ''));
          // Convert to Tailwind spacing scale
          const scale = Math.round(px / 4);
          return `${scale}`;
        }
        break;
        
      case 'color':
        if (issue.value.startsWith('#')) {
          return 'primary'; // Default suggestion
        }
        break;
        
      case 'fontSize':
        if (issue.value.includes('rem')) {
          const rem = parseFloat(issue.value.replace('rem', ''));
          if (rem === 0.75) return 'text-xs';
          if (rem === 0.875) return 'text-sm';
          if (rem === 1) return 'text-base';
          if (rem === 1.125) return 'text-lg';
          if (rem === 1.25) return 'text-xl';
          if (rem === 1.5) return 'text-2xl';
        }
        break;
    }
    
    return issue.suggestion;
  }
  
  /**
   * Get summary of all issues
   */
  getSummary(issues: DetectedIssue[]) {
    const summary = {
      total: issues.length,
      byType: {} as Record<string, number>,
      mostCommon: {} as Record<string, number>
    };
    
    issues.forEach(issue => {
      summary.byType[issue.type] = (summary.byType[issue.type] || 0) + 1;
      summary.mostCommon[issue.value] = (summary.mostCommon[issue.value] || 0) + 1;
    });
    
    return summary;
  }
  
  /**
   * Generate a migration report
   */
  generateReport(issues: DetectedIssue[]): string {
    const summary = this.getSummary(issues);
    
    let report = `# Design System Migration Report\n\n`;
    report += `Found ${summary.total} hardcoded values that could use design tokens.\n\n`;
    
    if (summary.total === 0) {
      report += `✅ Great! No hardcoded values detected.\n`;
      return report;
    }
    
    report += `## Issues by Type\n`;
    Object.entries(summary.byType).forEach(([type, count]) => {
      report += `- ${type}: ${count} issues\n`;
    });
    
    report += `\n## Most Common Values\n`;
    const sortedCommon = Object.entries(summary.mostCommon)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
      
    sortedCommon.forEach(([value, count]) => {
      report += `- \`${value}\`: ${count} occurrences\n`;
    });
    
    report += `\n## Detailed Issues\n`;
    issues.forEach((issue, index) => {
      report += `\n### Issue ${index + 1}\n`;
      report += `- **Type**: ${issue.type}\n`;
      report += `- **Value**: \`${issue.value}\`\n`;
      report += `- **Suggestion**: ${issue.suggestion}\n`;
      if (issue.line) {
        report += `- **Location**: Line ${issue.line}`;
        if (issue.column) report += `, Column ${issue.column}`;
        report += `\n`;
      }
      if (issue.context) {
        report += `- **Context**: ${issue.context}\n`;
      }
      report += `- **Auto-fix**: \`${this.generateAutoFix(issue)}\`\n`;
    });
    
    return report;
  }
}

// Export utilities
export const migrator = new DesignSystemMigrator();

export function analyzeComponent(content: string, filename?: string): DetectedIssue[] {
  return migrator.analyzeFile(content, filename);
}

export function analyzeClassName(className: string): DetectedIssue[] {
  return migrator.analyzeClassName(className);
}

export function generateMigrationReport(content: string, filename?: string): string {
  const issues = analyzeComponent(content, filename);
  return migrator.generateReport(issues);
}

// CLI helper for batch analysis
export async function analyzeBatchFiles(filePaths: string[]): Promise<DetectedIssue[]> {
  const allIssues: DetectedIssue[] = [];
  
  // In a real implementation, you'd read files here
  // This is a placeholder for the structure
  console.log(`Would analyze ${filePaths.length} files...`);
  
  return allIssues;
}

export default migrator;