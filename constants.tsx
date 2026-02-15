

import { NavItem, Service, Industry, FAQItem, Feature, PricingPlan, Resource, CaseStudy, PageType } from './types';

// ROUTING MANIFEST: Type-safe list of all valid pages (prevents dead-ends)
export const VALID_PAGES: readonly PageType[] = ['home', 'features', 'solutions', 'pricing', 'resources', 'contact', 'apply', 'work', 'privacy', 'terms'] as const;


export const SEO_CONFIG = {
  home: {
    title: "Mediaboss Africa | Influence. Innovation. Impact.",
    description: "Leading pan-African talent management and influencer marketing company. We build influence that converts through strategic storytelling and different data-driven campaigns.",
    keywords: "talent management africa, influencer marketing nigeria, creative media agency, brand partnerships, mediaboss studio"
  },
  features: {
    title: "Professional Content Studio in Lekki, Lagos | Mediaboss Africa",
    description: "Access world-class production facilities in Lagos. Create premium content that attracts brand partnerships. Based in Lekki.",
    keywords: "content production studio Lagos, video production Nigeria, creator studio Lekki, Lagos production facilities"
  },
  solutions: {
    title: "Industries We Serve | Tech, Fashion & Lifestyle Nigeria",
    description: "Helping Nigerian brands and creators dominate in tech, fashion, music, and lifestyle. Real culture, real results.",
    keywords: "fintech influencer marketing Nigeria, fashion influencer agency Lagos"
  },
  pricing: {
    title: "Join Mediaboss | Partnership Plans for Nigerian Creators",
    description: "Ready to earn from your content? Join Africa's most elite creator roster. We only win when you win.",
    keywords: "join influencer agency Nigeria, talent management rates Lagos"
  },
  resources: {
    title: "Creator Resources | Nigeria Influencer Marketing Insights 2026",
    description: "Learn how to land your first brand deal, protect your content, and build wealth as a Nigerian creator.",
    keywords: "Nigeria creator guide 2026, Lagos influencer tips, brand deals Nigeria"
  },
  contact: {
    title: "Contact Mediaboss | Lagos Creator Agency",
    description: "Ready to turn your influence into income? Visit our Lagos studio or reach out online. Let's build something legendary.",
    keywords: "contact talent agency Lagos, Mediaboss Africa location"
  },
  apply: {
    title: "Join Mediaboss | Apply to Top Talent Agency in Nigeria",
    description: "Ready to earn from your content? Apply to join Africa's premier creator agency. We handle brand deals, legal, and production.",
    keywords: "apply influencer agency Nigeria, join talent agency Lagos"
  },
  work: {
    title: "Our Work | Nigerian Creator Success Stories",
    description: "See how we've helped African creators land million-naira campaigns and build global audiences.",
    keywords: "influencer marketing case studies Nigeria, creator portfolio Africa"
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
  { label: 'About Us', href: 'features' },
  { label: 'Services', href: 'solutions' },
  { label: 'Our Work', href: 'work' },
  { label: 'Contact', href: 'contact' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "The Fintech Revolution",
    client: "PayFuture Africa",
    category: "Influencer Campaign",
    image: "https://i.ibb.co/Qj9JvWN6/Save-Clip-App-522829130-18394235239142600-4624636850389265179-n.jpg",
    result: "4.2M New Users in 90 Days"
  },
  {
    title: "Lagos Fashion Week 2025",
    client: "LFW Global",
    category: "Cinematic Production",
    image: "https://i.ibb.co/tp8V5rJh/Save-Clip-App-615090775-18556831825025304-3688801026426920160-n.jpg",
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
    title: "Video Production",
    description: "Short-form & long-form content creation that captivates audiences.",
    category: "Studio",
    metric: "4K Quality",
    image: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=800"
  },
  {
    title: "Social Media Content",
    description: "Platform-optimized content across Instagram, TikTok, YouTube, and X.",
    category: "Social",
    metric: "Viral Ready",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800"
  },
  {
    title: "Podcast Production",
    description: "Full-service audio and video podcast recording and editing.",
    category: "Audio",
    metric: "Pro Sound",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"
  },
  {
    title: "Creative Direction",
    description: "Photography, branding, and visual storytelling that sets you apart.",
    category: "Creative",
    metric: "Visionary",
    image: "https://images.unsplash.com/photo-1542038784456-1ea0e93ca370?q=80&w=800"
  },
  {
    title: "Branded Content",
    description: "Commercial shoots and campaign assets that drive brand goals.",
    category: "Business",
    metric: "High ROI",
    image: "https://images.unsplash.com/photo-1493655161922-ef98929de9d8?q=80&w=800"
  },
  {
    title: "Post-Production",
    description: "Editing, motion graphics, and finishing touches for a polished look.",
    category: "Editing",
    metric: "Top Tier",
    image: "https://images.unsplash.com/photo-1574717432707-c67be3152631?q=80&w=800"
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

export const TRUSTED_BRANDS = ['MTN', 'LXGlobal', 'PushBio', 'INTO REALTOR', 'POLYMATHS REALESTATE', 'TOLISA', 'UR3 Conference', 'JustArt', 'Lagos Sales Party', 'RCCG'];

export const SERVICES: Service[] = [
  {
    id: 'influencer-marketing',
    title: 'Influencer Marketing & Campaigns',
    description: 'Strategic influencer-led campaigns designed for reach, engagement, and conversion across Instagram, TikTok, YouTube, X (Twitter), and emerging platforms.',
    items: ['Strategic Campaigns', 'Multi-platform Reach', 'Engagement & Conversion', 'Emerging Platforms']
  },
  {
    id: 'talent-management',
    title: 'Talent Management & Development',
    description: 'Comprehensive talent representation including personal brand strategy, deal negotiation, career growth, monetization, and media training.',
    items: ['Brand Strategy', 'Deal Negotiation', 'Career Growth', 'Media Training']
  },
  {
    id: 'brand-partnerships',
    title: 'Brand Partnerships & Endorsements',
    description: 'Matching brands with the right talents for product launches, brand ambassadorships, event partnerships, and long-term collaborations.',
    items: ['Product Launches', 'Ambassadorships', 'Event Partnerships', 'Long-term Collabs']
  },
  {
    id: 'campaign-strategy',
    title: 'Strategy, Planning & Analytics',
    description: 'Insight-led campaign development with performance tracking, reporting, and optimization to ensure measurable results.',
    items: ['Insight-led Development', 'Performance Tracking', 'Reporting', 'Optimization']
  }
];

export const INDUSTRIES: Industry[] = [
  { name: 'Fashion & Lifestyle', image: 'https://i.ibb.co/B5BQSkPK/Snap-Insta-to-630154093-17878035255475240-2279539179607894162-n.jpg' },
  { name: 'Beauty & Skincare', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=800' },
  { name: 'Tech & Fintech', image: 'https://i.ibb.co/XfdsTPmw/Snap-Insta-to-580755341-18347780410167386-4230984891800564498-n.jpg' },
  { name: 'Food & Beverage', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800' },
  { name: 'Entertainment & Music', image: 'https://i.ibb.co/CpsyhgNR/Snap-Insta-to-527543941-18526545913016640-5239305829889010376-n.jpg' },
  { name: 'Real Estate', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800' },
  { name: 'Events & Experiences', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800' }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need a large following to join the Mediaboss roster?",
    answer: "We look at engagement and content quality over just numbers. Most of our creators have at least 50k followers, but we scout 'emerging legends' with smaller, highly active Lagos audiences too."
  },
  {
    question: "How do you get paid?",
    answer: "We take a percentage of the deals we secure for you. No deals = we don't get paid. This keeps us laser-focused on your success."
  },
  {
    question: "How long does it take to land my first deal?",
    answer: "Most creators on our roster land their first paid partnership within 60-90 days. We work fast because we already have brand relationships."
  },
  {
    question: "Do I need to be in Lagos?",
    answer: "No. While our studio is in Lagos, we work with creators across Nigeria and Africa. As long as your audience is here, you can work with us."
  },
  {
    question: "What makes you different from other agencies?",
    answer: "We're built for African creators. We understand local culture, we negotiate in dollars, and we provide free studio access. Most agencies just take a cut and disappear — we're hands-on."
  },
  {
    question: "Where are your Lagos offices located?",
    answer: "Our main production studio is located in the heart of Lagos, with satellite meeting points in Lekki and Ikeja to serve our creators across the city."
  }
];
