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

  // Fix assets imports
  // import something from '../assets/...'; -> const something = '/assets/...';
  // or import something from '../../assets/...';
  content = content.replace(/import\s+([A-Za-z0-9_]+)\s+from\s+['"](?:\.\.\/)+assets\/([^'"]+)['"];?/g, (match, p1, p2) => {
    return `const ${p1} = '/assets/${p2}';`;
  });

  // Prepend "use client" if it uses React hooks or framer-motion and doesn't have it
  const hooks = ['useState', 'useEffect', 'useRef', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'framer-motion'];
  const needsUseClient = hooks.some(hook => content.includes(hook));

  if (needsUseClient && !content.includes('"use client"')) {
    content = '"use client";\n\n' + content;
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
