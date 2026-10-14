/**
 * Final targeted fixes:
 * 1. Home.tsx: "dark:bg-foreground" in BTS/Projects sections → remove (let bg-background handle)
 * 2. Hero.tsx: "dark:from-brand-deep" etc. are correct — KEEP (hero overlay)  
 * 3. Studio/Work/Resources: fix remaining dark:bg-foreground issues
 */

const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'views/Home.tsx'),
  path.join(__dirname, 'views/Studio.tsx'),
  path.join(__dirname, 'views/Work.tsx'),
  path.join(__dirname, 'views/Resources.tsx'),
];

const replacements = [
  // These are sections that use dark bg - should just stay as bg-background or bg-muted
  ['dark:bg-foreground py-10 sm:py-12', 'py-10 sm:py-12'],
  ['bg-muted dark:bg-foreground py-10 sm:py-12', 'bg-muted py-10 sm:py-12'],
  // Project dot indicators
  ["'bg-gray-400 hover:bg-gray-500 dark:bg-background/45 dark:hover:bg-background/70'", "'bg-muted-foreground/30 hover:bg-muted-foreground/50'"],
  // Slider wrapper that might have leftover dark class
  ['bg-secondary dark:bg-foreground', 'bg-secondary'],
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', path.basename(filePath));
  }
});

console.log('Done');
