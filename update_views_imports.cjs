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

const appFiles = walkSync('frontend/app', []);
const viewsFiles = walkSync('frontend/views', []);
const componentFiles = walkSync('frontend/components', []);
const allFiles = [...appFiles, ...viewsFiles, ...componentFiles];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace ../pages/ to ../views/
  content = content.replace(/['"](\.\.\/)+pages\//g, (match) => {
    return match.replace('pages/', 'views/');
  });
  
  // Replace ./pages/ to ./views/
  content = content.replace(/['"]\.\/pages\//g, "'./views/");

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
