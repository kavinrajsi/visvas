// Detects bot-submitted gibberish names like "RrbGqRMqduFBlHVFMun": a single
// long token with random internal capitalisation and very few vowels.
//
// Conservative on purpose — all three signals must agree — so a real lead is
// not rejected. Whitespace-separated real names never trip it because each
// token is short and single-cased.

const MIN_LENGTH = 12
const MIN_CASE_TRANSITIONS = 4
const MAX_VOWEL_RATIO = 0.35

function isGibberishToken(token) {
  const letters = token.replace(/[^a-zA-Z]/g, '')
  if (letters.length < MIN_LENGTH) return false

  let transitions = 0
  for (let i = 1; i < letters.length; i++) {
    const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase()
    const currUpper = letters[i] === letters[i].toUpperCase()
    if (prevUpper !== currUpper) transitions++
  }
  if (transitions < MIN_CASE_TRANSITIONS) return false

  const vowels = (letters.match(/[aeiou]/gi) || []).length
  const vowelRatio = vowels / letters.length
  return vowelRatio < MAX_VOWEL_RATIO
}

export function looksLikeSpamName(name) {
  if (!name || typeof name !== 'string') return false
  return name.trim().split(/\s+/).some(isGibberishToken)
}
