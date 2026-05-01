/** Per Next.js JSON-LD guide: prevents `</script>`-style breaks in inline script bodies. */
export function stringifyJsonLd(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c')
}
