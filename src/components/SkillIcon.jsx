export default function SkillIcon({ id }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "skill-icon-svg" };

  switch (id) {
    case 'react':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3z" transform="rotate(30 12 12)" />
          <path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3z" transform="rotate(90 12 12)" />
          <path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3z" transform="rotate(150 12 12)" />
        </svg>
      );
    case 'js':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M15 9h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9z" />
          <path d="M9 9v4a2 2 0 0 1-2 2h-1" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg {...common}>
          <path d="M12 2v20M8 5a6 6 0 0 1 8 0c2 3-1 9-4 13-3-4-6-10-4-13a6 6 0 0 1 0 0z" />
        </svg>
      );
    case 'node':
      return (
        <svg {...common}>
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="22" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg {...common}>
          <path d="M12 3c.132 0 .263 0 .393.003a8.995 8.995 0 0 1 8.19 5.86c.642 1.884.28 3.966-.968 5.56L12 21a8.995 8.995 0 0 1-8.19-5.86c-.642-1.884-.28-3.966.968-5.56L12 3z" />
          <path d="M12 7c.066 0 .132 0 .197.001a4.498 4.498 0 0 1 4.095 2.93c.32 1.256.096 2.644-.484 3.707L12 17a4.498 4.498 0 0 1-4.095-2.93c-.32-1.256-.096-2.644.484-3.707L12 7z" />
        </svg>
      );
    case 'htmlcss':
      return (
        <svg {...common}>
          <path d="M12 22L4 18.5 2 3h20l-2 15.5L12 22z" />
          <path d="M8 8h8M8 12h8M10 16h4" />
        </svg>
      );
    case 'bootstrap':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M9 8h4a2 2 0 0 1 2 2v1a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 15 14v1a2 2 0 0 1-2 2H9V8z" />
          <line x1="12" y1="12" x2="9" y2="12" />
        </svg>
      );
    case 'git':
      return (
        <svg {...common}>
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
}
