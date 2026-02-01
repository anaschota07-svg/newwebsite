import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'
import { getBlogPostBySlug, blogPosts } from '@/data/blog/blogData'
import AdSense from '@/components/AdSense'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

// Blog content with images
const blogContent: { [key: string]: { sections: { heading: string; content: string; image?: string }[] } } = {
  'how-to-calculate-age': {
    sections: [
      {
        heading: 'Understanding Age Calculation',
        content: 'Calculating age might seem simple at first glance, but accurate age calculation requires consideration of several factors including leap years, different month lengths, and even time zones in some cases. Our Age Calculator tool handles all these complexities automatically, but understanding the underlying principles can help you appreciate the accuracy of the results.',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&h=600&fit=crop',
      },
      {
        heading: 'The Basic Method',
        content: 'The most straightforward method involves subtracting your birth date from the current date. However, this simple subtraction doesn\'t account for the fact that not all years have the same number of days. Leap years, which occur every four years (with exceptions for century years), add an extra day to February, making the calculation more complex.',
      },
      {
        heading: 'Accounting for Leap Years',
        content: 'Leap years are crucial for accurate age calculation. A year is a leap year if it\'s divisible by 4, except for years divisible by 100 (unless they\'re also divisible by 400). For example, 2000 was a leap year, but 1900 wasn\'t. Our calculator automatically accounts for all leap years between your birth date and today.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Months and Days Calculation',
        content: 'When calculating the months and days component of your age, we need to consider that different months have different numbers of days. If the current day is less than your birth day, we borrow from the previous month. This ensures that your age is always accurate to the exact day.',
      },
      {
        heading: 'Total Days and Weeks',
        content: 'Beyond years, months, and days, it\'s interesting to know your total age in other units. To calculate total days, we account for every leap year between your birth and today. Total weeks are simply total days divided by 7. These metrics give you a different perspective on your lifespan.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      },
    ],
  },
  'understanding-bmi': {
    sections: [
      {
        heading: 'What is BMI?',
        content: 'Body Mass Index (BMI) is a numerical value derived from your height and weight. It\'s widely used as a screening tool to categorize individuals into different weight status categories. While BMI has limitations, it remains a useful starting point for understanding your weight in relation to your height.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
      },
      {
        heading: 'How BMI is Calculated',
        content: 'BMI is calculated using a simple formula: weight (kg) divided by height (m) squared, or BMI = kg/m². For imperial measurements, the formula is: (weight in pounds / (height in inches)²) × 703. This standardized calculation allows for consistent comparisons across different populations.',
      },
      {
        heading: 'BMI Categories',
        content: 'The WHO classifies BMI into several categories: Underweight (< 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), and Obese (≥ 30). These categories help identify potential health risks associated with being underweight or overweight. However, it\'s important to remember that BMI is just one indicator of health.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Limitations of BMI',
        content: 'BMI doesn\'t distinguish between muscle and fat mass. Athletes with high muscle mass may have a high BMI but low body fat. Similarly, elderly individuals may have normal BMI but high body fat percentage due to loss of muscle mass. BMI also doesn\'t account for fat distribution, which is important for health risk assessment.',
      },
      {
        heading: 'Using BMI Effectively',
        content: 'BMI is best used as a screening tool, not a diagnostic tool. If your BMI is outside the normal range, consult with a healthcare provider who can perform more comprehensive assessments including body composition analysis, waist circumference, and evaluation of other health markers.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
      },
    ],
  },
  'strong-passwords-guide': {
    sections: [
      {
        heading: 'Why Strong Passwords Matter',
        content: 'In 2026, cybersecurity threats are more sophisticated than ever. Weak passwords are like leaving your front door unlocked. Hackers use advanced techniques including brute force attacks, dictionary attacks, and credential stuffing to gain unauthorized access. A strong password is your first line of defense.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Characteristics of Strong Passwords',
        content: 'Strong passwords should be at least 12 characters long, combining uppercase and lowercase letters, numbers, and special symbols. Avoid common words, personal information, and predictable patterns. The more random and complex your password, the harder it is to crack.',
        image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&h=600&fit=crop',
      },
      {
        heading: 'The Length vs Complexity Debate',
        content: 'Recent security research suggests that password length is more important than complexity. A 16-character password of random words is generally stronger than an 8-character password with special characters. However, the best approach combines both length and complexity.',
      },
      {
        heading: 'Password Management Best Practices',
        content: 'Never reuse passwords across different accounts. If one account is compromised, all accounts with the same password are at risk. Consider using a password manager to generate and securely store unique passwords for each account. Enable two-factor authentication (2FA) whenever possible for an extra layer of security.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Using Password Generators',
        content: 'Our Password Generator tool creates truly random passwords that are difficult to crack. You can customize the length and character types to meet specific requirements. The tool also provides a strength indicator to help you understand how secure your password is.',
      },
    ],
  },
  'qr-codes-guide': {
    sections: [
      {
        heading: 'What are QR Codes?',
        content: 'QR (Quick Response) codes are two-dimensional barcodes that can store various types of information including URLs, text, contact information, and more. Invented in 1994, QR codes have become ubiquitous in our digital age, offering a quick way to share information that can be instantly scanned by smartphones.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      },
      {
        heading: 'How QR Codes Work',
        content: 'QR codes encode data in a pattern of black squares on a white background. The three large squares in the corners help scanners detect and orient the code. The patterns encode data using binary, with error correction built in to ensure the code can be read even if partially damaged.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Common Uses of QR Codes',
        content: 'QR codes are incredibly versatile. Businesses use them for marketing campaigns, restaurants for contactless menus, event organizers for ticketing, and retail stores for product information. During the pandemic, QR codes became essential for contact tracing and touchless interactions.',
      },
      {
        heading: 'Creating Effective QR Codes',
        content: 'When creating QR codes, consider the context of use. Ensure sufficient contrast between the code and background. Test your QR codes on multiple devices before distributing them. Keep URLs short to create simpler codes that are easier to scan. Always verify that your QR code works before printing or publishing.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      },
      {
        heading: 'QR Code Security',
        content: 'While QR codes are convenient, they can be exploited for malicious purposes. Never scan QR codes from untrusted sources. Be cautious of QR codes in public places that could have been tampered with. Our QR Code Generator creates safe, transparent codes that link exactly where you specify.',
      },
    ],
  },
  'base64-encoding-tutorial': {
    sections: [
      {
        heading: 'What is Base64 Encoding?',
        content: 'Base64 is an encoding scheme that converts binary data into ASCII text format. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent binary data. This encoding is essential when you need to transmit binary data over text-based protocols like email, HTTP, or store binary data in text formats like JSON or XML.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Why Use Base64?',
        content: 'Base64 encoding is commonly used for encoding email attachments, embedding images in HTML/CSS, storing binary data in databases, and transmitting data over APIs. It ensures that binary data can be safely transmitted without corruption or modification.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
      },
      {
        heading: 'How Base64 Works',
        content: 'Base64 encoding takes every 3 bytes of binary data and converts them into 4 ASCII characters. The encoding process groups the input bytes into 24-bit chunks, then splits each chunk into four 6-bit values. Each 6-bit value is mapped to one of 64 characters in the Base64 alphabet.',
      },
      {
        heading: 'Common Use Cases',
        content: 'Base64 is widely used in web development for data URLs (embedding images directly in HTML), encoding credentials for HTTP Basic Authentication, storing binary data in JSON, and encoding email attachments. Our Base64 Encoder/Decoder tool makes it easy to encode and decode data instantly.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      },
    ],
  },
  'url-encoding-guide': {
    sections: [
      {
        heading: 'Understanding URL Encoding',
        content: 'URL encoding, also known as percent encoding, converts special characters and spaces in URLs into a format that can be safely transmitted over the internet. This is essential because URLs can only contain a limited set of characters, and special characters have specific meanings in URLs.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Why URL Encoding is Necessary',
        content: 'URLs can only contain ASCII characters. Special characters like spaces, ampersands, and non-ASCII characters must be encoded. For example, a space becomes %20, and an ampersand becomes %26. This prevents URLs from breaking and ensures proper parsing by web servers and browsers.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Common Encoded Characters',
        content: 'Some common URL encodings include: space (%20), ampersand (%26), plus sign (%2B), equals sign (%3D), question mark (%3F), and hash (%23). Understanding these encodings helps you create valid URLs and debug URL-related issues in your applications.',
      },
      {
        heading: 'Best Practices',
        content: 'Always encode user input before including it in URLs. Use proper encoding functions provided by your programming language rather than manually encoding. Be aware that some characters like letters, numbers, and certain symbols don\'t need encoding. Our URL Encoder/Decoder tool helps you encode and decode URLs quickly and accurately.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
      },
    ],
  },
  'hash-functions-guide': {
    sections: [
      {
        heading: 'What are Hash Functions?',
        content: 'Hash functions are one-way mathematical functions that convert input data of any size into a fixed-size string of characters. The output, called a hash or digest, is unique to the input data. Even a small change in the input produces a completely different hash.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Types of Hash Functions',
        content: 'Common hash algorithms include MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), and SHA-512 (512-bit). SHA-256 and SHA-512 are currently recommended for security applications, while MD5 and SHA-1 are considered deprecated due to vulnerabilities.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Applications of Hash Functions',
        content: 'Hash functions are used for password storage, data integrity verification, digital signatures, blockchain technology, and checksums. They ensure data hasn\'t been tampered with and provide a way to verify authenticity without storing the original data.',
      },
      {
        heading: 'Security Considerations',
        content: 'For security applications, always use modern hash functions like SHA-256 or SHA-512. Never use MD5 or SHA-1 for new security applications. When storing passwords, use salted hashes and consider using key derivation functions like bcrypt or Argon2. Our Hash Generator tool supports multiple hash algorithms for your needs.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop',
      },
    ],
  },
  'unit-conversion-guide': {
    sections: [
      {
        heading: 'Understanding Unit Conversion',
        content: 'Unit conversion is the process of converting a quantity from one unit of measurement to another. This is essential in science, engineering, cooking, travel, and everyday life. Understanding conversion factors helps you work with measurements from different systems.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Length Conversions',
        content: 'Common length conversions include meters to feet, kilometers to miles, and centimeters to inches. The metric system uses base-10 conversions (1 meter = 100 centimeters), while imperial conversions require specific factors (1 foot = 12 inches, 1 mile = 5280 feet).',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Weight Conversions',
        content: 'Weight conversions between metric (kilograms, grams) and imperial (pounds, ounces) systems are common. One kilogram equals approximately 2.20462 pounds, and one pound equals 16 ounces. Accurate conversions are crucial for recipes, shipping, and scientific calculations.',
      },
      {
        heading: 'Temperature Conversions',
        content: 'Temperature conversions between Celsius, Fahrenheit, and Kelvin require specific formulas. Celsius to Fahrenheit: F = (C × 9/5) + 32. Fahrenheit to Celsius: C = (F - 32) × 5/9. Kelvin is used in scientific contexts and is Celsius + 273.15. Our Unit Converter tool handles all these conversions instantly.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
      },
    ],
  },
  'json-formatting-guide': {
    sections: [
      {
        heading: 'What is JSON?',
        content: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It\'s widely used for transmitting data between servers and web applications, and for configuration files.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      },
      {
        heading: 'JSON Formatting Best Practices',
        content: 'Well-formatted JSON uses proper indentation (typically 2 spaces), consistent quote styles, and logical structure. Proper formatting improves readability, makes debugging easier, and helps with version control. Always validate JSON before using it in production applications.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Minifying vs Formatting',
        content: 'JSON can be formatted (beautified) for readability or minified (compressed) for production. Formatted JSON is easier to read and debug, while minified JSON reduces file size and improves transmission speed. Our JSON Formatter tool can do both, plus validate your JSON syntax.',
      },
      {
        heading: 'Common JSON Errors',
        content: 'Common JSON errors include trailing commas, unquoted keys, single quotes instead of double quotes, and comments (which JSON doesn\'t support). Always use a JSON validator to catch these errors before they cause problems in your application. Our tool highlights errors and provides helpful error messages.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      },
    ],
  },
  'text-case-conversion-guide': {
    sections: [
      {
        heading: 'Understanding Text Case Formats',
        content: 'Text case conversion involves changing the capitalization of text. Common formats include uppercase (ALL CAPS), lowercase (all lowercase), title case (Each Word Capitalized), sentence case (First word capitalized), camelCase, and snake_case. Each format has specific use cases in programming and writing.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop',
      },
      {
        heading: 'When to Use Each Case',
        content: 'Uppercase is used for emphasis or constants. Lowercase is standard for most text. Title case is used for headings and titles. CamelCase is common in programming for variable names. Snake_case is used in Python and database naming. Sentence case is standard for paragraphs.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop',
      },
      {
        heading: 'Programming Conventions',
        content: 'Different programming languages have different naming conventions. JavaScript uses camelCase for variables, Python uses snake_case, and CSS uses kebab-case. Understanding these conventions helps you write code that follows best practices and is easier to read and maintain.',
      },
      {
        heading: 'Using Our Text Case Converter',
        content: 'Our Text Case Converter tool supports all major case formats and provides instant conversion. It\'s perfect for formatting code, preparing text for different contexts, and learning about different case conventions. The tool also provides real-time statistics about your text.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop',
      },
    ],
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const content = blogContent[slug]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors duration-300 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl mb-8 overflow-hidden shadow-2xl">
          {post.image.startsWith('http') ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
          )}
        </div>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium transition-colors duration-300">
              {post.category}
            </span>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
            {post.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        <AdSense format="horizontal" />

        {/* Post Content */}
        {content && (
          <div className="prose prose-lg dark:prose-invert max-w-none my-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 space-y-12 transition-colors duration-300">
              {content.sections.map((section, index) => (
                <section key={index} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                    {section.heading}
                  </h2>
                  {section.image && (
                    <div className="relative w-full h-80 rounded-xl overflow-hidden my-6 shadow-lg">
                      <Image
                        src={section.image}
                        alt={section.heading}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 1200px"
                      />
                    </div>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg transition-colors duration-300">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>
          </div>
        )}

        <AdSense format="horizontal" />

        {/* Conclusion */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 my-12 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Conclusion</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            We hope this guide has been helpful! For more tutorials and tips, explore our other blog posts. 
            Don't forget to check out our free online tools to put this knowledge into practice.
          </p>
        </div>

        {/* Related Posts */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 card-hover transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {relatedPost.image.startsWith('http') ? (
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium mb-2 transition-colors duration-300">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{relatedPost.readTime}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </div>
  )
}
