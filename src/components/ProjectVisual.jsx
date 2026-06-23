export default function ProjectVisual({ id }) {
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
}
