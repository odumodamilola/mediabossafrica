
export type PageType =
  | 'home'
  | 'features'
  | 'solutions'
  | 'about-us'
  | 'service'
  | 'pricing'
  | 'resources'
  | 'contact'
  | 'talent'
  | 'talent/apply'
  | 'work'
  | 'privacy'
  | 'terms'
  | 'studio'
  | 'talent-form';

export interface NavItem {
  label: string;
  href: PageType;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon?: string;
}

export interface Feature {
  title: string;
  description: string;
  category: string;
  metric?: string;
  image?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Resource {
  title: string;
  type: 'Article' | 'Case Study' | 'Report';
  image: string;
  readTime: string;
}

export interface Industry {
  name: string;
  image?: string;
  streamableId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CaseStudy {
  title: string;
  client: string;
  category: string;
  image: string;
  result: string;
}
