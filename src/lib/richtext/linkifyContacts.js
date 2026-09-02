/**
 * Walks a Payload Lexical rich-text tree and wraps plain-text phone numbers
 * and email addresses in `link` nodes (tel:/mailto:) so the standard
 * @payloadcms/richtext-lexical RichText converter renders them as anchors.
 *
 * Content authored in the admin is untouched; this is a render-time transform.
 */

const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g
// International (+91 95432 24411) or bare Indian 10-digit mobile (95432 24411).
const PHONE_RE = /\+\d{1,3}[\s-]?\d[\d\s-]{7,}\d|\b[6-9]\d{4}\s?\d{5}\b/g

const PATTERN = new RegExp(`${EMAIL_RE.source}|${PHONE_RE.source}`, 'g')

function makeLinkNode(text, url, sourceText) {
  return {
    type: 'link',
    version: 3,
    direction: 'ltr',
    format: '',
    indent: 0,
    fields: { linkType: 'custom', url, newTab: false },
    children: [{ ...sourceText, text }],
  }
}

function splitTextNode(node) {
  const text = node.text || ''
  const out = []
  let last = 0

  for (const match of text.matchAll(PATTERN)) {
    const value = match[0]
    const start = match.index
    // Trailing period is sentence punctuation, not part of an email.
    const clean = value.replace(/\.$/, '')
    const end = start + clean.length

    if (start > last) out.push({ ...node, text: text.slice(last, start) })

    const url = clean.includes('@')
      ? `mailto:${clean}`
      : `tel:${clean.replace(/[\s-]/g, '')}`

    out.push(makeLinkNode(clean, url, node))
    last = end
  }

  if (out.length === 0) return [node]
  if (last < text.length) out.push({ ...node, text: text.slice(last) })
  return out
}

function walk(node) {
  if (!node || typeof node !== 'object') return node
  // Don't re-link text already inside a link.
  if (node.type === 'link' || node.type === 'autolink') return node

  if (!Array.isArray(node.children)) return node

  const children = node.children.flatMap((child) =>
    child?.type === 'text' ? splitTextNode(child) : [walk(child)],
  )

  return { ...node, children }
}

export function linkifyContacts(content) {
  if (!content?.root) return content
  return { ...content, root: walk(content.root) }
}
