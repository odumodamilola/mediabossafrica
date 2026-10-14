/**
 * CORRECTIVE MIGRATION SCRIPT
 * 
 * The previous migration incorrectly mapped:
 *   bg-gray-900 → bg-foreground  (WRONG - foreground is TEXT color, not a BG surface)
 * 
 * The design uses an "inverted" dark section pattern where:
 *   Light mode: section background is WHITE (bg-white / bg-gray-900-as-dark-surface was wrong)
 *   Dark mode: section background is VERY DARK (like brand-deep / brand-void)
 * 
 * In the original code, `bg-gray-900` sections were dark accent areas in light mode
 * and should remain dark in dark mode. The correct semantic token for these is:
 *   "A dark surface" = use an explicit dark class or brand color, not bg-foreground.
 *
 * Strategy:
 * 1. Remove the broken "dark:bg-foreground" patterns
 * 2. Fix top-level page wrappers that have "bg-background dark:bg-foreground" 
 *    -> should just be "bg-background"
 * 3. Fix card-level "bg-background dark:bg-foreground" inside sections
 *    -> should be "bg-card" (which is correct - card surface token)
 * 4. Remove remaining broken dark: overrides that cancel out semantic tokens
 */

const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'components'),
  path.join(__dirname, 'app'),
];

// These are direct string replacements (exact match)
const EXACT_REPLACEMENTS = [
  // Top-level page wrapper - should just use bg-background (semantic)
  ['bg-background dark:bg-foreground transition-colors duration-500', 'bg-background transition-colors duration-500'],
  ['bg-background dark:bg-foreground transition-colors', 'bg-background transition-colors'],
  ['bg-background dark:bg-foreground', 'bg-background'],
  
  // Section backgrounds that were originally "dark" surfaces - make them bg-card
  // (card token in dark mode is slightly elevated from background)
  // Pattern: "rounded-[Xpx] bg-background dark:bg-foreground border"
  // -> use bg-card instead which is the correct elevated surface
  
  // BTS section and Project section wrappers with dark:bg-foreground
  ['bg-background dark:bg-foreground py-', 'bg-background py-'],
  ['bg-muted dark:bg-foreground py-', 'bg-muted py-'],
  ['bg-secondary dark:bg-foreground transition-colors', 'bg-secondary transition-colors'],
  
  // Cards within sections using dark:bg-foreground
  ['bg-background dark:bg-foreground border border-border', 'bg-card border border-border'],
  ['bg-background dark:bg-foreground border border-border shadow-2xl', 'bg-card border border-border shadow-2xl'],
  ['bg-background dark:bg-foreground border border-border p-', 'bg-card border border-border p-'],
  ['bg-background dark:bg-foreground border border-border hover:', 'bg-card border border-border hover:'],
  ['bg-background dark:bg-foreground rounded-', 'bg-card rounded-'],
  ['bg-background dark:bg-foreground shadow-', 'bg-card shadow-'],
  
  // Fix PR and other pages hero sections
  ['bg-muted dark:bg-background/5', 'bg-muted dark:bg-card'],
  ['bg-background dark:bg-background/5', 'bg-card dark:bg-card'],
  
  // Fix icon backgrounds inside cards
  ['bg-background dark:bg-foreground shadow-xl flex items-center', 'bg-muted dark:bg-muted flex items-center'],
  ['bg-background dark:bg-foreground shadow-lg flex items-center', 'bg-muted dark:bg-muted flex items-center'],
  ['w-8 h-8 rounded-full bg-background dark:bg-foreground border', 'w-8 h-8 rounded-full bg-background border'],
  
  // Fix text color in "dark" overlay areas - foreground/40 on image overlays is correct
  // but standalone text-foreground in a dark surface needs care
  
  // Fix the comparison card in ContentProduction
  ['bg-background dark:bg-foreground overflow-hidden', 'bg-card overflow-hidden'],
  
  // Divider lines that were broken
  ['bg-gray-300 dark:bg-background/15', 'bg-border'],
  ['bg-gray-300 dark:bg-background/10', 'bg-border'],
  
  // Fix DigitalMarketing service section dividers
  ['bg-secondary dark:bg-background/10', 'bg-border'],
  
  // Hero section text on video - keep text-white since it's over video
  // These are fine as-is
  
  // PullRelations hero button
  ['bg-foreground dark:bg-background text-white dark:text-foreground rounded-xl', 'bg-foreground text-background rounded-xl'],
  
  // Navbar hamburger bars use bg-foreground which is correct (they should be text color)
  // -> leave those alone (they are already correct in Navbar.tsx)
];

function processFile(filePath) {
  // Skip ui primitives
  if (filePath.includes(path.join('components', 'ui'))) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const [from, to] of EXACT_REPLACEMENTS) {
    // Replace all occurrences
    while (content.includes(from)) {
      content = content.replace(from, to);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${path.basename(filePath)}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip the admin/ui dirs since we handle those separately
      if (file === 'ui') continue;
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

DIRECTORIES.forEach(dir => walkDir(dir));
console.log('\n✅ Corrective migration complete!');
