export interface BlogPost {
  id: string
  title: string
  description: string
  slug: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Calculate Your Age Accurately',
    description: 'Learn different methods to calculate your exact age including leap years and time zones.',
    slug: 'how-to-calculate-age',
    category: 'Tutorials',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-28',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/590570/pexels-photo-590570.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Understanding BMI and Health Metrics',
    description: 'A comprehensive guide to Body Mass Index, what it means, and how to maintain a healthy weight.',
    slug: 'understanding-bmi',
    category: 'Health',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-25',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Creating Strong Passwords in 2026',
    description: 'Best practices for password security and how to create unbreakable passwords.',
    slug: 'strong-passwords-guide',
    category: 'Security',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-20',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'QR Codes: Complete Guide for Beginners',
    description: 'Everything you need to know about QR codes, how they work, and best use cases.',
    slug: 'qr-codes-guide',
    category: 'Technology',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-15',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Base64 Encoding Explained: A Complete Tutorial',
    description: 'Learn what Base64 encoding is, why it\'s used, and how to encode/decode data effectively.',
    slug: 'base64-encoding-tutorial',
    category: 'Developer',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-10',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'URL Encoding: Everything You Need to Know',
    description: 'Master URL encoding and decoding to create safe, valid URLs for your web applications.',
    slug: 'url-encoding-guide',
    category: 'Developer',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-08',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos-196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '7',
    title: 'Hash Functions: Security and Data Integrity',
    description: 'Understanding cryptographic hash functions, their uses, and how they keep your data secure.',
    slug: 'hash-functions-guide',
    category: 'Security',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-05',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '8',
    title: 'Unit Conversion Made Easy: Complete Guide',
    description: 'Learn how to convert between different units of measurement accurately and efficiently.',
    slug: 'unit-conversion-guide',
    category: 'Tutorials',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-03',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/163117/calender-date-time-month-163117.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '9',
    title: 'JSON Formatting Best Practices',
    description: 'Master JSON formatting, validation, and best practices for clean, readable code.',
    slug: 'json-formatting-guide',
    category: 'Developer',
    author: 'SimpleWebToolsBox Team',
    date: '2026-01-01',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos-1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
  {
    id: '10',
    title: 'Text Case Conversion: When and How to Use',
    description: 'Learn about different text case formats and when to use each one in your projects.',
    slug: 'text-case-conversion-guide',
    category: 'Tutorials',
    author: 'SimpleWebToolsBox Team',
    date: '2025-12-28',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category)
}
