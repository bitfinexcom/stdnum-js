/**
 * Format in a standard format, substitue '?' for the input characters in order
 *   eg.
 *   "???-??-????", "99922333" => "999-22-3333"
 */
export function formatPattern(pattern, input) {
  const values = input.split('')

  return pattern
    .split('')
    .map((c) => {
      if (c === '?') {
        return values.shift()
      }
      return c
    })
    .join('')
}
