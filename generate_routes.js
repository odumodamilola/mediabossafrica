const fs = require('fs');
const path = require('path');

const routes = {
  'about-us': 'Features',
  'digital-marketing': 'DigitalMarketing',
  'public-relations': 'PublicRelations',
  'talent-management': 'TalentManagement',
  'content-production': 'ContentProduction',
  'pricing': 'Pricing',
  'resources': 'Resources',
  'contact': 'Contact',
  'talent': 'Talent',
  'talent/apply': 'talent/ApplyForm',
  'work': 'Work',
  'privacy': 'Privacy',
  'terms': 'Terms',
  'studio': 'Studio',
  'talent-form': 'TalentForm',
  '[talentSlug]': 'TalentDetail',
};

for (const [route, component] of Object.entries(routes)) {
  const dirPath = path.join(__dirname, 'app', route);
  fs.mkdirSync(dirPath, { recursive: true });
  
  let importPath = '';
  const depth = route.split('/').length;
  if (depth === 1) {
    importPath = `../../pages/${component}`;
  } else if (depth === 2) {
    importPath = `../../../pages/${component}`;
  } else {
    importPath = `../../pages/${component}`;
  }

  // Handle dynamic routes needing params
  const content = `import PageComponent from '${importPath}';

export default function Page() {
  return <PageComponent />;
}
`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
  console.log(`Created app/${route}/page.tsx`);
}
