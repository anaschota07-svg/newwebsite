import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 transition-colors duration-300 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto transition-colors duration-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
        >
          <Home className="h-5 w-5 mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
