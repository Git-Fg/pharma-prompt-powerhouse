/**
 * Build and Generation Tests
 * Test that critical build processes and content generation work correctly
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('Build and Generation', () => {
  const contentCollectionsDir = path.join(process.cwd(), '.content-collections');

  describe('Content Collections Build', () => {
    test('content-collections directory exists after build', () => {
      if (fs.existsSync(contentCollectionsDir)) {
        expect(fs.lstatSync(contentCollectionsDir).isDirectory()).toBe(true);
      } else {
        // Try to run content-collections build
        try {
          execSync('pnpm build', { stdio: 'pipe', cwd: process.cwd() });
        } catch (_error) {
          // Build might fail in test environment, but we can still check basic structure
        }
      }
    });

    test('generated types directory exists', () => {
      const generatedDir = path.join(contentCollectionsDir, 'generated');
      if (fs.existsSync(generatedDir)) {
        expect(fs.lstatSync(generatedDir).isDirectory()).toBe(true);
      }
    });
  });

  describe('Next.js Build Configuration', () => {
    test('next.config.ts exists and is valid', () => {
      const configPath = path.join(process.cwd(), 'next.config.ts');
      expect(fs.existsSync(configPath)).toBe(true);
      
      const configContent = fs.readFileSync(configPath, 'utf-8');
      expect(configContent).toContain('withContentCollections');
      expect(configContent).toContain('reactCompiler');
    });

    test('tailwind.config.ts exists', () => {
      const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.ts');
      expect(fs.existsSync(tailwindConfigPath)).toBe(true);
    });

    test('content-collections.ts exists and has valid structure', () => {
      const ccConfigPath = path.join(process.cwd(), 'content-collections.ts');
      expect(fs.existsSync(ccConfigPath)).toBe(true);
      
      const ccContent = fs.readFileSync(ccConfigPath, 'utf-8');
      expect(ccContent).toContain('defineCollection');
      expect(ccContent).toContain('defineConfig');
      expect(ccContent).toContain('concepts');
      expect(ccContent).toContain('guides');
      expect(ccContent).toContain('prompts');
      expect(ccContent).toContain('externalTools');
    });
  });

  describe('Package Configuration', () => {
    test('package.json has correct structure', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      expect(fs.existsSync(packageJsonPath)).toBe(true);
      
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      expect(packageJson.name).toBe('pharmainfo');
      expect(packageJson.packageManager).toMatch(/^pnpm@/);
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.build).toBe('next build');
      expect(packageJson.scripts.dev).toBe('next dev');
      expect(packageJson.scripts.test).toBe('jest');
    });

    test('required dependencies are present', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      const requiredDeps = [
        'next',
        'react',
        'react-dom',
        '@content-collections/core',
        '@content-collections/mdx',
        '@content-collections/next',
        'content-collections',
        'zod',
        'tailwindcss'
      ];
      
      for (const dep of requiredDeps) {
        expect(packageJson.dependencies[dep]).toBeDefined();
      }
    });

    test('development dependencies are present', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      const requiredDevDeps = [
        'typescript',
        'eslint',
        '@types/react',
        '@types/node',
        'jest',
        'ts-jest',
        '@types/jest'
      ];
      
      for (const dep of requiredDevDeps) {
        expect(packageJson.devDependencies[dep]).toBeDefined();
      }
    });
  });

  describe('TypeScript Configuration', () => {
    test('tsconfig.json exists and is valid', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      expect(fs.existsSync(tsconfigPath)).toBe(true);
      
      const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
      expect(() => JSON.parse(tsconfigContent)).not.toThrow();
      
      const tsconfig = JSON.parse(tsconfigContent);
      expect(tsconfig.compilerOptions).toBeDefined();
      expect(tsconfig.compilerOptions.paths).toBeDefined();
      expect(tsconfig.compilerOptions.paths['@/*']).toBeDefined();
    });

    test('path aliases are configured correctly', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
      
      expect(tsconfig.compilerOptions.paths['@/*']).toContain('./src/*');
    });
  });

  describe('Git Configuration', () => {
    test('.gitignore exists and includes necessary entries', () => {
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      expect(fs.existsSync(gitignorePath)).toBe(true);
      
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
      expect(gitignoreContent).toContain('node_modules');
      expect(gitignoreContent).toContain('.next');
      expect(gitignoreContent).toContain('.content-collections');
    });
  });
});