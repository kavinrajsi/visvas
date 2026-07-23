/**
 * Regenerates src/lib/security/torExitNodes.js from the official Tor exit list.
 *
 * The list is committed rather than fetched at build or request time: a build
 * would break if the Tor endpoint were down, and a per-request fetch would add
 * latency to every page. The trade-off is that the snapshot decays as exit
 * nodes rotate, so re-run this periodically:
 *
 *   node scripts/update-tor-exit-nodes.js
 */
import { writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const SOURCE = 'https://check.torproject.org/torbulkexitlist'
const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/lib/security/torExitNodes.js'
)

const IPV4 = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/

const run = async () => {
  const res = await fetch(SOURCE)
  if (!res.ok) throw new Error(`Tor list fetch failed: ${res.status}`)

  const ips = (await res.text())
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => IPV4.test(line))

  if (ips.length === 0) throw new Error('Tor list came back empty; refusing to write')

  const unique = [...new Set(ips)].sort()
  const body = unique.map((ip) => `  '${ip}',`).join('\n')

  const file = `// GENERATED FILE - DO NOT EDIT BY HAND.
// Tor exit nodes, from ${SOURCE}
// Regenerate with: node scripts/update-tor-exit-nodes.js
// Snapshot taken: ${new Date().toISOString().slice(0, 10)} (${unique.length} nodes)
//
// Exit nodes rotate, so this list goes stale. Re-run the script periodically.
const TOR_EXIT_NODES = new Set([
${body}
])

export function isTorExitNode(ip) {
  return TOR_EXIT_NODES.has(ip)
}

export const TOR_EXIT_NODE_COUNT = ${unique.length}
`

  await writeFile(OUT, file, 'utf8')
  console.log(`Wrote ${unique.length} Tor exit nodes to ${OUT}`)
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
