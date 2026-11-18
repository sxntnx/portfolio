// Generates public/og-image.png (1200x630) and public/apple-touch-icon.png from SVG.
// Run: npm run images
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const pub = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url))

const grid = Array.from({ length: 22 }, (_, i) => `<path d="M${i * 56} 0V630" />`).join('') +
  Array.from({ length: 12 }, (_, i) => `<path d="M0 ${i * 56}H1200" />`).join('')

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="fade" cx="35%" cy="45%" r="75%">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="m"><rect width="1200" height="630" fill="url(#fade)"/></mask>
    <radialGradient id="glow" cx="80%" cy="10%" r="50%">
      <stop offset="0" stop-color="#5DE4CC" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#5DE4CC" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#070A0B"/>
  <g stroke="#EEF3F2" stroke-opacity="0.06" mask="url(#m)">${grid}</g>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g font-family="Segoe UI, Arial, Helvetica, sans-serif">
    <rect x="80" y="96" width="350" height="42" rx="21" fill="#103D14" stroke="#5DE383" stroke-opacity="0.3"/>
    <circle cx="104" cy="117" r="6" fill="#5DE383"/>
    <text x="120" y="124" font-size="20" font-weight="600" fill="#5DE383">Open to remote junior roles</text>

    <text x="76" y="268" font-size="92" font-weight="700" letter-spacing="-3" fill="#EEF3F2">Santino Spelzini</text>
    <text x="80" y="336" font-size="38" font-weight="600" fill="#5DE4CC">Data Analyst · Aspiring Data Engineer</text>
    <text x="80" y="396" font-size="26" fill="#A0ADB1">SQL · Python ETL pipelines · Power BI dashboards</text>
  </g>

  <g font-family="Consolas, Menlo, monospace" font-size="19" letter-spacing="2.5" fill="#788B92">
    <text x="80" y="540">TUCUMÁN, ARGENTINA · GMT-3 · REMOTE · ENGLISH B2</text>
  </g>

  <g transform="translate(1000 500)">
    <rect width="104" height="66" rx="14" fill="#0D1214" stroke="#222B2F" stroke-width="2"/>
    <text x="44" y="45" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="-1.5" fill="#EEF3F2">SS</text>
    <circle cx="80" cy="41" r="5" fill="#5DE4CC"/>
  </g>
  <rect x="0" y="626" width="1200" height="4" fill="#5DE4CC"/>
</svg>`

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#070A0B"/>
  <text x="29" y="42" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="-1.5" fill="#EEF3F2">SS</text>
  <circle cx="50" cy="39" r="4" fill="#5DE4CC"/>
</svg>`

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(pub('og-image.png'))
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile(pub('apple-touch-icon.png'))
console.log('og-image.png + apple-touch-icon.png written to public/')
