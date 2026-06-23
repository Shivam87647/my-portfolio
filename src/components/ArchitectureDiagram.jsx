import { ARCHITECTURE_CONFIGS } from '../data/portfolioData';

export default function ArchitectureDiagram({ projectId }) {
  const config = ARCHITECTURE_CONFIGS[projectId];
  if (!config) return null;

  const { gradientColors, lineColors, nodes } = config;

  return (
    <svg width="100%" height="100%" viewBox="0 0 500 140" className="architecture-diagram-svg">
      <defs>
        <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientColors.start} stopOpacity="0.45"/>
          <stop offset="100%" stopColor={gradientColors.end} stopOpacity="0.06"/>
        </linearGradient>
      </defs>

      {[20, 195, 370].map((x) => (
        <rect key={x} x={x} y="40" width="110" height="50" rx="6"
          fill="url(#nodeGrad)" stroke="rgba(255,255,255,0.06)" />
      ))}

      <line x1="130" y1="65" x2="195" y2="65" stroke={lineColors[0]} strokeWidth="1.5" strokeDasharray="3 3"/>
      <line x1="305" y1="65" x2="370" y2="65" stroke={lineColors[1]} strokeWidth="1.5" strokeDasharray="3 3"/>

      {nodes.map((node, i) => {
        const cx = [75, 250, 425][i];
        return (
          <g key={i}>
            <text x={cx} y="66" fill="white" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">{node.title}</text>
            <text x={cx} y="78" fill={node.subtitleColor} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">{node.subtitle}</text>
            <text x={cx} y="112" fill={node.labelColor} fontSize="8" fontFamily="var(--font-display)" textAnchor="middle">{node.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
