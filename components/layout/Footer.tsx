import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
  resources: [
    { name: 'All Tools', href: '/tools' },
    { name: 'How-To Guides', href: '/blog' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 group" aria-label="SimpleWebToolsBox Home">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10">
                <Image
                  src="/logo.png"
                  alt="SimpleWebToolsBox Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 36px, 40px"
                />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                SimpleWebToolsBox
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Free online tools and how-to guides to make your life easier. Simple, fast, and reliable.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            © {new Date().getFullYear()} SimpleWebToolsBox.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
