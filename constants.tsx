
import { NavItem, Service, Industry, FAQItem, Feature, PricingPlan, Resource, CaseStudy } from './types';

export const SEO_CONFIG = {
  home: {
    title: "Mediaboss Africa | Engineering Cultural Dominance",
    description: "The premier talent management agency for Nigerian creators. We provide 4K studio production in Lagos, brand matching for African influencers, and global scaling strategies.",
    keywords: "talent management agency Lagos, best influencer agency Nigeria, monetize social media Nigeria"
  },
  features: {
    title: "Our Capabilities | Best Content Production Studio in Lagos",
    description: "High-fidelity production and AI-backed brand matching. See how we help Lagos creators land international dollar deals.",
    keywords: "video production studio Lagos, creator tools Nigeria"
  },
  solutions: {
    title: "Sectors We Serve | Tech, Fashion & Lifestyle Nigeria",
    description: "Niche strategies for the Nigerian market. From Fintech in Yaba to Luxury in Victoria Island.",
    keywords: "fintech influencer marketing Nigeria, beauty influencer agency Lagos"
  },
  pricing: {
    title: "Partnership Models | Flexible Plans for Nigerian Creators",
    description: "Join the most elite roster in Africa. Performance-based management designed to scale your influence.",
    keywords: "influencer management rates Nigeria, join talent agency Lagos"
  },
  resources: {
    title: "Intelligence Hub | Nigeria Creator Market Report 2026",
    description: "Insights into the Lagos creator economy. Learn how to navigate the Nigerian digital landscape.",
    keywords: "Nigeria creator report 2026, Lagos social media trends"
  },
  contact: {
    title: "Contact Us | Mediaboss Offices in Lagos & London",
    description: "Ready to scale your brand? Visit our studios in Lagos or reach out to our strategy team online.",
    keywords: "talent agency office Lagos, contact Mediaboss Africa"
  },
  apply: {
    title: "Join the Roster | Talent Application Mediaboss Africa",
    description: "Apply for elite representation. We transform African creators into global legends.",
    keywords: "apply talent agency Nigeria, influencer representation Lagos"
  },
  work: {
    title: "Our Work | Case Studies of Cultural Dominance",
    description: "Explore the global campaigns and cinematic productions engineered by Mediaboss Africa.",
    keywords: "creative portfolio Nigeria, influencer case studies Africa"
  },
  privacy: {
    title: "Privacy Policy | Mediaboss Africa",
    description: "How we protect your data and intellectual property.",
    keywords: "privacy policy, data protection"
  },
  terms: {
    title: "Terms of Service | Mediaboss Africa",
    description: "Our legal framework for partnership and service delivery.",
    keywords: "terms of service, legal agreement"
  }
};

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: 'home' },
  { label: 'Capabilities', href: 'features' },
  { label: 'Work', href: 'work' },
  { label: 'Partnership', href: 'pricing' },
  { label: 'Intelligence', href: 'resources' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "The Fintech Revolution",
    client: "PayFuture Africa",
    category: "Influencer Campaign",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    result: "4.2M New Users in 90 Days"
  },
  {
    title: "Lagos Fashion Week 2025",
    client: "LFW Global",
    category: "Cinematic Production",
    image: "https://images.unsplash.com/photo-1539109132304-39c099393301?q=80&w=800",
    result: "12M Organic Video Views"
  },
  {
    title: "Sound of the Continent",
    client: "Audiomack NG",
    category: "Content Strategy",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800",
    result: "+400% Creator Retention"
  }
];

export const FEATURES: Feature[] = [
  {
    title: "Global Dollar Revenue",
    description: "We bridge the gap between Lagos creativity and International budgets, ensuring our talent earns in stable global currencies.",
    category: "Income",
    metric: "Dollar Deals"
  },
  {
    title: "Naija-Centric Data",
    description: "Our AI understands local slang, trends, and buying habits, matching you with brands that actually resonate with your Nigerian audience.",
    category: "Data",
    metric: "Local Impact"
  },
  {
    title: "Lagos Studio Access",
    description: "Professional cinema-grade equipment available for our roster. No more 'managing' with just a phone; produce world-class content.",
    category: "Quality",
    metric: "Pro-Grade"
  },
  {
    title: "Legal & IP Security",
    description: "We protect your content from being used without payment. Our legal team handles the 'wahala' of contracts and copyright.",
    category: "Safety",
    metric: "Secure IP"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Growth",
    price: "Standard",
    description: "For creators with 50k+ followers ready to professionalize and start earning consistently.",
    features: ["Media Kit Design", "Brand Pitching", "Basic Legal Review", "Studio Sessions"],
  },
  {
    name: "Dominance",
    price: "Premium",
    description: "Elite 360-management for top-tier African talent. We handle everything from taxes to global tours.",
    features: ["Full 360 Management", "International Brand Deals", "Priority Studio Use", "Global PR Strategy", "Legal Protection"],
    recommended: true
  },
  {
    name: "Corporate",
    price: "Custom",
    description: "For brands looking to capture the Nigerian market through authentic campaigns.",
    features: ["Campaign Strategy", "Talent Vetting", "Analytics & Reporting", "Full Production"],
  }
];

export const RESOURCES: Resource[] = [
  {
    title: "How to Land Your First $1,000 Brand Deal in Lagos",
    type: "Article",
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=400",
    readTime: "10 min read"
  },
  {
    title: "The Rise of Nigerian Fintech Influencers",
    type: "Case Study",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=400",
    readTime: "12 min read"
  },
  {
    title: "Navigating Nigerian Copyright Law for Creators",
    type: "Article",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400",
    readTime: "8 min read"
  }
];

export const TRUSTED_BRANDS = ['MTN', 'Airtel', 'Flutterwave', 'Kuda', 'Piggyvest', 'Glo', 'JustArt', 'Red Bull'];

export const SERVICES: Service[] = [
  {
    id: 'talent',
    title: 'Talent Management',
    description: 'We turn Lagos creators into global icons through professional career engineering and strategic branding.',
    items: ['Career Growth', 'Dollar Brand Deals', 'Legal Wahala-Free', 'PR']
  },
  {
    id: 'studio',
    title: 'Lagos Production',
    description: 'Stop compromising on quality. Use our Lagos studios to produce content that rivals Hollywood.',
    items: ['TV Commercials', 'Series', 'Podcasts', 'Viral Ads']
  },
  {
    id: 'consulting',
    title: 'Market Entry',
    description: 'Helping international brands speak the language of the Nigerian consumer through authentic influence.',
    items: ['Consumer Data', 'Slang Strategy', 'Influencer Mapping', 'Reporting']
  }
];

export const INDUSTRIES: Industry[] = [
  { name: 'Luxury & Lifestyle', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600' },
  { name: 'Tech & Fintech', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600' },
  { name: 'Music & Arts', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600' },
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need a large following to join the Mediaboss roster?",
    answer: "We look at engagement and content quality over just numbers. Most of our creators have at least 50k followers, but we scout 'emerging legends' with smaller, highly active Lagos audiences too."
  },
  {
    question: "Where are your Lagos offices located?",
    answer: "Our main production studio is located in the heart of Lagos, with satellite meeting points in Lekki and Ikeja to serve our creators across the city."
  }
];
