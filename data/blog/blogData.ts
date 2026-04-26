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

export const BLOG_AUTHOR = 'SimpleWebToolsBox Team'

export function normalizeBlogAuthor(author: string): string {
  return author === 'SimpleWebToolsBox Team' ? BLOG_AUTHOR : author
}

export const blogPosts: BlogPost[] = [
  {
    id: '3',
    title: 'Cybersecurity Best Practices: Protecting Your Digital Life from Threats',
    description: 'An essential guide to password safety, phishing prevention, software updates, backups, and the practical habits that reduce common digital security risks.',
    slug: 'cybersecurity-best-practices-2026',
    category: 'Technology',
    author: BLOG_AUTHOR,
    date: '2026-03-10',
    readTime: '13 min read',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
  },
  {
    id: '9',
    title: 'Password Managers and Two-Factor Authentication: A Calm, Practical Guide',
    description:
      'How unique passwords and 2FA actually help, what to turn on first, and how to plan recovery without vendor hype or fake “99%” claims.',
    slug: 'password-managers-and-2fa-guide',
    category: 'Technology',
    author: BLOG_AUTHOR,
    date: '2026-04-20',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
  },
  {
    id: '10',
    title: 'Emergency Fund Basics: Building a Real Buffer Without a Magic Number',
    description:
      'A habits-first look at what an emergency fund is for, how to start without perfectionism, where to keep the money, and how to rebuild after you use it—without unsourced percentage promises.',
    slug: 'emergency-fund-basics-2026',
    category: 'Finance',
    author: BLOG_AUTHOR,
    date: '2026-04-24',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg',
  },
  {
    id: '11',
    title: 'Web Frameworks Comparison 2026: React, Vue, Angular, Svelte and More',
    description:
      'A practical comparison of the most-used web frameworks in 2026, covering architecture, learning curve, ecosystem maturity, and when each one is the more sensible choice for your project.',
    slug: 'web-frameworks-comparison-2026',
    category: 'Technology',
    author: BLOG_AUTHOR,
    date: '2026-04-10',
    readTime: '14 min read',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  },
  {
    id: '12',
    title: 'How to Convert Images to WebP for Free (Beginner-Friendly Guide)',
    description:
      'A practical step-by-step guide to converting images to WebP for free using online tools and built-in options, with real compatibility tips for WordPress and custom websites.',
    slug: 'how-to-convert-image-to-webp-for-free',
    category: 'Technology',
    author: BLOG_AUTHOR,
    date: '2026-04-26',
    readTime: '13 min read',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
  },
  {
    id: '13',
    title: 'Why Is My Website Slow? A Practical 2025 Speed Fix Guide',
    description:
      'A practical guide to diagnosing and fixing slow websites in 2025, including Core Web Vitals, testing tools, and a step-by-step optimisation checklist.',
    slug: 'why-is-my-website-slow-2025',
    category: 'Technology',
    author: BLOG_AUTHOR,
    date: '2026-04-26',
    readTime: '14 min read',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
  },
  {
    id: '14',
    title: 'How to Check Website Security: Free Tools and Practical Fixes',
    description:
      'A complete website security guide covering free security audits, critical checks, common vulnerabilities, and a practical hardening checklist for site owners.',
    slug: 'how-to-check-website-security',
    category: 'Technology',
    author: BLOG_AUTHOR,
    date: '2026-04-26',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
  },
  {
    id: '15',
    title: 'How Hackers Crack Weak Passwords And How to Prevent It',
    description:
      'A practical deep-dive on brute force, credential stuffing, phishing, keyloggers, and modern prevention steps for users and website owners.',
    slug: 'how-hackers-crack-weak-passwords-and-how-to-prevent-it',
    category: 'Technology',
    author: BLOG_AUTHOR,
    date: '2026-04-26',
    readTime: '18 min read',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category)
}
