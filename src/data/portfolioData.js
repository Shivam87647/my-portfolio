export const PROJECTS_DATA = [
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

export const SKILLS_DATA = [
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

export const CREDENTIALS_DATA = [
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

export const ROLES_POOL = ['Full Stack Web Developer', 'BCA Student @ VGU', 'MERN Stack Specialist', 'AI-Assisted Web Craftsman'];

export const TERMINAL_INITIAL_HISTORY = [
  { text: '\u2726 SHIVAM SECURE SHELL SYSTEM v2.0.6', type: 'output-header' },
  { text: '\u2726 Type "help" to display available operational commands.', type: 'output-system' }
];

export const CONTACT_LINKS = [
  {
    type: 'button',
    icon: '\u2709',
    label: 'Primary Ingest Email (Click to Copy)',
    value: 'shekhawatshivamsingh3@gmail.com',
    action: 'copy-email'
  },
  {
    type: 'link',
    href: 'tel:8764719910',
    icon: '\uD83D\uDCDE',
    label: 'Direct Communication Line',
    value: '8764719910'
  },
  {
    type: 'link',
    href: 'https://www.linkedin.com/in/shivam-singh-shekhawat-14826638a/',
    icon: '\uD83D\uDD17',
    label: 'Professional LinkedIn Node',
    value: 'shivam-singh-shekhawat',
    external: true
  },
  {
    type: 'link',
    href: 'https://github.com/Shivam87647',
    icon: '\uD83D\uDC19',
    label: 'Active Github Registry',
    value: 'Shivam87647',
    external: true
  }
];

export const ARCHITECTURE_CONFIGS = {
  'proj-ecommerce': {
    gradientColors: { start: 'var(--primary)', end: 'var(--accent)' },
    lineColors: ['var(--primary)', 'var(--accent)'],
    nodes: [
      { title: 'Next.js SSR', subtitle: 'Redux Client', label: 'Responsive Viewport', subtitleColor: 'var(--accent)', labelColor: '#64748b' },
      { title: 'Express Server', subtitle: 'JWT Sessions', label: 'REST Middleware', subtitleColor: 'var(--primary)', labelColor: 'var(--primary)' },
      { title: 'MongoDB Cluster', subtitle: 'Indexed Queries', label: 'Data Pipeline Store', subtitleColor: 'var(--accent)', labelColor: '#64748b' }
    ]
  },
  'proj-goonj': {
    gradientColors: { start: 'var(--accent)', end: 'var(--primary)' },
    lineColors: ['var(--accent)', 'var(--primary)'],
    nodes: [
      { title: 'Form Inputs', subtitle: 'User Submissions', label: 'Dynamic Capture', subtitleColor: 'var(--primary)', labelColor: '#64748b' },
      { title: 'Tailwind UI', subtitle: 'Backdrop Blurs', label: 'Validation layer', subtitleColor: 'var(--accent)', labelColor: 'var(--accent)' },
      { title: 'Data Registry', subtitle: 'Volunteer Store', label: 'Target Ingest Hub', subtitleColor: 'var(--primary)', labelColor: '#64748b' }
    ]
  },
  'proj-myntra': {
    gradientColors: { start: 'var(--primary)', end: 'var(--accent)' },
    lineColors: ['var(--primary)', 'var(--accent)'],
    nodes: [
      { title: 'HTML5 Semantic', subtitle: 'Wireframe Mock', label: 'Pixel-Perfect View', subtitleColor: 'var(--accent)', labelColor: '#64748b' },
      { title: 'CSS3 Grid', subtitle: 'Dropdown Overlay', label: 'Fluid Layout Engine', subtitleColor: 'var(--primary)', labelColor: 'var(--primary)' },
      { title: 'Local Storage', subtitle: 'Bag State Sync', label: 'Persistence layer', subtitleColor: 'var(--accent)', labelColor: '#64748b' }
    ]
  },
  'proj-blinkit': {
    gradientColors: { start: 'var(--accent)', end: 'var(--primary)' },
    lineColors: ['var(--accent)', 'var(--primary)'],
    nodes: [
      { title: 'React Modules', subtitle: 'Item Grid Matrices', label: 'Fast Delivery UI', subtitleColor: 'var(--primary)', labelColor: '#64748b' },
      { title: 'Context Provider', subtitle: 'Reducer Dispatch', label: 'Price Calculations', subtitleColor: 'var(--accent)', labelColor: 'var(--accent)' },
      { title: 'Stock Registry', subtitle: 'JSON Mock DB', label: 'State Synchronizer', subtitleColor: 'var(--primary)', labelColor: '#64748b' }
    ]
  },
  'proj-figma': {
    gradientColors: { start: 'var(--primary)', end: 'var(--accent)' },
    lineColors: ['var(--primary)', 'var(--accent)'],
    nodes: [
      { title: 'Figma Specs', subtitle: 'Raw Visual Tokens', label: 'Layout Spec Source', subtitleColor: 'var(--accent)', labelColor: '#64748b' },
      { title: 'Bootstrap Flex', subtitle: 'Utility Grid Map', label: 'Fluid Responsive DOM', subtitleColor: 'var(--primary)', labelColor: 'var(--primary)' },
      { title: 'High-Fi Web UI', subtitle: 'Micro-Animations', label: 'Pixel-Perfect Hydrate', subtitleColor: 'var(--accent)', labelColor: '#64748b' }
    ]
  }
};
