const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'components')
];

const REPLACE_MAP = {
  // Backgrounds
  'bg-white': 'bg-background',
  'bg-gray-50': 'bg-muted',
  'bg-gray-100': 'bg-secondary',
  'bg-gray-200': 'bg-border',
  'bg-gray-900': 'bg-foreground',
  'bg-black': 'bg-foreground',
  
  // Text
  'text-black': 'text-foreground',
  'text-gray-900': 'text-foreground',
  'text-gray-800': 'text-foreground',
  'text-gray-700': 'text-muted-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-gray-400': 'text-muted-foreground',
  'text-gray-300': 'text-muted-foreground',
  
  // Borders
  'border-gray-100': 'border-border',
  'border-gray-200': 'border-border',
  'border-gray-300': 'border-border',
  'border-gray-800': 'border-border',
};

// Dark mode overrides to remove because semantic tokens handle this natively!
const DARK_MODE_STRIP = [
  /dark:bg-brand-deep\/?\d*/g,
  /dark:bg-brand-void\/?\d*/g,
  /dark:bg-white\/?\d*/g,
  /dark:bg-black\/?\d*/g,
  /dark:text-white\/?\d*/g,
  /dark:text-gray-\d+/g,
  /dark:border-white\/?\d*/g,
  /dark:border-gray-\d+/g,
  /dark:hover:bg-brand-magenta\/?\d*/g,
  /dark:hover:text-white\/?\d*/g,
  /dark:hover:bg-white\/?\d*/g,
];

function processFile(filePath) {
  // Skip the new ui primitives
  if (filePath.includes(path.join('components', 'ui'))) return;
  // Skip ThemeToggle, Navbar, Footer which I manually did
  if (filePath.endsWith('Navbar.tsx') || filePath.endsWith('Footer.tsx') || filePath.endsWith('ThemeToggle.tsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace hardcoded classes with semantic tokens
  for (const [oldClass, newClass] of Object.entries(REPLACE_MAP)) {
    // regex to match exact class, allowing for trailing opacity (e.g., bg-white/50)
    const regex = new RegExp(`\\b${oldClass}(\\/\\d+)?\\b`, 'g');
    content = content.replace(regex, (match, opacity) => {
      return opacity ? `${newClass}${opacity}` : newClass;
    });
  }

  // 2. Strip unnecessary dark mode overrides
  for (const regex of DARK_MODE_STRIP) {
    content = content.replace(regex, '');
  }

  // 3. Clean up double spaces caused by stripping
  content = content.replace(/\s{2,}/g, ' ');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

DIRECTORIES.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  }
});

console.log("Migration complete!");
