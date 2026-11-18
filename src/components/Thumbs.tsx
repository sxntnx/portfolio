import type { ThumbKind } from '../data/content'

// Abstract on-brand visuals for project cards (no screenshots available yet).
const A = '#5DE4CC'
const L = '#222B2F'
const S = '#121A1D'
const M = '#788B92'

function Pipeline() {
  return (
    <g>
      {/* raw source */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={36} y={58 + i * 22} width={64} height={12} rx={3} fill={S} stroke={L} />
      ))}
      <path d="M108 103 H150" stroke={M} strokeDasharray="3 4" />
      {/* transform box */}
      <rect x={154} y={74} width={84} height={58} rx={8} fill={S} stroke={L} />
      <path d="M170 94 h52 M170 104 h38 M170 114 h46" stroke={M} strokeWidth={2} strokeLinecap="round" />
      <path d="M246 103 H286" stroke={A} />
      {/* star schema */}
      <rect x={300} y={84} width={56} height={38} rx={6} fill="#102621" stroke={A} />
      <text x={328} y={107} textAnchor="middle" fontSize={10} fontFamily="monospace" fill={A}>FACT</text>
      <path d="M356 94 L388 66 M356 112 L388 140" stroke={A} strokeOpacity={0.6} />
      <rect x={386} y={52} width={44} height={28} rx={5} fill={S} stroke={L} />
      <rect x={386} y={126} width={44} height={28} rx={5} fill={S} stroke={L} />
      <text x={408} y={70} textAnchor="middle" fontSize={8.5} fontFamily="monospace" fill={M}>DIM</text>
      <text x={408} y={144} textAnchor="middle" fontSize={8.5} fontFamily="monospace" fill={M}>DIM</text>
    </g>
  )
}

function Rag() {
  const pts = [
    [70, 70], [96, 120], [120, 84], [150, 140], [178, 62], [210, 112], [240, 150], [262, 76], [300, 128], [332, 92], [360, 148], [392, 70],
  ]
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill={i === 5 || i === 9 ? A : M} fillOpacity={i === 5 || i === 9 ? 1 : 0.5} />
      ))}
      <circle cx={262} cy={110} r={44} fill="none" stroke={A} strokeOpacity={0.5} strokeDasharray="4 5" />
      <path d="M262 110 L210 112 M262 110 L332 92" stroke={A} strokeOpacity={0.8} />
      <rect x={250} y={98} width={24} height={24} rx={6} fill="#102621" stroke={A} />
      <text x={262} y={114} textAnchor="middle" fontSize={10} fontFamily="monospace" fill={A}>Q</text>
      <rect x={60} y={160} width={140} height={16} rx={4} fill={S} stroke={L} />
      <text x={70} y={171.5} fontSize={8.5} fontFamily="monospace" fill={M}>[source: doc_04 §2]</text>
    </g>
  )
}

function Bars() {
  const h = [62, 88, 54, 104, 76, 118, 94, 70]
  return (
    <g>
      <path d="M50 166 H420" stroke={L} />
      {h.map((v, i) => (
        <rect key={i} x={62 + i * 44} y={166 - v} width={26} height={v} rx={3} fill={i === 5 ? A : S} stroke={i === 5 ? A : L} />
      ))}
      <path d="M50 76 H420" stroke={A} strokeOpacity={0.45} strokeDasharray="4 5" />
      <rect x={52} y={36} width={74} height={22} rx={5} fill="#102621" stroke={A} strokeOpacity={0.6} />
      <text x={89} y={51} textAnchor="middle" fontSize={9.5} fontFamily="monospace" fill={A}>OTIF</text>
    </g>
  )
}

function Trend() {
  return (
    <g>
      {[60, 95, 130, 165].map((y) => (
        <path key={y} d={`M50 ${y} H420`} stroke={L} />
      ))}
      <path d="M50 150 L95 138 L140 142 L185 112 L230 120 L275 92 L320 98 L365 64 L410 52" fill="none" stroke={A} strokeWidth={2.2} />
      <path d="M50 150 L95 138 L140 142 L185 112 L230 120 L275 92 L320 98 L365 64 L410 52 V166 H50 Z" fill={A} fillOpacity={0.07} />
      <path d="M50 158 L95 154 L140 156 L185 140 L230 146 L275 128 L320 132 L365 112 L410 104" fill="none" stroke={M} strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="4 4" />
      {[365, 410].map((x, i) => (
        <circle key={x} cx={x} cy={i ? 52 : 64} r={4} fill={A} />
      ))}
    </g>
  )
}

const MAP: Record<ThumbKind, () => React.JSX.Element> = { pipeline: Pipeline, rag: Rag, bars: Bars, trend: Trend }

export function Thumb({ kind }: { kind: ThumbKind }) {
  const C = MAP[kind]
  return (
    <svg viewBox="0 0 470 200" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`g-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="#EEF3F2" strokeOpacity="0.035" />
        </pattern>
      </defs>
      <rect width="470" height="200" fill="#0A0F11" />
      <rect width="470" height="200" fill={`url(#g-${kind})`} />
      <C />
    </svg>
  )
}
