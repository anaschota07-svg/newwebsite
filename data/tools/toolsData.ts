export interface Tool {
  id: string
  name: string
  description: string
  category: string
  icon: string
  slug: string
}

export const toolsData: Tool[] = [
  {
    id: '1',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, and more with precision.',
    category: 'Calculator',
    icon: '🎂',
    slug: 'age-calculator',
  },
  {
    id: '2',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) and get health recommendations.',
    category: 'Health',
    icon: '⚖️',
    slug: 'bmi-calculator',
  },
  {
    id: '3',
    name: 'Text Case Converter',
    description: 'Convert text between uppercase, lowercase, title case, and more formats.',
    category: 'Text Tools',
    icon: '🔤',
    slug: 'text-case-converter',
  },
  {
    id: '4',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text instantly.',
    category: 'Text Tools',
    icon: '📝',
    slug: 'word-counter',
  },
  {
    id: '5',
    name: 'Password Generator',
    description: 'Generate strong, secure, and random passwords with customizable options.',
    category: 'Security',
    icon: '🔐',
    slug: 'password-generator',
  },
  {
    id: '6',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, text, and contact information.',
    category: 'Generator',
    icon: '📱',
    slug: 'qr-code-generator',
  },
  {
    id: '7',
    name: 'Color Picker',
    description: 'Pick colors and get HEX, RGB, HSL codes with a beautiful color palette.',
    category: 'Design',
    icon: '🎨',
    slug: 'color-picker',
  },
  {
    id: '8',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting.',
    category: 'Developer',
    icon: '{ }',
    slug: 'json-formatter',
  },
  {
    id: '9',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode text to Base64 format instantly. Perfect for data encoding.',
    category: 'Developer',
    icon: '🔢',
    slug: 'base64-encoder-decoder',
  },
  {
    id: '10',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs to handle special characters and spaces properly.',
    category: 'Developer',
    icon: '🔗',
    slug: 'url-encoder-decoder',
  },
  {
    id: '11',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-256, SHA-512, and other hash values from your text.',
    category: 'Security',
    icon: '🔑',
    slug: 'hash-generator',
  },
  {
    id: '12',
    name: 'UUID Generator',
    description: 'Generate unique UUIDs (v4) for your applications and databases.',
    category: 'Generator',
    icon: '🆔',
    slug: 'uuid-generator',
  },
  {
    id: '13',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in Lorem Ipsum format for your designs.',
    category: 'Text Tools',
    icon: '📄',
    slug: 'lorem-ipsum-generator',
  },
  {
    id: '14',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates and times.',
    category: 'Developer',
    icon: '⏰',
    slug: 'timestamp-converter',
  },
  {
    id: '15',
    name: 'Unit Converter',
    description: 'Convert between different units of length, weight, temperature, and more.',
    category: 'Calculator',
    icon: '📏',
    slug: 'unit-converter',
  },
  {
    id: '16',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease, and percentage of values.',
    category: 'Calculator',
    icon: '📊',
    slug: 'percentage-calculator',
  },
  {
    id: '17',
    name: 'Random Number Generator',
    description: 'Generate random numbers within a specified range with customizable options.',
    category: 'Generator',
    icon: '🎲',
    slug: 'random-number-generator',
  },
  {
    id: '18',
    name: 'Text to Binary',
    description: 'Convert text to binary code and binary code back to text instantly.',
    category: 'Developer',
    icon: '💻',
    slug: 'text-to-binary',
  },
  {
    id: '19',
    name: 'HTML Encoder/Decoder',
    description: 'Encode and decode HTML entities to safely display HTML in web pages.',
    category: 'Developer',
    icon: '🌐',
    slug: 'html-encoder-decoder',
  },
]

export const categories = Array.from(new Set(toolsData.map(tool => tool.category)))

export function getToolBySlug(slug: string): Tool | undefined {
  return toolsData.find(tool => tool.slug === slug)
}

export function getToolsByCategory(category: string): Tool[] {
  return toolsData.filter(tool => tool.category === category)
}
