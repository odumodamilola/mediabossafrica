export type ServiceLandingPage = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  heroTitle: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  locationFocus: string[];
  outcomes: string[];
  capabilities: string[];
  supportingPoints: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};

export type TalentProfile = {
  slug: string;
  name: string;
  role: string;
  location: string;
  description: string;
  biography: string[];
  specialties: string[];
  knownFor: string[];
  socials?: Array<{
    platform: string;
    link: string;
  }>;
  portfolio: Array<{
    title: string;
    role: string;
    summary: string;
    image: string;
  }>;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  type: 'Movie' | 'VideoSeries';
  description: string;
  url: string;
  image: string;
  imageAlt: string;
  datePublished: string;
  people: string[];
};

export type ArticlePost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  image: string;
  keywords: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

export const SERVICE_LANDING_PAGES: ServiceLandingPage[] = [
  {
    slug: 'influencer-marketing-nigeria',
    shortTitle: 'Influencer Marketing',
    title: 'Influencer Marketing Nigeria | MediaBoss Africa',
    description:
      'Influencer marketing in Nigeria built for brands that need cultural relevance, measurable reach, and conversion-led execution across Lagos and Africa.',
    heroTitle: 'Influencer Marketing in Nigeria that moves culture and drives results.',
    intro:
      'MediaBoss Africa plans and executes influencer marketing campaigns for brands that want stronger visibility, better creator alignment, and measurable commercial outcomes in Lagos, Nigeria, and across Africa.',
    primaryKeyword: 'influencer marketing nigeria',
    secondaryKeywords: [
      'influencer marketing lagos',
      '360 marketing nigeria',
      'entertainment marketing nigeria',
      'brand partnerships nigeria',
    ],
    locationFocus: ['Lagos', 'Nigeria', 'West Africa', 'Africa'],
    outcomes: ['Creator-led campaign strategy', 'Influencer sourcing and contracting', 'Content production and rollout'],
    capabilities: ['Campaign planning', 'Creator matching', 'Paid amplification', 'Reporting and optimization'],
    supportingPoints: [
      'Built for campaigns that need authenticity, scale, and local cultural intelligence.',
      'Strong fit for entertainment, lifestyle, fashion, fintech, and event-led activations.',
      'Integrated with our talent management and film production capabilities for full-funnel execution.',
    ],
    ctaLabel: 'Plan a Campaign',
    ctaHref: '/consultation',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Influencer marketing campaign planning session in Lagos',
  },
  {
    slug: 'talent-management-nigeria',
    shortTitle: 'Talent Management',
    title: 'Talent Management Nigeria & Cameroon | MediaBoss Africa',
    description:
      'Talent management in Nigeria and Cameroon for actors, creators, presenters, and entertainment personalities seeking long-term growth, positioning, and commercial partnerships.',
    heroTitle: 'Talent management for Nollywood, creators, and entertainment talent in Nigeria and Cameroon.',
    intro:
      'MediaBoss Africa supports talent with strategic representation, personal brand development, endorsement opportunities, media positioning, and growth frameworks designed for the African entertainment economy.',
    primaryKeyword: 'talent management nigeria',
    secondaryKeywords: [
      'talent management cameroon',
      'nollywood talent agency',
      'creator management nigeria',
      'actor management lagos',
    ],
    locationFocus: ['Lagos', 'Nigeria', 'Cameroon', 'Africa'],
    outcomes: ['Brand endorsement support', 'Career positioning', 'Media and publicity strategy'],
    capabilities: ['Representation', 'Negotiation support', 'Content positioning', 'Partnership development'],
    supportingPoints: [
      'Built for actors, creators, public figures, and emerging talent operating across African entertainment markets.',
      'Aligned with campaign, production, and brand partnership opportunities instead of isolated management support.',
      'Useful for both established names and growth-stage talent entering bigger commercial cycles.',
    ],
    ctaLabel: 'Discuss Representation',
    ctaHref: '/contact',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Entertainment talent portrait for a management campaign',
  },
  {
    slug: 'film-production-nigeria',
    shortTitle: 'Film Production',
    title: 'Film Production Nigeria | Movie Production Lagos | MediaBoss Africa',
    description:
      'Film production in Nigeria for branded films, digital shows, trailers, and movie production in Lagos, powered by MediaBoss Africa and The MediaBoss Studio.',
    heroTitle: 'Film production in Nigeria for bold stories, branded content, and Nollywood-ready execution.',
    intro:
      'From concept development to shoot execution and post-production, MediaBoss Africa helps brands and entertainment properties build memorable film and video assets designed for audiences in Lagos, Nigeria, and the wider African market.',
    primaryKeyword: 'film production nigeria',
    secondaryKeywords: [
      'movie production lagos',
      'filmmaking in nigeria',
      'nollywood film production',
      'video production nigeria',
    ],
    locationFocus: ['Lagos', 'Nigeria', 'Africa'],
    outcomes: ['Concept to delivery production', 'Nollywood and entertainment storytelling', 'Platform-ready post-production'],
    capabilities: ['Pre-production', 'Production management', 'Editing and finishing', 'Launch support'],
    supportingPoints: [
      'Designed for brands, producers, creators, and entertainment properties that need polished visual storytelling.',
      'Backed by studio, campaign, and distribution thinking rather than production in isolation.',
      'Works across branded content, trailers, digital series, podcasts, and narrative film projects.',
    ],
    ctaLabel: 'Start a Production Brief',
    ctaHref: '/studio',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Film production crew preparing a movie scene in a studio',
  },
  {
    slug: 'event-marketing-nigeria',
    shortTitle: 'Event Marketing',
    title: 'Event Marketing Nigeria | Event Management Marketing Lagos | MediaBoss Africa',
    description:
      'Event marketing in Nigeria for launches, conferences, entertainment events, and culture-led brand experiences that need visibility before, during, and after the event.',
    heroTitle: 'Event marketing in Nigeria for launches, premieres, activations, and audience growth.',
    intro:
      'MediaBoss Africa helps brands and entertainment properties plan event storytelling, influencer amplification, production support, and post-event content systems that extend impact beyond the venue.',
    primaryKeyword: 'event management nigeria',
    secondaryKeywords: [
      'event marketing nigeria',
      'event promotion lagos',
      'launch campaign nigeria',
      'experience marketing africa',
    ],
    locationFocus: ['Lagos', 'Nigeria', 'Africa'],
    outcomes: ['Pre-event buzz', 'Live event coverage', 'Post-event content and reporting'],
    capabilities: ['Campaign design', 'Influencer amplification', 'Content capture', 'Audience engagement'],
    supportingPoints: [
      'Strong fit for conferences, entertainment launches, screenings, live experiences, and branded activations.',
      'Connects event storytelling with broader marketing and talent ecosystems.',
      'Keeps campaigns visible across social, press, creator channels, and owned media.',
    ],
    ctaLabel: 'Launch an Event Campaign',
    ctaHref: '/consultation',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Audience at a branded event marketing activation in Lagos',
  },
];

export const TALENT_PROFILES: TalentProfile[] = [
  {
    slug: 'tobi-makinde',
    name: 'Tobi Makinde',
    role: 'Actor, Producer, and Show Host',
    location: 'Nigeria',
    description:
      'Tobi Makinde is a leading force in African entertainment, known for his versatile acting, production expertise, and engaging screen presence.',
    biography: [
      'Tobi Makinde operates at the intersection of acting, producing, and audience-facing storytelling. His profile fits projects that need credibility, familiarity, and strong screen presence.',
      'He has built a significant presence across digital platforms, engaging audiences with premium content and authentic storytelling through The Tobi Makinde Show.',
    ],
    specialties: ['Nollywood entertainment', 'Show development', 'Audience-facing storytelling'],
    knownFor: ['The Tobi Makinde Show', 'Top-tier Nollywood productions'],
    socials: [
      { platform: 'Instagram', link: 'https://www.instagram.com/tobimakinde?igsh=MW14eTFidWk3MzkyMQ==' },
      { platform: 'TikTok', link: 'https://www.tiktok.com/@tobimakinde?_r=1&_t=ZS-948rEJZgHDN' },
      { platform: 'YouTube', link: 'https://youtube.com/@ttmshow?si=WJLpW6zCGkA07DzL' },
    ],
    portfolio: [
      {
        title: 'The Tobi Makinde Show',
        role: 'Host and Creative Lead',
        summary: 'A digital entertainment property built around conversation, charisma, and audience growth.',
        image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop',
      },
    ],
  },
  {
    slug: 'okawa-shazney',
    name: 'Okawa Shazney',
    role: 'Actor and Entertainment Talent',
    location: 'Nigeria',
    description:
      'Okawa Shazney is an award-winning actress who brings depth and elegance to every performance, captivating audiences across Africa and beyond.',
    biography: [
      'Okawa Shazney contributes to the entertainment landscape through work that suits storytelling, visibility, and high-impact campaign activity.',
      'Her profile is a strong fit for audience-led productions and international brand collaborations that need personality and screen connection.',
    ],
    specialties: ['Award-winning acting', 'Global brand collaborations', 'Screen storytelling'],
    knownFor: ['Nollywood Feature Films', 'International Television Series'],
    socials: [
      { platform: 'Instagram', link: 'https://www.instagram.com/okawashaznay?igsh=c2Y0ZzdydWFtaHZ2' },
      { platform: 'TikTok', link: 'https://www.tiktok.com/@okawashaznay?_r=1&_t=ZS-948r2xBWLxY' },
      { platform: 'YouTube', link: 'https://youtube.com/@okawashaznaytv?si=tznxYdSOM7N56lCe' },
    ],
    portfolio: [
      {
        title: 'Cinematic Performances',
        role: 'Lead Actor',
        summary: 'Powerhouse performances in leading Nollywood and international productions.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
      },
    ],
  },
  {
    slug: 'abayomi-alvin',
    name: 'Abayomi Alvin',
    role: 'Actor and Creative Talent',
    location: 'Nigeria',
    description:
      'Abayomi Alvin is a multi-talented actor and creative whose work bridges the gap between traditional cinema and modern digital content.',
    biography: [
      'Abayomi Alvin is relevant to work across screen talent, branded entertainment, and production-led storytelling.',
      'His portfolio direction supports conversations around talent management, project visibility, and campaign-ready creative partnerships.',
    ],
    specialties: ['Dynamic screen acting', 'Content creation', 'Brand positioning'],
    knownFor: ['Popular Nollywood Series', 'Viral Content Collaborations'],
    socials: [
      { platform: 'Instagram', link: 'https://www.instagram.com/abayomi_alvin?igsh=bWF0ZjJ4cGYxYWFk' },
      { platform: 'TikTok', link: 'https://www.tiktok.com/@abayomi_alvin?_r=1&_t=ZS-948rYaLpxmz' },
      { platform: 'YouTube', link: 'https://youtube.com/@abayomialvintv?si=8DUUBf8fXNSE8zxF' },
    ],
    portfolio: [
      {
        title: 'Versatile Screen Work',
        role: 'Actor',
        summary: 'Engaging performances across film, television, and digital platforms.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
      },
    ],
  },
  {
    slug: 'adjkorede',
    name: 'ADJKorede',
    role: 'Entertainment Talent',
    location: 'Nigeria',
    description:
      'ADJKorede is a rising digital personality, connecting with modern audiences through innovative storytelling and relatable engagement.',
    biography: [
      'ADJKorede brings a fresh perspective to entertainment-facing collaborations, with a focus on audience growth and cultural relevance.',
    ],
    specialties: ['Digital engagement', 'Audience growth', 'Modern storytelling'],
    knownFor: ['Creative digital content', 'Strong audience connection'],
    socials: [
      { platform: 'Instagram', link: 'https://www.instagram.com/adjkorede?igsh=MTNheGQybHRreHM4cQ==' },
      { platform: 'TikTok', link: 'https://www.tiktok.com/@adjkorede?_r=1&_t=ZS-948rgZ3DkC9' },
    ],
    portfolio: [
      {
        title: 'Digital Engagement Series',
        role: 'Content Personality',
        summary: 'Strategic content pieces built for high engagement and brand awareness.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800',
      },
    ],
  },
  {
    slug: 'wale-daniel',
    name: 'Wale Daniel',
    role: 'Creative Talent',
    location: 'Nigeria',
    description:
      'Wale Daniel is a visionary creative, delivering high-impact narratives that redefine the African digital landscape.',
    biography: [
      'Wale Daniel focuses on high-impact visual storytelling and creative direction, building brand authority through content.',
    ],
    specialties: ['Creative direction', 'Visual storytelling', 'Strategic content production'],
    knownFor: ['High-impact brand content', 'Visionary creative direction'],
    socials: [
      { platform: 'Instagram', link: 'https://www.instagram.com/waledaniel_?igsh=OTN6eHR6bnJ2a2lk' },
      { platform: 'TikTok', link: 'https://www.tiktok.com/@thewaledaniel?_r=1&_t=ZS-94PH5NxNP7J' },
    ],
    portfolio: [
      {
        title: 'Creative Direction Projects',
        role: 'Creative Director',
        summary: 'A portfolio of work showing the intersection of art and commercial success.',
        image: 'https://images.unsplash.com/photo-1542038784456-1ea0e93ca370?q=80&w=800',
      },
    ],
  },
  {
    slug: 'ayomide-yussuf',
    name: 'Ayomide Yussuf',
    role: 'Creative Talent',
    location: 'Nigeria',
    description:
      'Ayomide Yussuf is an emerging star in media and storytelling, committed to pushing the boundaries of creativity in Africa.',
    biography: [
      'Ayomide Yussuf building a legacy through consistent and creative contribution to the entertainment ecosystem.',
    ],
    specialties: ['Creative storytelling', 'Media production', 'Digital presence building'],
    knownFor: ['Fresh creative perspectives', 'Emerging talent in African media'],
    socials: [
      { platform: 'Instagram', link: 'https://www.instagram.com/waledaniel_?igsh=OTN6eHR6bnJ2a2lk' },
      { platform: 'TikTok', link: 'https://www.tiktok.com/@ayomideyusuf221?_r=1&_t=ZS-94PHCx6d2e1' },
      { platform: 'YouTube', link: 'https://youtube.com/@ayomide_yusuf221?si=JQcgT3LJWTL7Ku3i' },
    ],
    portfolio: [
      {
        title: 'New Media Narrative',
        role: 'Digital Talent',
        summary: 'Innovative storytelling techniques built for digital-first audiences.',
        image: 'https://images.unsplash.com/photo-1493655161922-ef98929de9d8?q=80&w=800',
      },
    ],
  },
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'none-has-to-know',
    title: 'None Has To Know',
    type: 'Movie',
    description:
      'A Nollywood film project positioned within MediaBoss Africa\'s production and entertainment marketing ecosystem, built for digital traction, audience engagement, and premium storytelling.',
    url: '/studio',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Film set lighting for a Nollywood movie production',
    datePublished: '2025-01-01',
    people: ['Tobi Makinde', 'Deyemi Okanlawon', 'Sofi Alakija', 'Abayomi Alvin', 'Okawa Shaznay'],
  },
  {
    slug: 'tobi-makinde-show',
    title: 'The Tobi Makinde Show',
    type: 'VideoSeries',
    description:
      'A digital entertainment property used to demonstrate show development, launch strategy, content packaging, and audience growth within Nigeria\'s entertainment landscape.',
    url: '/studio',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Talk show production set with studio lighting',
    datePublished: '2025-01-01',
    people: ['Tobi Makinde'],
  },
];

export const ARTICLE_POSTS: ArticlePost[] = [
  {
    slug: 'how-to-land-your-first-brand-deal-in-lagos',
    title: 'How to Land Your First Brand Deal in Lagos',
    description:
      'A practical guide for creators and emerging talent who want to attract brand deals in Lagos using better positioning, content packaging, and partnership readiness.',
    category: 'Influencer Marketing',
    readTime: '8 min read',
    author: 'MediaBoss Africa',
    publishedDate: '2026-03-12',
    modifiedDate: '2026-03-12',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop',
    keywords: ['brand deals lagos', 'influencer marketing nigeria', 'creator economy nigeria'],
    sections: [
      {
        heading: 'Start with a clear commercial identity',
        paragraphs: [
          'Most creators do not lose deals because they lack talent. They lose deals because brands cannot quickly understand who they are for, what audiences they influence, and what outcome they can deliver.',
          'Your content, bio, media kit, and pitch should all answer the same commercial question: why should a brand trust you with budget right now?',
        ],
      },
      {
        heading: 'Package proof, not only potential',
        paragraphs: [
          'A strong portfolio for Lagos brands should show audience quality, content consistency, and examples of how you can integrate products naturally into storytelling.',
          'Even if you have not landed a paid campaign yet, use unpaid samples, mock concepts, and performance examples from your best posts to show execution quality.',
        ],
      },
      {
        heading: 'Pitch like a partner',
        paragraphs: [
          'Good outreach is brief, specific, and aligned to business goals. Mention the audience you reach, the kind of campaigns you suit best, and the content formats you can deliver fast.',
          'When your pitch sounds like a business solution instead of a request for attention, conversion rates improve immediately.',
        ],
      },
    ],
  },
  {
    slug: 'the-rise-of-nigerian-fintech-influencers',
    title: 'The Rise of Nigerian Fintech Influencers',
    description:
      'Why fintech brands in Nigeria increasingly rely on creators and entertainment-led storytelling to drive trust, education, and user acquisition.',
    category: 'Entertainment Marketing',
    readTime: '7 min read',
    author: 'MediaBoss Africa',
    publishedDate: '2026-03-12',
    modifiedDate: '2026-03-12',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1600&auto=format&fit=crop',
    keywords: ['fintech influencer marketing nigeria', 'marketing in lagos', '360 marketing nigeria'],
    sections: [
      {
        heading: 'Trust is the real growth lever',
        paragraphs: [
          'Fintech adoption is rarely just a paid media challenge. It is a trust challenge. Nigerian audiences want to hear from voices that feel familiar, credible, and culturally fluent.',
          'That is why creators, hosts, actors, and niche educators now play a larger role in acquisition strategies for financial products.',
        ],
      },
      {
        heading: 'Education and entertainment work better together',
        paragraphs: [
          'The strongest fintech campaigns explain products through stories, scenarios, and personalities people already follow. Short-form content lowers the barrier to understanding while still feeling native to the platform.',
          'This is where integrated marketing teams outperform isolated media buying. Strategy, creators, and production need to work as one system.',
        ],
      },
      {
        heading: 'Measurement still matters',
        paragraphs: [
          'Creator campaigns should not be judged only by views. Strong reporting should connect reach to app visits, sign-ups, community growth, and audience sentiment.',
          'Brands that combine creator-led storytelling with disciplined reporting get better budget confidence and stronger repeatable wins.',
        ],
      },
    ],
  },
  {
    slug: 'navigating-nigerian-copyright-law-for-creators',
    title: 'Navigating Nigerian Copyright Law for Creators',
    description:
      'A practical overview of the commercial habits creators and talent should build before signing campaign agreements, licensing content, or releasing collaborative productions.',
    category: 'Talent Management',
    readTime: '9 min read',
    author: 'MediaBoss Africa',
    publishedDate: '2026-03-12',
    modifiedDate: '2026-03-12',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop',
    keywords: ['talent management nigeria', 'creator contracts nigeria', 'nollywood talent agency'],
    sections: [
      {
        heading: 'Ownership should be discussed before publishing',
        paragraphs: [
          'Creators often focus on delivery and forget to define ownership, usage windows, exclusivity, and derivative rights before content goes live.',
          'That is a preventable mistake. The earlier the commercial terms are documented, the easier it is to avoid disputes later.',
        ],
      },
      {
        heading: 'Campaign contracts need operational clarity',
        paragraphs: [
          'A useful agreement should define deliverables, revision limits, payment terms, licensing scope, takedown expectations, and approval workflows.',
          'Even simple collaborations benefit from written clarity because audience-facing content can continue generating value long after the campaign period ends.',
        ],
      },
      {
        heading: 'Management support protects long-term value',
        paragraphs: [
          'As creators scale, negotiation and rights management become part of brand building. Talent management is not only about introductions. It is about protecting leverage.',
          'The better your legal and commercial habits become, the easier it is to grow into larger entertainment and brand partnerships.',
        ],
      },
    ],
  },
];
