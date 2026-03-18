

import { NavItem, Service, Industry, FAQItem, Feature, PricingPlan, Resource, CaseStudy, PageType } from './types';

// ROUTING MANIFEST: Type-safe list of all valid pages (prevents dead-ends)
export const VALID_PAGES: readonly PageType[] = ['home', 'features', 'solutions', 'about-us', 'service', 'pricing', 'resources', 'contact', 'talent', 'talent/apply', 'work', 'privacy', 'terms', 'studio', 'talent-form'] as const;


export const SEO_CONFIG = {
  home: {
    title: "Mediaboss Africa | Influence. Innovation. Impact.",
    description: "Leading pan-African talent management and influencer marketing company. We build influence that converts through strategic storytelling and different data-driven campaigns.",
    keywords: "talent management africa, influencer marketing nigeria, creative media agency, brand partnerships, mediaboss studio",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  features: {
    title: "Professional Content Studio in Lekki, Lagos | Mediaboss Africa",
    description: "Access world-class production facilities in Lagos. Create premium content that attracts brand partnerships. Based in Lekki.",
    keywords: "content production studio Lagos, video production Nigeria, creator studio Lekki, Lagos production facilities",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  'about-us': {
    title: "Professional Content Studio in Lekki, Lagos | Mediaboss Africa",
    description: "Access world-class production facilities in Lagos. Create premium content that attracts brand partnerships. Based in Lekki.",
    keywords: "content production studio Lagos, video production Nigeria, creator studio Lekki, Lagos production facilities",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  solutions: {
    title: "Services We Render | Mediaboss Africa",
    description: "Explore MediaBoss Africa services across influencer marketing, talent management, film production, event marketing, brand partnerships, and campaign strategy.",
    keywords: "influencer marketing Nigeria, talent management Lagos, film production Nigeria, event marketing Africa",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  service: {
    title: "Services We Render | Mediaboss Africa",
    description: "Explore MediaBoss Africa services across influencer marketing, talent management, film production, event marketing, brand partnerships, and campaign strategy.",
    keywords: "influencer marketing Nigeria, talent management Lagos, film production Nigeria, event marketing Africa",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  pricing: {
    title: "Join Mediaboss | Partnership Plans for Nigerian Creators",
    description: "Ready to earn from your content? Join Africa's most elite creator roster. We only win when you win.",
    keywords: "join influencer agency Nigeria, talent management rates Lagos",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  resources: {
    title: "Creator Resources | Nigeria Influencer Marketing Insights 2026",
    description: "Learn how to land your first brand deal, protect your content, and build wealth as a Nigerian creator.",
    keywords: "Nigeria creator guide 2026, Lagos influencer tips, brand deals Nigeria",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  contact: {
    title: "Contact Mediaboss | Lagos Creator Agency",
    description: "Ready to turn your influence into income? Visit our Lagos studio or reach out online. Let's build something legendary.",
    keywords: "contact talent agency Lagos, Mediaboss Africa location",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  talent: {
    title: "MediaBoss Africa Talent Profiles | Actors, Hosts, and Creators",
    description: "Browse MediaBoss Africa talent profiles, specialties, and selected work across entertainment, branded content, and African media storytelling.",
    keywords: "MediaBoss Africa talent profiles, Nollywood talent Nigeria, creator profiles Africa, entertainment talent Lagos",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  'talent/apply': {
    title: "Talent Application | Mediaboss Africa – Join the Legend",
    description: "Ready to scale your career? Submit your profile for review by our talent scouts. Join the most elite creator roster in Africa.",
    keywords: "apply talent agency Nigeria, influencer application Lagos, creator partnership",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  work: {
    title: "Our Work | Nigerian Creator Success Stories",
    description: "See how we've helped African creators land million-naira campaigns and build global audiences.",
    keywords: "influencer marketing case studies Nigeria, creator portfolio Africa",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  privacy: {
    title: "Privacy Policy | Mediaboss Africa",
    description: "How we protect your data and intellectual property.",
    keywords: "privacy policy, data protection",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  terms: {
    title: "Terms of Service | Mediaboss Africa",
    description: "Our legal framework for partnership and service delivery.",
    keywords: "terms of service, legal agreement",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  studio: {
    title: "The Mediaboss Studio | Creative Production & Digital Storytelling",
    description: "A full-service content production and digital storytelling studio built to serve brands, creators, and campaigns. Video, podcast, photography, and more.",
    keywords: "content studio Lagos, video production Nigeria, podcast studio, branded content Africa, The Mediaboss Studio",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  },
  'talent-form': {
    title: "Client Consultation | Mediaboss Africa – Build Bold Campaigns",
    description: "Ready to scale your brand? Book a consultation with Africa's leading creative ecosystem. We build influence that converts through strategic storytelling.",
    keywords: "client consultation Nigeria, brand strategy Lagos, influencer marketing consultation Africa",
    ogImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png",
    twitterImage: "https://i.ibb.co/3mN9f8Lp/mediaboss-icon.png"
  }
};

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: 'home' },
  { label: 'About Us', href: 'about-us' },
  { label: 'Services', href: 'service' },
  { label: 'Talent', href: 'talent' },
  { label: 'The Studio', href: 'studio' },
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
    description: "Short-form & Long-form video production for brands, creators, and campaigns.",
    category: "Studio",
    metric: "4K Quality",
    image: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=800"
  },
  {
    title: "Social Media Content Creation",
    description: "Platform-optimized content across Instagram, TikTok, YouTube, X (Twitter), and emerging platforms.",
    category: "Social",
    metric: "Viral Ready",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800"
  },
  {
    title: "Podcast Production",
    description: "Full-service podcast production — audio and video recording, editing, and distribution.",
    category: "Audio",
    metric: "Pro Sound",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"
  },
  {
    title: "Photography & Creative Direction",
    description: "Photography, creative direction, and visual storytelling that sets brands and talents apart.",
    category: "Creative",
    metric: "Visionary",
    image: "https://images.unsplash.com/photo-1542038784456-1ea0e93ca370?q=80&w=800"
  },
  {
    title: "Branded Content & Commercial Shoots",
    description: "Branded content and commercial shoots that bring campaign visions to life.",
    category: "Business",
    metric: "High ROI",
    image: "https://images.unsplash.com/photo-1493655161922-ef98929de9d8?q=80&w=800"
  },
  {
    title: "Editing, Motion Graphics & Post-Production",
    description: "Editing, motion graphics, and post-production ensuring every story is polished and platform-ready.",
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

export const TRUSTED_BRANDS = [
  { name: 'MTN', logo: 'https://cdn.worldvectorlogo.com/logos/mtn-new-logo.svg' },
  { name: 'LXGlobal', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9149OvZ2iXZlHjBtngoJ-bfT0Xl0snuSWw&s' },
  { name: 'PushBio', logo: 'https://www.pushbio.io/wp-content/uploads/2022/02/pusshbnewx2.png' },
  { name: 'INTO REALTOR', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLN35oSLW0KGfKGnLy-u1RL11Fw12l1_U4w&s', className: 'sm:scale-[1.5] scale-[1.1]' },
  { name: 'POLYMATHS REALESTATE', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd3YbqpVlUi7J7Lrh7M3fYVd3gGx_qmQ_kQw&s' },
  { name: 'TOLISA', logo: 'https://placehold.co/200x80/transparent/9ca3af?text=TOLISA' },
  { name: 'UR3 Conference', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQF1CUMyDKYLdA/company-logo_200_200/company-logo_200_200/0/1729856381630?e=2147483647&v=beta&t=GBzN9v_3k0NJEFmxP8H2cr64OAnPGEN6nI5HIXefKqg' },
  { name: 'JustArt', logo: 'https://i.ibb.co/RG7YfGqS/image.png', showText: true, className: 'sm:scale-110 scale-95' },
  { name: 'Lagos Sales Party', logo: 'https://i.ibb.co/rK3zXjD8/image.png' },
  { name: 'RCCG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Rccg_logo.png/250px-Rccg_logo.png' }
];

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
    description: 'Comprehensive talent representation including personal brand strategy, deal negotiation & brand endorsements, career growth and monetization, and media training & positioning.',
    items: ['Personal Brand Strategy', 'Deal Negotiation & Brand Endorsements', 'Career Growth and Monetization', 'Media Training & Positioning']
  },
  {
    id: 'brand-partnerships',
    title: 'Brand Partnerships & Endorsements',
    description: 'Matching brands with the right talents for product launches, brand ambassadorships, event partnerships, and long-term collaborations.',
    items: ['Product Launches', 'Brand Ambassadorships', 'Event Partnerships', 'Long-term Collaborations']
  },
  {
    id: 'campaign-strategy',
    title: 'Campaign Strategy, Media Planning & Analytics',
    description: 'Insight-led campaign development with performance tracking, reporting, and optimization.',
    items: ['Insight-led Development', 'Performance Tracking', 'Reporting', 'Optimization']
  }
];

export const INDUSTRIES: Industry[] = [
  { name: 'Fashion & Lifestyle', image: 'https://i.ibb.co/B5BQSkPK/Snap-Insta-to-630154093-17878035255475240-2279539179607894162-n.jpg' },
  { name: 'Beauty & Skincare', image: 'https://images.unsplash.com/photo-1648203276014-20f97ba1f817?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Tech & Fintech', image: 'https://i.ibb.co/XfdsTPmw/Snap-Insta-to-580755341-18347780410167386-4230984891800564498-n.jpg' },
  { name: 'Food & Beverage', image: 'https://i.ibb.co/RG6dF2WM/Save-Clip-App-590368401-18090350297483133-4434513809090978621-n.jpg' },
  { name: 'Entertainment & Music', image: 'https://i.ibb.co/CpsyhgNR/Snap-Insta-to-527543941-18526545913016640-5239305829889010376-n.jpg' },
  { name: 'Real Estate', image: 'https://i.ibb.co/9H4nmHw2/Save-Clip-App-641848384-18384113392157104-883924134643976237-n.jpg' },
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
