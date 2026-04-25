/** FAQPage schema for the home route only (see app/(home)/layout.tsx). */
export const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SimpleWebToolsBox focused on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SimpleWebToolsBox focuses on practical guides and clearly explained resources in areas like finance, study, and technology. The goal is to publish useful content that helps people make sense of common topics without unnecessary filler.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who publishes the content on this site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The site is published and maintained by Mohd Washid under the SimpleWebToolsBox brand, with supporting policy, contact, and editorial pages available for transparency.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are the guides maintained?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Guides are reviewed and updated when examples, recommendations, or important context become outdated. The published set is intentionally smaller so the site can focus on quality and clarity.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact the site owner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can use the contact page to reach the publisher for questions, corrections, or business communication. Supporting trust pages like the editorial policy, disclaimer, and DMCA page are also available in the footer.',
      },
    },
  ],
} as const
