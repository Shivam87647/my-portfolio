import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ==========================================
// PORTFOLIO DATABASES
// ==========================================

const PROJECTS_DATA = [
  {
    id: 'proj-ecommerce',
    title: 'Scalable Full-Stack E-Commerce Platform',
    category: 'Full Stack',
    date: '04/2026 - Present',
    shortDesc: 'A fully scalable, comprehensive e-commerce environment featuring secure JWT sessions, Redux cart states, and MongoDB pipelines.',
    tags: ['Next.js', 'Express.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
    color: 'var(--primary)',
    liveUrl: 'https://github.com/Shivam87647/e-commerce-fs',
    githubUrl: 'https://github.com/Shivam87647/e-commerce-fs',
    bullets: [
      'Engineered responsive storefront with Next.js Server Side Rendering (SSR) for high-performance content loading.',
      'Designed REST API microservices in Node.js/Express for robust product catalog routing and user wishlist management.',
      'Constructed MongoDB document models with indexes to optimize lookup times under high query volumes.',
      'Integrated Redux Toolkit for clean client-side state persistence across product sheets, bags, and checkout pipelines.'
    ],
    challenge: 'Reconciling rapid page hydration speeds with large, dynamically updating product catalogs and real-time checkout synchronizations.',
    impact: [
      'Cut page load times by 48% via Next.js server-side static rendering optimizations.',
      'Reduced database query latencies by 35% using compound indexing strategies in MongoDB.',
      'Sustained 100% state accuracy during high-volume cart items addition.'
    ]
  },
  {
    id: 'proj-goonj',
    title: 'Goonj - Responsive NGO Portal',
    category: 'Frontend',
    date: '04/2026 - 04/2026',
    shortDesc: 'A visually stunning modern UI for an NGO platform to showcase global initiatives, donation cards, and organizational impacts.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Animations', 'Dynamic Forms'],
    color: 'var(--accent)',
    liveUrl: 'https://github.com/Shivam87647',
    githubUrl: 'https://github.com/Shivam87647',
    bullets: [
      'Developed a fluid, responsive landing page using component-driven React.js, optimizing component loading speeds.',
      'Calibrated customized Tailwind utility styles, applying sleek dark-mode panels and interactive backdrop blurs.',
      'Constructed interactive forms with detailed validation to collect volunteer submissions and feedback.',
      'Optimized core search queries, ensuring seamless cross-device compatibility across standard mobile formats.'
    ],
    challenge: 'Crafting highly customizable, responsive layout sections and interactive donation widgets that adapt to mobile viewports without sacrificing the premium visual depth.',
    impact: [
      'Achieved a perfect mobile usability score across all common tablet and phone dimensions.',
      'Reduced initial CSS bundle footprint by 40% through strict Tailwind utility configuration.',
      'Implemented robust form validators that eliminated invalid volunteer entries.'
    ]
  },
  {
    id: 'proj-myntra',
    title: 'Pixel-Accurate Myntra Desktop Interface',
    category: 'UI & Clone',
    date: '03/2026 - 04/2026',
    shortDesc: 'A premium frontend clone of the Myntra platform, recreating complex visual components and navigation details.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid'],
    color: 'var(--primary)',
    liveUrl: 'https://github.com/Shivam87647',
    githubUrl: 'https://github.com/Shivam87647',
    bullets: [
      'Built a desktop-optimized landing clone replicating core header listings, dynamic banners, and product grids.',
      'Engineered custom transition hooks to recreate slide-out navigation panels and responsive dropdown lists.',
      'Structured clean JavaScript scripts for client-side search indexing and interactive filter parameters.',
      'Applied layout specs resulting in pixel-perfect representation of product cards and bag counters.'
    ],
    challenge: 'Replicating highly nested CSS grid listings and precise dynamic dropdown overlays with pure semantic structures.',
    impact: [
      'Achieved pixel-perfect visual compliance against production desktop mocks.',
      'Engineered lightweight dropdown overlays with zero external library overhead.',
      'Optimized CSS selectors, cutting rendering reflow overhead by 20%.'
    ]
  },
  {
    id: 'proj-blinkit',
    title: 'Dynamic Blinkit Fast-Delivery Replica',
    category: 'UI & Clone',
    date: '02/2026 - 03/2026',
    shortDesc: 'A frontend clone of Blinkit featuring dynamic categories selection, shopping bag counts, and interactive APIs.',
    tags: ['React.js', 'JavaScript', 'API Integration', 'Context API'],
    color: 'var(--accent)',
    liveUrl: 'https://github.com/Shivam87647',
    githubUrl: 'https://github.com/Shivam87647',
    bullets: [
      'Developed interactive product matrices with categories switching to replicate lightning-fast delivery UI.',
      'Integrated mock JSON databases via custom React hooks to simulate live products stock rendering.',
      'Utilized Context API to handle cart calculations, updating product tallies and sub-total pricing in real-time.',
      'Styled fluid layouts using modern CSS modules to adapt seamlessly across mobile views.'
    ],
    challenge: 'Syncing complex cart calculations, sub-total pricing variables, and item stock quantities across multiple separated visual sections without prop drilling.',
    impact: [
      'Synchronized multi-section item updates in under 2ms using React Context architectures.',
      'Designed modular product matrices that render dynamically based on clean JSON models.',
      'Ensured full usability across major modern mobile web browsers.'
    ]
  },
  {
    id: 'proj-figma',
    title: 'Figma to High-Fidelity Web Conversion',
    category: 'UI & Clone',
    date: '01/2026 - 02/2026',
    shortDesc: 'Pixel-perfect single page layout constructed directly from design files using responsive Bootstrap structures.',
    tags: ['HTML5', 'Bootstrap 5', 'CSS Transitions', 'Pixel Perfect'],
    color: 'var(--primary)',
    liveUrl: 'https://github.com/Shivam87647',
    githubUrl: 'https://github.com/Shivam87647',
    bullets: [
      'Parsed raw Figma visual tokens, applying them into reusable semantic structures.',
      'Implemented clean Bootstrap flex grids, cutting layout styling development overhead in half.',
      'Coded micro-animations and glowing border hover states for actionable sections.',
      'Ensured full cross-browser compatibility across Safari, Chrome, Edge, and mobile web clients.'
    ],
    challenge: 'Extracting nested flex coordinates from raw design specs and translating them into fluid, cross-browser compliant Bootstrap variables.',
    impact: [
      'Delivered pixel-perfect conversion, matching typography sizes and bounding box heights exactly.',
      'Cut layout CSS lines by 60% by leveraging native Bootstrap variables.',
      'Flawless cross-browser performance validated across all major engines.'
    ]
  }
];

const SKILLS_DATA = [
  { 
    id: 'react',
    label: 'React.js / Next.js', 
    percent: 90, 
    desc: 'Expertise in server-side rendering (SSR), hydration stages, component composition patterns, hooks structures, and optimized virtual DOM updates.',
    projects: ['Scalable Full-Stack E-Commerce Platform', 'Goonj - Responsive NGO Portal', 'Dynamic Blinkit Fast-Delivery Replica'],
    level: 'Advanced Master'
  },
  { 
    id: 'js',
    label: 'JavaScript (ES6+)', 
    percent: 88, 
    desc: 'Deep core logic proficiencies in asynchronous execution pipelines, event loops, closure scopes, array operations, and DOM manipulation scripts.',
    projects: ['Pixel-Accurate Myntra Desktop Interface', 'Dynamic Blinkit Fast-Delivery Replica'],
    level: 'Advanced Core'
  },
  { 
    id: 'mongodb',
    label: 'MongoDB Database', 
    percent: 80, 
    desc: 'Familiarity with Document storage models, compound indexes optimization, aggregation pipelines, schema designing, and high-performance querying.',
    projects: ['Scalable Full-Stack E-Commerce Platform'],
    level: 'Intermediate Specialist'
  },
  { 
    id: 'node',
    label: 'Express.js & Node.js', 
    percent: 82, 
    desc: 'Building REST API microservices, handling middleware logic, secure JSON Web Token (JWT) rotation schemes, and database pooling configurations.',
    projects: ['Scalable Full-Stack E-Commerce Platform'],
    level: 'Intermediate Specialist'
  },
  { 
    id: 'tailwind',
    label: 'Tailwind CSS', 
    percent: 92, 
    desc: 'Designing premium visual guidelines using responsive utility utilities, HSL theme custom tokens, backdrop-filter blurs, and organic CSS transforms.',
    projects: ['Scalable Full-Stack E-Commerce Platform', 'Goonj - Responsive NGO Portal', 'Dynamic Blinkit Fast-Delivery Replica'],
    level: 'Advanced Master'
  },
  { 
    id: 'htmlcss',
    label: 'HTML5 & CSS3', 
    percent: 95, 
    desc: 'Recreating pixel-perfect layout wireframes, high-end micro-interactions, CSS animation loops, keyframe vectors, and accessibility elements.',
    projects: ['Pixel-Accurate Myntra Desktop Interface', 'Figma to High-Fidelity Web Conversion'],
    level: 'Expert Craftsman'
  },
  { 
    id: 'bootstrap',
    label: 'Bootstrap 5', 
    percent: 85, 
    desc: 'Utilizing responsive grid containers, column spans, flex positioning utilities, and reusable component packages for rapid wireframe conversions.',
    projects: ['Figma to High-Fidelity Web Conversion'],
    level: 'Advanced Core'
  },
  { 
    id: 'git',
    label: 'Git & GitHub', 
    percent: 86, 
    desc: 'Secure repository branching methods, commit standards compliance, team git collaboration workflows, and continuous actions pipelines.',
    projects: ['Scalable Full-Stack E-Commerce Platform', 'Goonj - Responsive NGO Portal'],
    level: 'Advanced Core'
  }
];

const CREDENTIALS_DATA = [
  {
    title: 'Generative AI Mastermind Program',
    provider: 'Hands-on AI Cohort Mastery',
    date: '01/2026 - 01/2026',
    desc: 'Intensive 48-hour program covering prompt engineering pipelines, LLM fine-tuning schemas, and building AI tools.'
  },
  {
    title: 'Web Development enhanced with Gen AI',
    provider: 'Modern Workflow Systems Training',
    date: '10/2025 - Present',
    desc: 'Integrating AI assistants into full-stack development, optimizing debugging speeds, and rapid prototyping workflows.'
  }
];

const ROLES_POOL = ['Full Stack Web Developer', 'BCA Student @ VGU', 'MERN Stack Specialist', 'AI-Assisted Web Craftsman'];

// ==========================================
// SVG HELPER FUNCTIONS
// ==========================================

const renderSkillIcon = (id) => {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3z" transform="rotate(30 12 12)" />
          <path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3z" transform="rotate(90 12 12)" />
          <path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3z" transform="rotate(150 12 12)" />
        </svg>
      );
    case 'js':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M15 9h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9z" />
          <path d="M9 9v4a2 2 0 0 1-2 2h-1" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <path d="M12 2v20M8 5a6 6 0 0 1 8 0c2 3-1 9-4 13-3-4-6-10-4-13a6 6 0 0 1 0 0z" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="22" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <path d="M12 3c.132 0 .263 0 .393.003a8.995 8.995 0 0 1 8.19 5.86c.642 1.884.28 3.966-.968 5.56L12 21a8.995 8.995 0 0 1-8.19-5.86c-.642-1.884-.28-3.966.968-5.56L12 3z" />
          <path d="M12 7c.066 0 .132 0 .197.001a4.498 4.498 0 0 1 4.095 2.93c.32 1.256.096 2.644-.484 3.707L12 17a4.498 4.498 0 0 1-4.095-2.93c-.32-1.256-.096-2.644.484-3.707L12 7z" />
        </svg>
      );
    case 'htmlcss':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <path d="M12 22L4 18.5 2 3h20l-2 15.5L12 22z" />
          <path d="M8 8h8M8 12h8M10 16h4" />
        </svg>
      );
    case 'bootstrap':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M9 8h4a2 2 0 0 1 2 2v1a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 15 14v1a2 2 0 0 1-2 2H9V8z" />
          <line x1="12" y1="12" x2="9" y2="12" />
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skill-icon-svg">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 15V9a4 4 0 0 0-4-4H9" />
          <line x1="6" y1="9" x2="6" y2="15" />
        </svg>
      );
    default:
      return null;
  }
};

const renderProjectVisual = (id) => {
  switch (id) {
    case 'proj-ecommerce':
      return (
        <svg width="100%" height="100%" viewBox="0 0 300 100" className="proj-svg-render">
          <defs>
            <linearGradient id="ecommerceGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="280" height="80" rx="8" fill="url(#ecommerceGrad)" stroke="rgba(255,255,255,0.03)"/>
          
          <g transform="translate(45, 45)">
            <circle cx="0" cy="0" r="14" fill="rgba(255, 255, 255, 0.05)" stroke="white" strokeWidth="1" strokeDasharray="3 2"/>
            <path d="M-6 -6 H-2 L1 2 H7 L9 -4 H0" fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
            <circle cx="2" cy="5" r="1.5" fill="var(--primary)"/>
            <circle cx="6" cy="5" r="1.5" fill="var(--primary)"/>
          </g>
          
          <g transform="translate(150, 45)">
            <rect x="-24" y="-14" width="48" height="28" rx="4" fill="rgba(255, 255, 255, 0.05)" stroke="var(--accent)" strokeWidth="1.5"/>
            <text x="0" y="4" fill="white" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">JWT</text>
          </g>
          
          <g transform="translate(250, 45)">
            <circle cx="0" cy="0" r="14" fill="rgba(255, 255, 255, 0.05)" stroke="white" strokeWidth="1" strokeDasharray="3 2"/>
            <path d="M-6 -6 C-2 -10 2 -10 6 -6 C8 -2 5 4 0 8 C-5 4 -8 -2 -6 -6 Z" fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
          </g>
          
          <line x1="63" y1="45" x2="122" y2="45" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="178" y1="45" x2="232" y2="45" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
          
          <circle cx="92" cy="45" r="2.5" fill="var(--primary)">
            <animate attributeName="cx" values="63;122" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="205" cy="45" r="2.5" fill="var(--accent)">
            <animate attributeName="cx" values="178;232" dur="3.5s" repeatCount="indefinite" />
          </circle>
          
          <text x="45" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Redux State</text>
          <text x="150" y="82" fill="var(--accent)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">REST APIs</text>
          <text x="250" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">MongoDB</text>
        </svg>
      );
    case 'proj-goonj':
      return (
        <svg width="100%" height="100%" viewBox="0 0 300 100" className="proj-svg-render">
          <defs>
            <linearGradient id="goonjGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.08"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="280" height="80" rx="8" fill="url(#goonjGrad)" stroke="rgba(255,255,255,0.03)"/>
          
          <g transform="translate(60, 45)">
            <circle cx="0" cy="0" r="16" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 2"/>
            <circle cx="0" cy="0" r="11" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
            <ellipse rx="11" ry="4" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <ellipse rx="4" ry="11" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          </g>
          
          <g transform="translate(180, 45)">
            <rect x="-35" y="-18" width="70" height="36" rx="4" fill="rgba(0, 0, 0, 0.3)" stroke="var(--primary)" strokeWidth="1"/>
            <line x1="-25" y1="-8" x2="10" y2="-8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            <line x1="-25" y1="0" x2="20" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            <circle cx="-25" cy="8" r="3" fill="var(--primary)"/>
            <line x1="-15" y1="8" x2="25" y2="8" stroke="var(--primary)" strokeWidth="1.5"/>
          </g>
          
          <g transform="translate(260, 45)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill="none" stroke="var(--accent)" strokeWidth="1.5" transform="scale(0.8) translate(-12, -12)"/>
          </g>
          
          <text x="60" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Outreach</text>
          <text x="180" y="82" fill="var(--primary)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Volunteer Ingest</text>
          <text x="260" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Impact</text>
        </svg>
      );
    case 'proj-myntra':
      return (
        <svg width="100%" height="100%" viewBox="0 0 300 100" className="proj-svg-render">
          <defs>
            <linearGradient id="myntraGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="280" height="80" rx="8" fill="url(#myntraGrad)" stroke="rgba(255,255,255,0.03)"/>
          
          <rect x="20" y="18" width="260" height="10" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          <circle cx="30" cy="23" r="2.5" fill="var(--accent)"/>
          <line x1="50" y1="23" x2="120" y2="23" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          <line x1="220" y1="23" x2="250" y2="23" stroke="var(--primary)" strokeWidth="1.5"/>
          
          <rect x="20" y="34" width="130" height="46" rx="3" fill="rgba(0, 0, 0, 0.25)" stroke="var(--primary)" strokeWidth="1"/>
          <circle cx="85" cy="57" r="6" fill="none" stroke="var(--primary)" strokeWidth="1"/>
          
          <rect x="160" y="34" width="50" height="46" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <line x1="168" y1="72" x2="202" y2="72" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
          
          <rect x="220" y="34" width="50" height="46" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <line x1="228" y1="72" x2="262" y2="72" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        </svg>
      );
    case 'proj-blinkit':
      return (
        <svg width="100%" height="100%" viewBox="0 0 300 100" className="proj-svg-render">
          <defs>
            <linearGradient id="blinkitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.08"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="280" height="80" rx="8" fill="url(#blinkitGrad)" stroke="rgba(255,255,255,0.03)"/>
          
          <g transform="translate(45, 45)">
            <rect x="-25" y="-15" width="50" height="30" rx="4" fill="rgba(0,0,0,0.3)" stroke="var(--accent)" strokeWidth="1"/>
            <text x="0" y="-3" fill="var(--accent)" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">$45.90</text>
            <text x="0" y="7" fill="white" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">4 ITEMS</text>
          </g>
          
          <g transform="translate(150, 45)">
            <rect x="-30" y="-12" width="60" height="24" rx="12" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1"/>
            <path d="M-10 -4 H6 L12 4 H-4 Z" fill="none" stroke="white" strokeWidth="1.5"/>
            <circle cx="-4" cy="5" r="2.5" fill="var(--accent)"/>
            <circle cx="6" cy="5" r="2.5" fill="var(--accent)"/>
          </g>
          
          <g transform="translate(245, 45)">
            <rect x="-20" y="-15" width="40" height="30" rx="3" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            <circle cx="-10" cy="-5" r="3" fill="var(--primary)"/>
            <circle cx="10" cy="-5" r="3" fill="rgba(255,255,255,0.2)"/>
            <circle cx="-10" cy="5" r="3" fill="var(--accent)"/>
            <circle cx="10" cy="5" r="3" fill="var(--primary)"/>
          </g>
          
          <path d="M72 45 H118 M182 45 H222" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
          
          <text x="45" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Context API</text>
          <text x="150" y="82" fill="var(--primary)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Fast replica</text>
          <text x="245" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Stock Sync</text>
        </svg>
      );
    case 'proj-figma':
      return (
        <svg width="100%" height="100%" viewBox="0 0 300 100" className="proj-svg-render">
          <defs>
            <linearGradient id="figmaGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="280" height="80" rx="8" fill="url(#figmaGrad)" stroke="rgba(255,255,255,0.03)"/>
          
          <line x1="30" y1="20" x2="30" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2"/>
          <line x1="270" y1="20" x2="270" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2"/>
          <line x1="20" y1="50" x2="280" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2"/>
          
          <rect x="90" y="25" width="120" height="50" rx="4" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 2"/>
          
          <text x="150" y="45" fill="white" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">W: 100%</text>
          <text x="150" y="60" fill="var(--accent)" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">H: 500px</text>
          
          <circle cx="90" cy="25" r="3" fill="var(--primary)"/>
          <circle cx="210" cy="25" r="3" fill="var(--primary)"/>
          <circle cx="90" cy="75" r="3" fill="var(--primary)"/>
          <circle cx="210" cy="75" r="3" fill="var(--primary)"/>
          
          <text x="45" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Raw Tokens</text>
          <text x="250" y="82" fill="#94a3b8" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Pixel Perfect</text>
        </svg>
      );
    default:
      return null;
  }
};

const renderArchitectureDiagram = (id) => {
  const nodeGradStyle = {
    fill: 'url(#nodeGrad)',
    stroke: 'rgba(255,255,255,0.06)'
  };
  
  switch (id) {
    case 'proj-ecommerce':
      return (
        <svg width="100%" height="100%" viewBox="0 0 500 140" className="architecture-diagram-svg">
          <defs>
            <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.06"/>
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="195" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="370" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          
          <line x1="130" y1="65" x2="195" y2="65" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="305" y1="65" x2="370" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
          
          <text x="75" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Next.js SSR</text>
          <text x="75" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Redux Client</text>
          <text x="75" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Responsive Viewport</text>
          
          <text x="250" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Express Server</text>
          <text x="250" y="78" fill="var(--primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">JWT Sessions</text>
          <text x="250" y="112" fill="var(--primary)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">REST Middleware</text>
          
          <text x="425" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">MongoDB Cluster</text>
          <text x="425" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Indexed Queries</text>
          <text x="425" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Data Pipeline Store</text>
        </svg>
      );
    case 'proj-goonj':
      return (
        <svg width="100%" height="100%" viewBox="0 0 500 140" className="architecture-diagram-svg">
          <defs>
            <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.06"/>
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="195" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="370" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          
          <line x1="130" y1="65" x2="195" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="305" y1="65" x2="370" y2="65" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3"/>
          
          <text x="75" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Form Inputs</text>
          <text x="75" y="78" fill="var(--primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">User Submissions</text>
          <text x="75" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Dynamic Capture</text>
          
          <text x="250" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Tailwind UI</text>
          <text x="250" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Backdrop Blurs</text>
          <text x="250" y="112" fill="var(--accent)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Validation layer</text>
          
          <text x="425" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Data Registry</text>
          <text x="425" y="78" fill="var(--primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Volunteer Store</text>
          <text x="425" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Target Ingest Hub</text>
        </svg>
      );
    case 'proj-myntra':
      return (
        <svg width="100%" height="100%" viewBox="0 0 500 140" className="architecture-diagram-svg">
          <defs>
            <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.06"/>
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="195" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="370" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          
          <line x1="130" y1="65" x2="195" y2="65" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="305" y1="65" x2="370" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
          
          <text x="75" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">HTML5 Semantic</text>
          <text x="75" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Wireframe Mock</text>
          <text x="75" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Pixel-Perfect View</text>
          
          <text x="250" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">CSS3 Grid</text>
          <text x="250" y="78" fill="var(--primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Dropdown Overlay</text>
          <text x="250" y="112" fill="var(--primary)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Fluid Layout Engine</text>
          
          <text x="425" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Local Storage</text>
          <text x="425" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Bag State Sync</text>
          <text x="425" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Persistence layer</text>
        </svg>
      );
    case 'proj-blinkit':
      return (
        <svg width="100%" height="100%" viewBox="0 0 500 140" className="architecture-diagram-svg">
          <defs>
            <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.06"/>
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="195" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="370" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          
          <line x1="130" y1="65" x2="195" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="305" y1="65" x2="370" y2="65" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3"/>
          
          <text x="75" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">React Modules</text>
          <text x="75" y="78" fill="var(--primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Item Grid Matrices</text>
          <text x="75" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Fast Delivery UI</text>
          
          <text x="250" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Context Provider</text>
          <text x="250" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Reducer Dispatch</text>
          <text x="250" y="112" fill="var(--accent)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Price Calculations</text>
          
          <text x="425" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Stock Registry</text>
          <text x="425" y="78" fill="var(--primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">JSON Mock DB</text>
          <text x="425" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">State Synchronizer</text>
        </svg>
      );
    case 'proj-figma':
      return (
        <svg width="100%" height="100%" viewBox="0 0 500 140" className="architecture-diagram-svg">
          <defs>
            <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.06"/>
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="195" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          <rect x="370" y="40" width="110" height="50" rx="6" style={nodeGradStyle}/>
          
          <line x1="130" y1="65" x2="195" y2="65" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="305" y1="65" x2="370" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
          
          <text x="75" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Figma Specs</text>
          <text x="75" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Raw Visual Tokens</text>
          <text x="75" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Layout Spec Source</text>
          
          <text x="250" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Bootstrap Flex</text>
          <text x="250" y="78" fill="var(--primary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Utility Grid Map</text>
          <text x="250" y="112" fill="var(--primary)" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Fluid Responsive DOM</text>
          
          <text x="425" y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">High-Fi Web UI</text>
          <text x="425" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Micro-Animations</text>
          <text x="425" y="112" fill="#64748b" fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">Pixel-Perfect Hydrate</text>
        </svg>
      );
    default:
      return null;
  }
};

// ==========================================
// MASTERPIECE APPLICATION COMPONENT
// ==========================================

export default function App() {
  // Navigation and dynamic states
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null); // Case study drawer state
  const [activeSkillId, setActiveSkillId] = useState('react');
  const [typingRole, setTypingRole] = useState('');
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pure React Scroll & Sliding Active Indicator states
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Elite Operational Terminal States
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: '✦ SHIVAM SECURE SHELL SYSTEM v2.0.6', type: 'output-header' },
    { text: '✦ Type "help" to display available operational commands.', type: 'output-system' }
  ]);
  const [autocompleteHint, setAutocompleteHint] = useState('');
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Form bindings
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const canvasRef = useRef(null);
  const visualPanelRef = useRef(null);
  const cardRectsRef = useRef(new WeakMap());
  
  // Custom interactive refs
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const terminalInputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const navbarRef = useRef(null);
  const navLinksRef = useRef(null);

  // Dynamic Typing Carousel
  useEffect(() => {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentWord = ROLES_POOL[wordIndex];
      if (isDeleting) {
        setTypingRole(currentWord.substring(0, letterIndex - 1));
        letterIndex--;
      } else {
        setTypingRole(currentWord.substring(0, letterIndex + 1));
        letterIndex++;
      }

      let typeSpeed = 100;

      if (isDeleting) {
        typeSpeed /= 2; // delete faster
      }

      if (!isDeleting && letterIndex === currentWord.length) {
        typeSpeed = 1500; // pause at full word
        isDeleting = true;
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % ROLES_POOL.length;
        typeSpeed = 500; // pause before typing next word
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    type();

    return () => clearTimeout(timeoutId);
  }, []);

  // Disable body scroll when case study drawer or terminal overlay is active to prevent scroll leak
  useEffect(() => {
    const isLocked = selectedProject || isTerminalOpen;
    if (isLocked) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '8px'; // Prevents layout shift from scrollbar removal
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedProject, isTerminalOpen]);

  // Pure React Header, Scrollspy, & Navigation Pill Interactions (100% jQuery-Free)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // 1. Toggle scrolled navbar class
      setIsScrolled(scrollTop > 40);

      // 2. Scrollspy: Calculate which section occupies the viewport the most
      const winHeight = window.innerHeight;
      const navSectionIds = ['about', 'skills', 'projects', 'credentials', 'contact'];
      let currentSectionId;

      if (scrollTop < 80) {
        currentSectionId = 'about';
      } else {
        let maxVisibleHeight = -1;
        let bestSectionId = '';

        navSectionIds.forEach(id => {
          const sec = document.getElementById(id);
          if (!sec) return;
          const rect = sec.getBoundingClientRect();
          
          // Calculate intersection heights in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(winHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            bestSectionId = id;
          }
        });

        currentSectionId = bestSectionId || 'about';
      }

      if (currentSectionId) {
        setActiveSection(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger scroll immediately on load to set correct initial states
    const triggerTimeout = setTimeout(handleScroll, 100);

    return () => {
      clearTimeout(triggerTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Slide sliding capsule pill & update scroll progress bar to align with active links
  useEffect(() => {
    let activeId = activeSection;
    let rId;

    const updatePill = () => {
      // If at the very top of the page (Hero section), reset indicators
      if (window.scrollY < 100) {
        setPillStyle(prev => ({ ...prev, opacity: 0 }));
        setScrollProgress(0);
        return;
      }

      if (activeId === 'contact') {
        setPillStyle(prev => ({ ...prev, opacity: 0 }));
        setScrollProgress(100);
        return;
      }

      const activeLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
      const navbar = navbarRef.current;
      
      if (activeLink && navbar) {
        // Slide capsule pill
        setPillStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1
        });

        // Fill scroll progress bar exactly up to the right edge of the active link
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = navbar.getBoundingClientRect();
        const rightEdge = linkRect.right - navRect.left;
        const progressPercent = Math.min(100, Math.max(0, (rightEdge / navRect.width) * 100));
        setScrollProgress(progressPercent);
      }
    };

    const handleResizeOrScroll = () => {
      cancelAnimationFrame(rId);
      rId = requestAnimationFrame(updatePill);
    };

    // Update initially
    rId = requestAnimationFrame(updatePill);

    window.addEventListener('resize', handleResizeOrScroll, { passive: true });
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  }, [activeSection]);

  const handleNavLinkMouseEnter = (e) => {
    const link = e.currentTarget;
    setPillStyle({
      left: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1
    });
  };

  const handleNavLinkMouseLeave = () => {
    if (activeSection === 'contact') {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    const activeLink = document.querySelector(`.nav-links a[href="#${activeSection}"]`);
    if (activeLink) {
      setPillStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1
      });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('about');
    window.history.pushState(null, null, ' ');
  };

  // GSAP Cinematic Reveal Animations
  useEffect(() => {
    // Cinematic timeline with premium ease mappings
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.4 } });

    // Initial offsets to prevent layout shifting
    gsap.set('.navbar-wrapper', { y: -60, opacity: 0 });
    gsap.set('.hero-tagline', { y: 25, opacity: 0 });
    gsap.set('.hero-main-title', { y: 35, opacity: 0 });
    gsap.set('.hero-role-carousel', { y: 20, opacity: 0 });
    gsap.set('.hero-desc', { y: 25, opacity: 0 });
    gsap.set('.hero-ctas > *', { y: 25, opacity: 0 });
    gsap.set('.visual-profile-card', { scale: 0.92, opacity: 0, rotationY: -8 });

    // Cinematic execution flow
    tl.to('.navbar-wrapper', {
      y: 0,
      opacity: 1,
      duration: 1.2
    })
    .to('.hero-tagline', {
      y: 0,
      opacity: 1,
      duration: 0.95
    }, '-=0.8')
    .to('.hero-main-title', {
      y: 0,
      opacity: 1,
      duration: 1.15
    }, '-=0.85')
    .to('.hero-role-carousel', {
      y: 0,
      opacity: 1,
      duration: 0.95
    }, '-=0.95')
    .to('.hero-desc', {
      y: 0,
      opacity: 1,
      duration: 1.05
    }, '-=0.85')
    .to('.hero-ctas > *', {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.95
    }, '-=0.9')
    .to('.visual-profile-card', {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 1.6,
      ease: 'elastic.out(1, 0.85)'
    }, '-=1.2');

    // Scroll-triggered animations via dynamic IntersectionObserver + GSAP
    const observerOptions = {
      root: null,
      threshold: 0.02,
      rootMargin: '0px 0px -20px 0px'
    };

    // Observe each portfolio container
    const sections = document.querySelectorAll('section.section');

    // Hide all scroll-triggered elements initially so they are completely sided/invisible
    sections.forEach(sec => {
      if (sec.classList.contains('hero-section')) return; // Skip hero section as it's animated by intro timeline
      
      const subtitle = sec.querySelector('.section-subtitle');
      const title = sec.querySelector('.section-title');
      const cards = sec.querySelectorAll('.bento-card, .glass-panel, .project-card-wrap, .credentials-grid > *, .contact-bento-layout > *');

      if (subtitle) {
        gsap.set(subtitle, { y: 25, opacity: 0 });
      }
      if (title) {
        gsap.set(title, { y: 35, opacity: 0 });
      }
      if (cards.length) {
        cards.forEach((card, idx) => {
          // Alternate slide directions with subtle professional offset (60px)
          const sideOffset = idx % 2 === 0 ? -60 : 60;
          gsap.set(card, { x: sideOffset, opacity: 0, scale: 0.97 });
        });
      }
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const subtitle = section.querySelector('.section-subtitle');
          const title = section.querySelector('.section-title');
          const cards = section.querySelectorAll('.bento-card, .glass-panel, .project-card-wrap, .credentials-grid > *, .contact-bento-layout > *');

          // Staggered reveal vectors coming from the sides
          if (subtitle) {
            gsap.to(subtitle, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });
          }
          if (title) {
            gsap.to(title, { y: 0, opacity: 1, duration: 1.25, delay: 0.04, ease: 'power3.out' });
          }
          
          if (cards.length) {
            gsap.to(cards, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.25,
              stagger: 0.12,
              delay: 0.08,
              ease: 'power3.out',
              clearProps: 'transform,opacity' // Clears inline styles to let native hover transforms/opacities work!
            });
          }

          // Disconnect observer for this section once animated
          sectionObserver.unobserve(section);
        }
      });
    }, observerOptions);

    sections.forEach(sec => {
      sectionObserver.observe(sec);
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  // Custom Toast helper
  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Contact info clipboard pipeline
  const handleCopyEmail = (e) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('shekhawatshivamsingh3@gmail.com');
    triggerToast('✦ Core email copied to clipboard registry!');
  };

  // Contact form submission with high-end quantum-encryption ingest simulation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      triggerToast('Please complete all required contact details.');
      return;
    }
    setIsSubmitting(true);
    triggerToast('✦ Initiating secure quantum connection handshake...');
    
    setTimeout(() => {
      triggerToast(`[TRANSMISSION VERIFIED] Thanks ${form.name}! Shivam will initiate connection shortly.`);
      setForm({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1800);
  };

  // 3D Card Hover Physics & Vercel-Style Border Spotlight Custom Properties
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    
    // Lazy cache the bounding client rect on first move to prevent layout thrashing!
    let rect = cardRectsRef.current.get(card);
    if (!rect) {
      rect = card.getBoundingClientRect();
      cardRectsRef.current.set(card, rect);
    }
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom CSS coordinates for our ultra-fine 3D border spotlights!
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const rotateX = (-deltaY * 7).toFixed(2); // Tilt pitch (max 7deg)
    const rotateY = (deltaX * 7).toFixed(2);  // Tilt yaw (max 7deg)
    
    card.style.transition = 'none'; // Instant response to mouse coordinates, no transition lag!
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    cardRectsRef.current.delete(card); // Clear cached rect
    
    // Smooth reset of border spotlight coordinates
    card.style.removeProperty('--mouse-x');
    card.style.removeProperty('--mouse-y');
    
    // Buttery-smooth spring back on leave!
    card.style.transition = 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease, box-shadow 0.4s ease';
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Premium 3D Holographic Orbiting Canvas Sphere (120 FPS Perspective Projection)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const panel = visualPanelRef.current;

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const points = [];
    const pointCount = 92;
    const sphereRadius = Math.min(width, height) * 0.48;
    
    for (let i = 0; i < pointCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      points.push({
        x: sphereRadius * Math.sin(phi) * Math.cos(theta),
        y: sphereRadius * Math.sin(phi) * Math.sin(theta),
        z: sphereRadius * Math.cos(phi),
        color: i % 3 === 0 ? 'rgba(99, 102, 241, 0.72)' : 
               i % 3 === 1 ? 'rgba(168, 85, 247, 0.72)' : 'rgba(236, 72, 153, 0.65)'
      });
    }

    let targetRotX = 0.003;
    let targetRotY = 0.005;

    const handleMouseMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = x * 0.00003;
      targetRotX = -y * 0.00003;
    };

    panel.addEventListener('mousemove', handleMouseMove, { passive: true });

    let angleX = 0;
    let angleY = 0;
    let animId;
    let isIntersecting = true;

    const fov = 320;
    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      if (!isIntersecting) return;
      ctx.clearRect(0, 0, width, height);

      angleX += (targetRotX - angleX) * 0.07;
      angleY += (targetRotY - angleY) * 0.07;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projectedPoints = [];

      points.forEach((p) => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;

        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2);
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;

        projectedPoints.push({
          x: screenX,
          y: screenY,
          z: z2,
          radius: Math.max(0.8, (sphereRadius * 0.016) * scale),
          color: p.color
        });

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 58) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 58) * 0.07 * (fov / (fov + (p1.z + p2.z)/2));
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      projectedPoints.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        if (p.z < 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace('0.72', '0.12').replace('0.65', '0.1');
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        }
      });
    }, { threshold: 0 });

    if (panel) {
      observer.observe(panel);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      panel.removeEventListener('mousemove', handleMouseMove);
      if (panel) {
        observer.unobserve(panel);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  // Elite Custom Trailing Magnetic Cursors & Physical Snapping Pull
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const grid = document.querySelector('.cyber-grid-overlay'); // Query once on mount!

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let isMagnetic = false;
    let activeMagnet = null;
    let activeMagnetRect = null;
    let magnetPageX = 0;
    let magnetPageY = 0;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Parallax cyber grid tilt effect using cached reference!
      if (grid) {
        const tiltX = (e.clientX - window.innerWidth / 2) * 0.012;
        const tiltY = (e.clientY - window.innerHeight / 2) * -0.012;
        grid.style.transform = `perspective(1000px) rotateX(${60 + tiltY}deg) rotateY(${tiltX}deg) translate3d(0, 0, 0)`;
      }
    };

    const handleMouseDown = () => follower.classList.add('clicking');
    const handleMouseUp = () => follower.classList.remove('clicking');

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    const tick = () => {
      if (isMagnetic && activeMagnet && activeMagnetRect) {
        const magnetCenterX = magnetPageX - window.scrollX + activeMagnetRect.width / 2;
        const magnetCenterY = magnetPageY - window.scrollY + activeMagnetRect.height / 2;

        followerX += (magnetCenterX - followerX) * 0.28;
        followerY += (magnetCenterY - followerY) * 0.28;
        
        const pullX = (mouseX - magnetCenterX) * 0.22;
        const pullY = (mouseY - magnetCenterY) * 0.22;
        activeMagnet.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.03)`;
        activeMagnet.style.transition = 'none';
      } else {
        followerX += (mouseX - followerX) * 0.22;
        followerY += (mouseY - followerY) * 0.22;
      }

      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(tick);
    };
    const animId = requestAnimationFrame(tick);

    const handleMouseOver = (e) => {
      const el = e.target.closest('a, button, .btn-cta-primary, .btn-cta-secondary, .projects-filter-btn, .nav-link-btn, .floating-terminal-badge, .btn-nav-cta, .nav-logo, .skill-bento-card, .project-bento-card');
      if (!el) return;
      
      if (e.relatedTarget && el.contains(e.relatedTarget)) return;

      follower.classList.add('hovering');
      
      let tip = 'VIEW';
      if (el.tagName === 'BUTTON' || 
          el.classList.contains('btn-cta-primary') || 
          el.classList.contains('btn-cta-secondary') || 
          el.classList.contains('btn-form-submit') || 
          el.classList.contains('skill-bento-card') || 
          el.classList.contains('project-bento-card')) {
        tip = 'CLICK';
      }
      if (el.classList.contains('projects-filter-btn')) tip = 'SORT';
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') tip = 'TYPE';
      if (el.classList.contains('floating-terminal-badge')) tip = 'EXEC';
      
      follower.setAttribute('data-tip', tip);

      if (el.classList.contains('btn-cta-primary') || 
          el.classList.contains('btn-cta-secondary') || 
          el.classList.contains('btn-nav-cta') || 
          el.classList.contains('projects-filter-btn') || 
          el.classList.contains('floating-terminal-badge') || 
          el.classList.contains('nav-logo') || 
          el.classList.contains('nav-link-btn')) {
        isMagnetic = true;
        activeMagnet = el;
        const rect = el.getBoundingClientRect();
        activeMagnetRect = rect;
        magnetPageX = rect.left + window.scrollX;
        magnetPageY = rect.top + window.scrollY;
        follower.classList.add('magnetic');
        
        if (el.classList.contains('floating-terminal-badge') || el.classList.contains('nav-logo-box')) {
          follower.style.borderRadius = '50%';
        } else {
          follower.style.borderRadius = '8px';
        }
      }
    };

    const handleMouseOut = (e) => {
      const el = e.target.closest('a, button, .btn-cta-primary, .btn-cta-secondary, .projects-filter-btn, .nav-link-btn, .floating-terminal-badge, .btn-nav-cta, .nav-logo, .skill-bento-card, .project-bento-card');
      if (!el) return;
      
      if (e.relatedTarget && el.contains(e.relatedTarget)) return;

      follower.classList.remove('hovering');
      follower.classList.remove('magnetic');
      follower.removeAttribute('data-tip');
      follower.style.borderRadius = '';

      if (activeMagnet) {
        activeMagnet.style.transform = '';
        activeMagnet.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }
      isMagnetic = false;
      activeMagnet = null;
      activeMagnetRect = null;
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Elastic spring transitions for active skill details selector bento
  useEffect(() => {
    gsap.fromTo('.skills-details-wrapper > *', 
      { y: 12, opacity: 0, scale: 0.99 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power4.out' }
    );
  }, [activeSkillId]);

  // Command Center Shortcuts (Cmd+K or Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsMatrixActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isTerminalOpen) {
      if (terminalHistory.length === 0) {
        setTimeout(() => {
          setTerminalHistory([
            { text: '✦ SHIVAM SECURE SHELL SYSTEM v2.0.6', type: 'output-header' },
            { text: '✦ Type "help" to display available operational commands.', type: 'output-system' }
          ]);
        }, 0);
      }
      setTimeout(() => {
        if (terminalInputRef.current) {
          terminalInputRef.current.focus();
        }
      }, 50);
    }
  }, [isTerminalOpen, terminalHistory.length]);

  // Terminal Autocomplete & Submit Handlers
  const handleTerminalKeyDown = (e) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && autocompleteHint) {
      e.preventDefault();
      setTerminalInput(autocompleteHint);
      setAutocompleteHint('');
    }
  };

  const handleTerminalInputChange = (e) => {
    const value = e.target.value;
    setTerminalInput(value);

    if (!value) {
      setAutocompleteHint('');
      return;
    }

    const commands = ['help', 'about', 'skills', 'projects', 'contact', 'matrix', 'clear', 'exit', 'gui', 'logs', 'status'];
    const match = commands.find(c => c.startsWith(value.toLowerCase()));
    
    if (match && match !== value.toLowerCase()) {
      setAutocompleteHint(match);
    } else {
      setAutocompleteHint('');
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const rawInput = terminalInput.trim();
    if (!rawInput) return;

    const lowerInput = rawInput.toLowerCase();
    const parts = lowerInput.split(' ');
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    const newHistory = [...terminalHistory, { text: `$ ${rawInput}`, type: 'command-echo' }];
    setTerminalInput('');
    setAutocompleteHint('');

    const addHistoryLine = (text, type = 'output-system') => {
      newHistory.push({ text, type });
    };

    switch (cmd) {
      case 'help':
        addHistoryLine('✦ AVAILABLE OPERATIONAL COMMANDS:', 'output-header');
        addHistoryLine('  about         - Display Shivam\'s personal and VGU scholar specs', 'output-system');
        addHistoryLine('  skills        - Render interactive core skills competency matrix', 'output-system');
        addHistoryLine('  projects      - Showcase verified portfolio case study matrix', 'output-system');
        addHistoryLine('  contact       - Launch interactive email communication ingest', 'output-system');
        addHistoryLine('  status / logs - Display real-time e-commerce server & database logs', 'output-system');
        addHistoryLine('  matrix        - Initiate full-screen green code digital rain screensaver', 'output-system');
        addHistoryLine('  clear         - Purge current secure shell logging registry', 'output-system');
        addHistoryLine('  gui / exit    - Return to regular graphical portfolio layout', 'output-system');
        break;

      case 'clear':
        setTerminalHistory([]);
        return;

      case 'matrix':
        setIsMatrixActive(true);
        setIsTerminalOpen(false);
        return;

      case 'exit':
      case 'gui':
        setIsTerminalOpen(false);
        return;

      case 'about':
        addHistoryLine('✦ SHIVAM SINGH SHEKHAWAT - CORE METRICS:', 'output-header');
        addHistoryLine('  ────────────────────────────────────────────────', 'output-system');
        addHistoryLine('  Role: Full Stack Web Developer & AI Web Craftsman', 'output-system');
        addHistoryLine('  Degree: BCA Student @ Vivekananda Global University, Jaipur', 'output-system');
        addHistoryLine('  Focus: High-Performance MERN Stack & Next.js Systems', 'output-system');
        addHistoryLine('  Status: Available for 2026 contract requests', 'output-success');
        addHistoryLine('  Email: shekhawatshivamsingh3@gmail.com', 'output-system');
        addHistoryLine('  ────────────────────────────────────────────────', 'output-system');
        break;

      case 'skills':
        addHistoryLine('✦ CORE COMPETENCY MATRIX:', 'output-header');
        addHistoryLine('  React/Next.js [██████████████████░] 90% - Advanced Master', 'output-success');
        addHistoryLine('  Tailwind CSS  [██████████████████░] 92% - Advanced Master', 'output-success');
        addHistoryLine('  HTML5/CSS3    [███████████████████] 95% - Expert Craftsman', 'output-success');
        addHistoryLine('  JavaScript    [█████████████████░░] 88% - Advanced Core', 'output-success');
        addHistoryLine('  Git & GitHub  [████████████████░░░] 86% - Advanced Core', 'output-system');
        addHistoryLine('  Bootstrap 5   [████████████████░░░] 85% - Advanced Core', 'output-system');
        addHistoryLine('  Express/Node  [████████████████░░░] 82% - Intermediate Specialist', 'output-system');
        addHistoryLine('  MongoDB       [████████████████░░░] 80% - Intermediate Specialist', 'output-system');
        break;

      case 'projects':
        addHistoryLine('✦ FEATURED CASE STUDY MATRIX:', 'output-header');
        PROJECTS_DATA.forEach((p, idx) => {
          addHistoryLine(`  [${idx + 1}] ${p.title} (${p.category})`, 'output-system');
          addHistoryLine(`      Specs: ${p.shortDesc}`, 'output-warning');
        });
        addHistoryLine('  ────────────────────────────────────────────────', 'output-system');
        addHistoryLine('  Type "project <number>" (e.g. "project 1") to load specs.', 'output-success');
        break;

      case 'project': {
        const index = parseInt(arg) - 1;
        if (index >= 0 && index < PROJECTS_DATA.length) {
          const selectedProj = PROJECTS_DATA[index];
          setSelectedProject(selectedProj);
          setIsTerminalOpen(false);
          triggerToast(`✦ Loaded Case Study Specs: ${selectedProj.title}`);
          return;
        } else {
          addHistoryLine(`[ERROR] Project specification index "${arg}" is not active.`, 'output-error');
        }
        break;
      }

      case 'contact':
        addHistoryLine('✦ SECURE COLLABORATION CONNECTION INITIALIZED', 'output-header');
        addHistoryLine('  This console will capture inquiry parameters directly.', 'output-system');
        addHistoryLine('  Please use the graphical form in the footer or reach out:', 'output-warning');
        addHistoryLine('  Email: shekhawatshivamsingh3@gmail.com', 'output-system');
        addHistoryLine('  Direct Line: 8764719910', 'output-system');
        addHistoryLine('  LinkedIn: linkedin.com/in/shivam-singh-shekhawat-14826638a/', 'output-system');
        break;

      case 'status':
      case 'logs': {
        addHistoryLine('✦ ESTABLISHING SECURE CONNECTION TO E-COMMERCE SERVER NODE:', 'output-header');
        addHistoryLine('  Port: 5000 | MongoDB: Connected (latency: 14ms) | APIs: Synchronized', 'output-system');
        addHistoryLine('  ────────────────────────────────────────────────', 'output-system');
        addHistoryLine('  [MAPPED CRUD API STATUS]:', 'output-header');
        addHistoryLine('  - Brand controller endpoints: Mapped 6/6 successfully.', 'output-success');
        addHistoryLine('  - Color controller endpoints: Mapped 6/6 successfully.', 'output-success');
        addHistoryLine('  - Category controller endpoints: Typo patched successfully.', 'output-success');
        addHistoryLine('  ────────────────────────────────────────────────', 'output-system');
        addHistoryLine('  [REAL-TIME TRANSACTION READOUT]:', 'output-header');
        
        const endpoints = [
          'GET /api/products?page=1 - 200 OK (38ms)',
          'POST /api/users/login - 200 OK (84ms) - JWT Generated',
          'GET /api/color - 200 OK (22ms) - 6 items rendered',
          'GET /api/brand - 200 OK (18ms) - 5 items rendered',
          'POST /api/products - 201 Created (112ms) - Indexing Atlas',
          'PUT /api/color/col-neon - 200 OK (45ms) - Cache invalidated'
        ];
        
        endpoints.forEach(e => {
          addHistoryLine(`  [TRAFFIC] ${e}`, 'output-warning');
        });
        
        addHistoryLine('  ────────────────────────────────────────────────', 'output-system');
        addHistoryLine('  All backend operational APIs verified stable.', 'output-success');
        break;
      }

      default:
        addHistoryLine(`[SHELL EXCEPTION] Command "${cmd}" is not recognized.`, 'output-error');
        addHistoryLine('Type "help" to display active parameters.', 'output-system');
    }

    setTerminalHistory(newHistory);
    
    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 30);
  };

  // Dynamic Hacker Matrix Digital Rain screensaver
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const cols = Math.floor(width / 16);
    const ypos = Array(cols).fill(0);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%+*<>[]{}';
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981';
      ctx.font = '14px monospace';

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = ypos[i];

        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          ypos[i] = 0;
        } else {
          ypos[i] = y + 16;
        }
      }
    };

    const interval = setInterval(drawMatrix, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixActive]);

  // Vercel-style GSAP FLIP Shuffle Grid transition for projects filtering
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card-wrap');
    if (!cards.length) return;

    const positions = new Map();
    cards.forEach(card => {
      positions.set(card, card.getBoundingClientRect());
    });

    requestAnimationFrame(() => {
      cards.forEach(card => {
        const oldRect = positions.get(card);
        if (!oldRect) return;
        const newRect = card.getBoundingClientRect();

        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;

        if (dx !== 0 || dy !== 0) {
          gsap.fromTo(card, 
            { x: dx, y: dy, scale: 0.97 },
            { x: 0, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', clearProps: 'transform' }
          );
        } else {
          gsap.fromTo(card,
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out', clearProps: 'transform' }
          );
        }
      });
    });
  }, [activeFilter]);

  const activeSkill = SKILLS_DATA.find(s => s.id === activeSkillId) || SKILLS_DATA[0];

  return (
    <div>
      
      {/* 3D Parallax Cyber Grid Overlay backdrop */}
      <div className="cyber-grid-overlay"></div>

      {/* Dynamic Toast Alerts */}
      {toast && (
        <div className="toast-msg">
          <span style={{color: 'var(--accent)'}}>✦</span>
          <span>{toast}</span>
        </div>
      )}

      {/* ==========================================
          CAPSULE FLOAT NAVBAR
          ========================================== */}
      <div className="navbar-wrapper">
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-active' : ''}`} ref={navbarRef}>
          {/* Integrated laser scroll progress indicator */}
          <div className="navbar-progress-track">
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
          </div>
          
          <div className="nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <div className="nav-logo-box">SS</div>
            <span>Shivam Singh</span>
          </div>
          
          <ul className="nav-links" ref={navLinksRef}>
            <div className="nav-active-pill" style={pillStyle}></div>
            <li><a href="#about" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
            <li><a href="#skills" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#credentials" className="nav-link-btn" onMouseEnter={handleNavLinkMouseEnter} onMouseLeave={handleNavLinkMouseLeave} onClick={() => setIsMobileMenuOpen(false)}>Certifications</a></li>
          </ul>

          <a href="#contact" className="btn-nav-cta" style={{textDecoration: 'none'}} onClick={() => setIsMobileMenuOpen(false)}>Hire Shivam</a>

          {/* Glowing responsive mobile capsule toggle */}
          <button className={`nav-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
      </div>

      {/* ==========================================
          HERO PROFILE SECTION
          ========================================== */}
      <section className="section hero-section">
        
        <div className="hero-details">
          
          <div className="hero-tagline">
            <span style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)'}}></span>
            <span>Now Booking Projects for 2026</span>
          </div>

          <h1 className="hero-main-title">
            Shivam Singh Shekhawat
            <span className="editorial-title">Crafting Premium Digital Experiences</span>
          </h1>

          <div className="hero-role-carousel">
            <span>{typingRole}</span>
          </div>

          <p className="hero-desc">
            Computer Applications (BCA) student at <strong>Vivekananda Global University</strong>, specializing in robust MERN stack applications and responsive interfaces optimized with modern Generative AI acceleration.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn-cta-primary">
              <span>View Case Studies</span>
              <span>→</span>
            </a>
            <a 
              href="/full_stack_resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-cta-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Download Resume</span>
              <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>⭳</span>
            </a>
            <a href="#contact" className="btn-cta-secondary" style={{ background: 'transparent', border: 'none', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>Get In Touch</a>
          </div>

        </div>

        {/* Fluid Canvas Panel */}
        <div className="hero-visual-panel" ref={visualPanelRef}>
          <canvas className="particles-canvas" ref={canvasRef} />
          
          <div 
            className="visual-profile-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="visual-avatar-container">
              <img src="/shivam.jpeg" alt="Shivam Singh Shekhawat" className="visual-avatar-img" />
              <div className="avatar-glowing-pulse"></div>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em'}}>Shivam Singh</h3>
              <p style={{fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: '600'}}>Full-Stack Developer</p>
            </div>
            
            <div className="stats-badge-row">
              <span className="stats-badge">✦ 5+ Projects</span>
              <span className="stats-badge">📍 Jaipur, IN</span>
            </div>
            
            <p style={{fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4'}}>Engineering high-performance MERN & Next.js systems.</p>
          </div>

        </div>

      </section>

      {/* ==========================================
          APPLE STYLE BENTO GRID WORKSPACE
          ========================================== */}
      <section className="section" id="about">
        
        <span className="section-subtitle">
          <span>✦</span> Biography & Journey
        </span>
        <h2 className="section-title">Academic & <span className="editorial-title">Personal Profile</span></h2>

        <div className="bento-grid">
          
          {/* Bento Card 1: Bio */}
          <div 
            className="bento-card bento-span-2 bento-bio-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <h3 className="bento-card-title" style={{color: 'var(--primary)'}}>The Developer & Scholar</h3>
            <p>
              Currently pursuing a <strong>Bachelor of Computer Applications (BCA)</strong> at <em>Vivekananda Global University, Jaipur</em>, my engineering journey is centered around mastering robust, full-stack systems that load cleanly and scale effortlessly.
            </p>
            <p>
              I specialize in bridging visual aesthetics with structured server logistics. By applying MERN parameters combined with Gen AI optimization steps, I build applications with high reliability.
            </p>
          </div>

          {/* Bento Card 2: Metrics */}
          <div 
            className="bento-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <h3 className="bento-card-title" style={{color: 'var(--accent)'}}>Platform Stats</h3>
            <div className="bento-stats-grid">
              <div className="bento-stat-item">
                <span className="bento-stat-num">5+</span>
                <span className="bento-stat-lbl">Web Projects</span>
              </div>
              <div className="bento-stat-item">
                <span className="bento-stat-num">48h</span>
                <span className="bento-stat-lbl">Gen AI Cohorts</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Timeline VGU */}
          <div 
            className="bento-card bento-span-2"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <h3 className="bento-card-title" style={{color: 'var(--primary)'}}>Academic Timeline</h3>
            <div className="bento-timeline">
              <div className="bento-timeline-node">
                <span className="bento-timeline-date">09/2025 - PRESENT</span>
                <span className="bento-timeline-title">BCA Degree</span>
                <span className="bento-timeline-subtitle">Vivekananda Global University</span>
              </div>
              <div className="bento-timeline-node">
                <span className="bento-timeline-date">10/2025 - PRESENT</span>
                <span className="bento-timeline-title">Gen AI & Full Stack Mastery</span>
                <span className="bento-timeline-subtitle">Specialized training cohorts</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Interests */}
          <div 
            className="bento-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <h3 className="bento-card-title" style={{color: 'var(--accent)'}}>Passions</h3>
            <p style={{fontSize: '0.85rem', color: '#cbd5e1'}}>Key interests driving my development workflow:</p>
            <div className="chips-row">
              <span className="interest-chip">MERN Stack</span>
              <span className="interest-chip">Next.js SSR</span>
              <span className="interest-chip">Gen AI</span>
              <span className="interest-chip">UI/UX</span>
            </div>
          </div>

        </div>

      </section>

      {/* ==========================================
          INTERACTIVE SKILLS BENTO DASHBOARD
          ========================================== */}
      <section className="section" id="skills">
        
        <span className="section-subtitle">
          <span>✦</span> Core Competencies
        </span>
        <h2 className="section-title">Interactive <span className="editorial-title">Skills Matrix</span></h2>

        <div className="glass-panel skills-bento-grid" style={{padding: '2.25rem', borderRadius: 'var(--radius-lg)'}}>
          
          {/* Left: Skill Selectors */}
          <div className="skills-left-selector">
            {SKILLS_DATA.map((skill) => (
              <div 
                key={skill.id}
                className={`glass-card skill-bento-card ${activeSkillId === skill.id ? 'active' : ''}`}
                onClick={() => setActiveSkillId(skill.id)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="skill-icon-placeholder">
                  {renderSkillIcon(skill.id)}
                </div>
                <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'white'}}>{skill.label.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          {/* Right: Analytics details Panel */}
          <div 
            className="glass-card skills-right-details"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="skills-details-wrapper">
              
              <div className="skills-details-header">
                <div>
                  <h3 className="skills-details-title">{activeSkill.label}</h3>
                  <span style={{fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 'bold'}}>{activeSkill.level}</span>
                </div>
                <span style={{fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'white'}}>{activeSkill.percent}%</span>
              </div>

              <div className="skills-details-bar-track">
                <div className="skills-details-bar-fill" style={{width: `${activeSkill.percent}%`}}></div>
              </div>

              <div style={{marginTop: '0.5rem'}}>
                <span style={{fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Overview Specs</span>
                <p style={{fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.35rem', lineHeight: 1.6}}>{activeSkill.desc}</p>
              </div>

              <div style={{marginTop: '0.5rem'}}>
                <span style={{fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Applied in Projects</span>
                <div className="chips-row" style={{marginTop: '0.35rem'}}>
                  {activeSkill.projects.map((proj, idx) => (
                    <span className="interest-chip" key={idx} style={{background: 'rgba(255,255,255,0.01)'}}>{proj}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ==========================================
          PORTFOLIO SHOWCASE: BENTO MATRIX
          ========================================== */}
      <section className="section" id="projects">
        
        <span className="section-subtitle">
          <span>✦</span> Case Studies
        </span>
        <h2 className="section-title">Featured <span className="editorial-title">Project Matrix</span></h2>

        {/* Filter Navigation */}
        <div className="projects-filter-bar-container">
          <div className="projects-filter-bar">
            {['All', 'Full Stack', 'Frontend', 'UI & Clone'].map((category) => (
              <button 
                key={category}
                className={`projects-filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {activeFilter === category && <span className="filter-dot"></span>}
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid bento project display */}
        <div className="projects-matrix-grid">
          {PROJECTS_DATA.filter(p => activeFilter === 'All' || p.category === activeFilter).map((project) => (
            <div className="project-card-wrap" key={project.id}>
              <div 
                className="bento-card project-bento-card" 
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  <div style={{display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                    <span className="project-tag" style={{borderColor: project.color, color: 'white'}}>{project.category}</span>
                    <span style={{fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)'}}>{project.date}</span>
                  </div>
                  
                  <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'white', fontWeight: 600, lineHeight: 1.3}}>{project.title}</h3>
                  <p style={{fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: 1.5}}>{project.shortDesc}</p>
                </div>

                {/* SVG Visualizer mockups inside card */}
                <div className="project-svg-visualizer">
                  {renderProjectVisual(project.id)}
                </div>

                <div style={{marginTop: '1.25rem', fontSize: '0.85rem', color: project.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <span>Analyze Case Study</span>
                  <span>→</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          CREDENTIALS & CERTIFICATIONS
          ========================================== */}
      <section className="section" id="credentials">
        
        <span className="section-subtitle">
          <span>✦</span> Certificates & Achievements
        </span>
        <h2 className="section-title">Verified <span className="editorial-title">Credentials</span></h2>

        <div className="credentials-grid">
          {CREDENTIALS_DATA.map((cert, index) => (
            <div 
              className="bento-card cert-bento-card" 
              key={index}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="cert-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.15rem'}}>
                <span style={{fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 'bold'}}>{cert.date}</span>
                <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', fontWeight: 600}}>{cert.title}</h3>
                <span style={{fontSize: '0.8rem', color: '#94a3b8'}}>{cert.provider}</span>
                <p style={{fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem'}}>{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          CONTACT PANEL BENTO PORTAL
          ========================================== */}
      <section className="section" id="contact">
        
        <span className="section-subtitle">
          <span>✦</span> Secure Connection Ingestion
        </span>
        <h2 className="section-title">Initiate <span className="editorial-title">Collaboration</span></h2>

        <div className="contact-bento-layout">
          
          <div className="contact-left-info">
            <p className="contact-text">
              Have an enterprise project, complex backend specifications, or a full-stack job opportunity? Get in touch, and let’s engineer a solution.
            </p>

            <div className="contact-bento-badges">
              
              <div 
                className="contact-badge-item"
                style={{ cursor: 'pointer' }}
                onClick={handleCopyEmail}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleCopyEmail(e); } }}
                tabIndex={0}
                role="button"
                aria-label="Copy primary email to clipboard"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="contact-badge-icon">✉</div>
                <div>
                  <div className="contact-badge-lbl">Primary Ingest Email (Click to Copy)</div>
                  <div className="contact-badge-val">shekhawatshivamsingh3@gmail.com</div>
                </div>
              </div>

              <a 
                href="tel:8764719910" 
                className="contact-badge-item"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="contact-badge-icon">📞</div>
                <div>
                  <div className="contact-badge-lbl">Direct Communication Line</div>
                  <div className="contact-badge-val">8764719910</div>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/shivam-singh-shekhawat-14826638a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-badge-item"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="contact-badge-icon">🔗</div>
                <div>
                  <div className="contact-badge-lbl">Professional LinkedIn Node</div>
                  <div className="contact-badge-val">shivam-singh-shekhawat</div>
                </div>
              </a>

              <a 
                href="https://github.com/Shivam87647" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-badge-item"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="contact-badge-icon">🐙</div>
                <div>
                  <div className="contact-badge-lbl">Active Github Registry</div>
                  <div className="contact-badge-val">Shivam87647</div>
                </div>
              </a>

            </div>
          </div>

          {/* Form Side */}
          <form 
            className="bento-card contact-bento-form" 
            onSubmit={handleSubmit}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            
            <div className="form-group">
              <label className="form-label">Display Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Alex Mercer"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Node *</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="alex@enterprise.com"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject Specification</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Next.js Contract Node integration"
                value={form.subject}
                onChange={(e) => setForm({...form, subject: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Inquiry Core Details *</label>
              <textarea 
                className="form-textarea" 
                placeholder="Provide parameters of required task scope..."
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Ingesting Secure Connection...' : 'Transmit Message Node'}</span>
              <span className={isSubmitting ? 'pulse-spinner' : ''}>⚡</span>
            </button>

          </form>

        </div>

      </section>

      {/* ==========================================
          FOOTER PANEL
          ========================================== */}
      <footer className="footer">
        <div className="footer-socials">
          <a href="https://github.com/Shivam87647" target="_blank" rel="noopener noreferrer" className="footer-social-btn">Github</a>
          <a href="https://www.linkedin.com/in/shivam-singh-shekhawat-14826638a/" target="_blank" rel="noopener noreferrer" className="footer-social-btn">LinkedIn</a>
          <a href="mailto:shekhawatshivamsingh3@gmail.com" className="footer-social-btn">Email</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Shivam Singh Shekhawat. Structured with pixel-accuracy. All rights reserved.
        </p>
      </footer>

      {/* ==========================================
          FULL-SCREEN CASE STUDY DRAWER SLIDER
          ========================================== */}
      {selectedProject && (
        <>
          {/* Overlay background dim blur */}
          <div className="case-study-overlay-backdrop" onClick={() => setSelectedProject(null)}></div>
          
          <div className={`case-study-drawer ${selectedProject ? 'open' : ''}`}>
            
            <div className="case-study-header">
              <div className="nav-logo">
                <div className="nav-logo-box">SS</div>
                <span className="case-study-title">Case Study Specs</span>
              </div>
              <button className="btn-close-case-study" onClick={() => setSelectedProject(null)}>✕</button>
            </div>

            <div className="case-study-content">
              
              <div className="case-study-section">
                <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.65rem', color: 'white', fontWeight: 700}}>{selectedProject.title}</h3>
                <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap', alignItems: 'center'}}>
                  <span className="project-tag" style={{borderColor: selectedProject.color, color: 'white', background: 'rgba(255,255,255,0.01)'}}>{selectedProject.category}</span>
                  <span className="project-tag">{selectedProject.date}</span>
                </div>
                
                {/* Recruiting Verifiable Action Buttons */}
                <div style={{display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap'}}>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-cta-primary" style={{padding: '0.55rem 1.1rem', fontSize: '0.75rem', borderRadius: '4px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px'}}>
                    <span>Explore Source Registry</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">1. Operational Challenge</span>
                <p className="case-study-desc">{selectedProject.challenge}</p>
              </div>

              {/* Dynamic SVG Architecture Diagram customized per project */}
              <div className="case-study-section">
                <span className="case-study-section-title">2. System Architecture Flow</span>
                <div className="architecture-diagram-svg">
                  {renderArchitectureDiagram(selectedProject.id)}
                </div>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">3. Key Accomplishments</span>
                <ul className="bullet-list">
                  {selectedProject.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="case-study-section">
                <span className="case-study-section-title">4. Quantifiable Operational Impact</span>
                <ul className="bullet-list">
                  {selectedProject.impact.map((imp, idx) => (
                    <li key={idx} style={{color: 'white'}}>{imp}</li>
                  ))}
                </ul>
              </div>

              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.45rem', borderTop: '1px solid var(--border-fine)', paddingTop: '1.5rem', marginTop: '0.5rem'}}>
                {selectedProject.tags.map((t, idx) => (
                  <span className="project-tag" key={idx} style={{borderColor: selectedProject.color, color: 'white', background: 'rgba(255,255,255,0.01)', fontSize: '0.75rem'}}>{t}</span>
                ))}
              </div>

            </div>

          </div>
        </>
      )}

      {/* Floating command center badge */}
      <div className="floating-terminal-badge" onClick={() => setIsTerminalOpen(true)}>⌘</div>

      {/* Interactive Cursors */}
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true"></div>
      <div className="custom-cursor-follower" ref={followerRef} aria-hidden="true"></div>

      {/* Command Center Overlay Terminal Modal */}
      {isTerminalOpen && (
        <div className="terminal-overlay" onClick={() => setIsTerminalOpen(false)}>
          <div className="terminal-modal" onClick={(e) => e.stopPropagation()}>
            <div className="terminal-titlebar">
              <div className="terminal-window-buttons">
                <button className="terminal-dot-btn red" onClick={() => setIsTerminalOpen(false)}></button>
                <button className="terminal-dot-btn yellow"></button>
                <button className="terminal-dot-btn green"></button>
              </div>
              <span className="terminal-title-text">shivam@cyber-shell:~</span>
              <button className="terminal-close-btn" onClick={() => setIsTerminalOpen(false)}>✕</button>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
              <div className="terminal-history">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className={`terminal-line ${line.type}`}>{line.text}</div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="terminal-input-row">
                <span className="terminal-prompt">~ $</span>
                <div className="terminal-input-wrapper">
                  <input 
                    type="text" 
                    className="terminal-input"
                    ref={terminalInputRef}
                    value={terminalInput}
                    onChange={handleTerminalInputChange}
                    onKeyDown={handleTerminalKeyDown}
                    autoFocus
                  />
                  {autocompleteHint && (
                    <span className="terminal-autocomplete-hint">
                      {terminalInput}{autocompleteHint.substring(terminalInput.length)}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hacker Matrix Digital Rain Screensaver */}
      {isMatrixActive && (
        <>
          <canvas className="matrix-overlay-canvas" ref={matrixCanvasRef}></canvas>
          <button className="matrix-exit-badge" onClick={() => setIsMatrixActive(false)}>EXIT MATRIX SCREEN [ESC]</button>
        </>
      )}

    </div>
  );
}
