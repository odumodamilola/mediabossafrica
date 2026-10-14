const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const files = [...walkSync('pages', []), ...walkSync('components', [])];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Next.js client component directive
  let needsUseClient = false;
  if (content.includes('useNavigate') || content.includes('useParams') || content.includes('useState') || content.includes('useEffect') || content.includes('framer-motion')) {
      needsUseClient = true;
  }

  // Replace react-router-dom imports
  if (content.includes('react-router-dom')) {
    // If it imports Link
    if (content.match(/import\s*{[^}]*Link[^}]*}\s*from\s*['"]react-router-dom['"];?/)) {
      content = content.replace(/import\s*{([^}]*Link[^}]*)}\s*from\s*['"]react-router-dom['"];?/, (match, p1) => {
          let newImport = `import Link from 'next/link';\n`;
          let others = p1.split(',').map(s => s.trim()).filter(s => s !== 'Link' && s !== '');
          if (others.length > 0) {
              newImport += `import { ${others.join(', ')} } from 'react-router-dom';`;
          }
          return newImport;
      });
    }
    
    // Replace useNavigate
    if (content.includes('useNavigate')) {
      content = content.replace(/useNavigate/g, 'useRouter');
      content = content.replace(/const navigate = useRouter\(\);/g, 'const router = useRouter();');
      content = content.replace(/navigate\(/g, 'router.push(');
    }

    // Replace useParams
    // Next.js uses useParams from next/navigation
    
    // Fix remaining react-router-dom imports
    content = content.replace(/import\s*{([^}]*)}\s*from\s*['"]react-router-dom['"];?/, (match, p1) => {
        let imports = p1.split(',').map(s => s.trim());
        let newImports = [];
        if (imports.includes('useRouter') || imports.includes('useParams') || imports.includes('useLocation')) {
            let nextNavImports = [];
            if (imports.includes('useRouter')) nextNavImports.push('useRouter');
            if (imports.includes('useParams')) nextNavImports.push('useParams');
            if (imports.includes('useLocation')) nextNavImports.push('usePathname as useLocation');
            newImports.push(`import { ${nextNavImports.join(', ')} } from 'next/navigation';`);
        }
        return newImports.join('\n');
    });
  }

  // Next.js <Link> doesn't use `to`, it uses `href`
  content = content.replace(/<Link([^>]*)to=/g, '<Link$1href=');

  if (content !== originalContent) {
    if (needsUseClient && !content.includes('"use client"')) {
        content = '"use client";\n\n' + content;
    }
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
