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

export const BLOG_AUTHOR = 'Mohd Washid'

export function normalizeBlogAuthor(author: string): string {
  return author === 'SimpleWebToolsBox Team' ? BLOG_AUTHOR : author
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Artificial Intelligence in 2026: Transforming Industries and Shaping the Future',
    description: 'A practical guide to how AI is being used in software, business, education, and everyday workflows, with a clearer view of where it genuinely helps and where caution still matters.',
    slug: 'artificial-intelligence-2026-guide',
    category: 'Technology',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-15',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
  },
  {
    id: '2',
    title: 'Cloud Computing Explained: AWS vs Azure vs Google Cloud - Complete Comparison',
    description: 'A practical comparison of AWS, Azure, and Google Cloud covering service models, tradeoffs, operational concerns, and how teams can choose the right platform more realistically.',
    slug: 'cloud-computing-comparison-2026',
    category: 'Technology',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-12',
    readTime: '14 min read',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  },
  {
    id: '3',
    title: 'Cybersecurity Best Practices: Protecting Your Digital Life from Threats',
    description: 'An essential guide to password safety, phishing prevention, software updates, backups, and the practical habits that reduce common digital security risks.',
    slug: 'cybersecurity-best-practices-2026',
    category: 'Technology',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-10',
    readTime: '13 min read',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
  },
  {
    id: '4',
    title: 'Digital Marketing 2026: Complete Guide to Online Business',
    description: 'A broad but practical introduction to SEO, social media, email, paid campaigns, and measurement for people trying to grow a website, product, or online business.',
    slug: 'digital-marketing-2026-guide',
    category: 'Technology',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-13',
    readTime: '16 min read',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  },
  {
    id: '5',
    title: 'Online Earning Guide: Make Money from Home',
    description: 'A grounded guide to freelancing, content businesses, affiliate marketing, courses, and other online income models, with realistic expectations instead of clickbait promises.',
    slug: 'online-earning-guide',
    category: 'Finance',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-11',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/259209/pexels-photo-259209.jpeg',
  },
  {
    id: '6',
    title: 'Credit Score Explained: How to Build and Maintain Excellent Credit',
    description: 'A practical guide to what credit scores signal, which habits affect them most, and how better credit improves borrowing flexibility and long-term cost.',
    slug: 'credit-score-guide-2026',
    category: 'Finance',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-14',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg',
  },
  {
    id: '7',
    title: 'Loan Calculator and Understanding Loan Calculations: EMI, Interest, and Repayment',
    description: 'A borrowing guide that explains EMI, total repayment, tenure tradeoffs, and how to compare loan offers more carefully before applying.',
    slug: 'loan-calculator-guide',
    category: 'Finance',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-08',
    readTime: '14 min read',
    image: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg',
  },
  {
    id: '8',
    title: 'Effective Study Techniques: Learn Faster and Retain Information Better',
    description: 'A focused guide to active recall, spaced repetition, the Feynman technique, interleaving, and sustainable routines that improve real retention.',
    slug: 'effective-study-techniques',
    category: 'Study',
    author: 'SimpleWebToolsBox Team',
    date: '2026-03-13',
    readTime: '14 min read',
    image: 'https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg',
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category)
}
