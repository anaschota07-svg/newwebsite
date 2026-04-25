/** Single @graph payload for <head> — avoids duplicate body JSON-LD from RSC streaming. */
export const siteAndOrganizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'SimpleWebToolsBox',
      url: 'https://simplewebtoolsbox.com',
      description:
        'Practical articles and free browser-based tools for everyday tasks, with clear ownership and policy pages.',
    },
    {
      '@type': 'Organization',
      name: 'SimpleWebToolsBox',
      url: 'https://simplewebtoolsbox.com',
      logo: 'https://simplewebtoolsbox.com/logo.png',
    },
  ],
} as const
