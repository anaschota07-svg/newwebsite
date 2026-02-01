import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getToolBySlug, toolsData } from '@/data/tools/toolsData'
import AgeCalculator from '@/components/tools/AgeCalculator'
import BMICalculator from '@/components/tools/BMICalculator'
import TextCaseConverter from '@/components/tools/TextCaseConverter'
import WordCounter from '@/components/tools/WordCounter'
import PasswordGenerator from '@/components/tools/PasswordGenerator'
import QRCodeGenerator from '@/components/tools/QRCodeGenerator'
import ColorPicker from '@/components/tools/ColorPicker'
import JSONFormatter from '@/components/tools/JSONFormatter'
import Base64EncoderDecoder from '@/components/tools/Base64EncoderDecoder'
import URLEncoderDecoder from '@/components/tools/URLEncoderDecoder'
import HashGenerator from '@/components/tools/HashGenerator'
import UUIDGenerator from '@/components/tools/UUIDGenerator'
import LoremIpsumGenerator from '@/components/tools/LoremIpsumGenerator'
import TimestampConverter from '@/components/tools/TimestampConverter'
import UnitConverter from '@/components/tools/UnitConverter'
import PercentageCalculator from '@/components/tools/PercentageCalculator'
import RandomNumberGenerator from '@/components/tools/RandomNumberGenerator'
import TextToBinary from '@/components/tools/TextToBinary'
import HTMLEncoderDecoder from '@/components/tools/HTMLEncoderDecoder'
import AdPlaceholder from '@/components/AdPlaceholder'

export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  return {
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
  }
}

const toolComponents: { [key: string]: React.ComponentType } = {
  'age-calculator': AgeCalculator,
  'bmi-calculator': BMICalculator,
  'text-case-converter': TextCaseConverter,
  'word-counter': WordCounter,
  'password-generator': PasswordGenerator,
  'qr-code-generator': QRCodeGenerator,
  'color-picker': ColorPicker,
  'json-formatter': JSONFormatter,
  'base64-encoder-decoder': Base64EncoderDecoder,
  'url-encoder-decoder': URLEncoderDecoder,
  'hash-generator': HashGenerator,
  'uuid-generator': UUIDGenerator,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'timestamp-converter': TimestampConverter,
  'unit-converter': UnitConverter,
  'percentage-calculator': PercentageCalculator,
  'random-number-generator': RandomNumberGenerator,
  'text-to-binary': TextToBinary,
  'html-encoder-decoder': HTMLEncoderDecoder,
}

const toolContent: { [key: string]: { about: string; howTo: string[]; features: string[] } } = {
  'age-calculator': {
    about: 'Our Age Calculator is a powerful and precise tool that helps you calculate your exact age in years, months, days, and even weeks. Whether you need to know your age for official documents, planning celebrations, or just out of curiosity, this tool provides accurate results instantly. The calculator takes into account leap years and different month lengths to give you the most accurate age calculation possible.',
    howTo: [
      'Select your birth date using the date picker',
      'Click the "Calculate Age" button',
      'View your age in years, months, and days',
      'See additional statistics like total days and weeks lived',
    ],
    features: [
      'Accurate age calculation including leap years',
      'Display age in multiple formats',
      'Calculate total days, weeks, and months',
      'Easy-to-use interface',
      'Instant results',
      'Works completely offline',
    ],
  },
  'bmi-calculator': {
    about: 'The BMI (Body Mass Index) Calculator is a health assessment tool that helps you determine your body mass index and understand your weight category. BMI is a widely used indicator of healthy body weight based on your height and weight. This calculator supports both metric (kg, cm) and imperial (lbs, inches) units, making it convenient for users worldwide. Along with your BMI score, you\'ll receive health recommendations and understand where you fall in the BMI spectrum.',
    howTo: [
      'Choose your preferred unit system (Metric or Imperial)',
      'Enter your weight in kilograms or pounds',
      'Enter your height in centimeters or inches',
      'Click "Calculate BMI" to see your results',
      'Review your BMI category and health recommendations',
    ],
    features: [
      'Support for both metric and imperial units',
      'Instant BMI calculation',
      'Color-coded BMI categories',
      'Personalized health recommendations',
      'BMI range reference chart',
      'Easy unit switching',
    ],
  },
  'text-case-converter': {
    about: 'The Text Case Converter is a versatile tool for transforming text between different case formats. Whether you\'re a developer needing camelCase or snake_case, a writer formatting titles, or anyone working with text, this tool makes case conversion effortless. It supports multiple case styles including uppercase, lowercase, title case, sentence case, camelCase, and snake_case. The tool also provides real-time text statistics to help you understand your content better.',
    howTo: [
      'Paste or type your text in the text area',
      'Choose your desired case format by clicking one of the buttons',
      'View the converted text instantly',
      'Use the Copy button to copy the result to your clipboard',
      'Clear the text when you\'re done',
    ],
    features: [
      'Multiple case conversion options',
      'Real-time text statistics',
      'Character and word count',
      'One-click copy to clipboard',
      'Support for all case styles',
      'Fast and efficient processing',
    ],
  },
  'word-counter': {
    about: 'The Word Counter is an essential tool for writers, students, content creators, and anyone who works with text. It provides detailed statistics about your text including word count, character count (with and without spaces), sentence count, paragraph count, and even estimated reading time. This tool is perfect for checking essay lengths, social media post limits, blog post sizes, or any situation where you need to know detailed text metrics.',
    howTo: [
      'Type or paste your text into the text area',
      'View real-time statistics as you type',
      'Check word count, character count, and more',
      'Review the estimated reading time',
      'Copy or clear your text as needed',
    ],
    features: [
      'Real-time word and character counting',
      'Count characters with and without spaces',
      'Sentence and paragraph counting',
      'Reading time estimation',
      'Line count tracking',
      'No character limit',
    ],
  },
  'password-generator': {
    about: 'Create strong, secure passwords with our Password Generator tool. In today\'s digital age, having strong and unique passwords for each account is crucial for online security. This tool generates random passwords based on your preferences, including length and character types. You can customize passwords to include uppercase letters, lowercase letters, numbers, and special symbols. The tool also provides a real-time password strength indicator to help you create the most secure passwords possible.',
    howTo: [
      'Select your desired password length (8-32 characters)',
      'Choose which character types to include',
      'Click "Generate Password" to create a new password',
      'Review the password strength indicator',
      'Copy the password using the copy button',
      'Generate multiple passwords until you find one you like',
    ],
    features: [
      'Customizable password length',
      'Multiple character type options',
      'Real-time strength indicator',
      'One-click copy to clipboard',
      'Security tips and best practices',
      'Generate unlimited passwords',
    ],
  },
  'qr-code-generator': {
    about: 'Our QR Code Generator creates high-quality QR codes for any text, URL, or information you need to share. QR codes are perfect for business cards, marketing materials, event tickets, WiFi sharing, and much more. Simply enter your text or URL, generate the QR code, and download it for use anywhere. The generated QR codes are in PNG format and can be easily scanned by any smartphone or QR code reader.',
    howTo: [
      'Enter the text, URL, or information you want to encode',
      'Click "Generate QR Code"',
      'Preview your QR code',
      'Download the QR code as a PNG image',
      'Use the QR code in your projects or materials',
    ],
    features: [
      'Generate QR codes for any text or URL',
      'High-quality PNG output',
      'Instant QR code generation',
      'One-click download',
      'Compatible with all QR code readers',
      'No size or usage limits',
    ],
  },
  'color-picker': {
    about: 'The Color Picker tool is perfect for designers, developers, and anyone working with colors. Pick any color and instantly get its HEX, RGB, and HSL values. The tool also generates a beautiful color palette with lighter and darker shades of your selected color, making it easy to create harmonious color schemes for your projects. Copy any color code with a single click and use it in your CSS, design software, or anywhere else you need it.',
    howTo: [
      'Click on the color picker to select a color',
      'View the color in HEX, RGB, and HSL formats',
      'Copy any color code by clicking the copy button',
      'Explore the generated color palette',
      'Click on any shade to use it as your base color',
    ],
    features: [
      'Visual color picker interface',
      'HEX, RGB, and HSL color codes',
      'Automatic palette generation',
      'One-click color code copying',
      'Lighter and darker shade suggestions',
      'Real-time color preview',
    ],
  },
  'json-formatter': {
    about: 'The JSON Formatter is an essential tool for developers working with JSON data. It helps you format, beautify, minify, and validate JSON code. Whether you\'re debugging API responses, cleaning up configuration files, or just trying to make JSON more readable, this tool has you covered. It includes error detection and helpful error messages to help you fix invalid JSON quickly. The tool works entirely in your browser, so your data stays private and secure.',
    howTo: [
      'Paste your JSON code into the input area',
      'Click "Format" to beautify and indent the JSON',
      'Use "Minify" to compress the JSON',
      'Click "Validate" to check for errors',
      'Copy the formatted output to your clipboard',
    ],
    features: [
      'Format and beautify JSON',
      'Minify JSON for production',
      'Validate JSON syntax',
      'Detailed error messages',
      'Syntax highlighting',
      'One-click copy functionality',
    ],
  },
  'base64-encoder-decoder': {
    about: 'Base64 Encoder/Decoder is a powerful tool for encoding and decoding text data. Base64 encoding converts binary data into ASCII text format, making it safe for transmission over text-based protocols. This tool is essential for developers working with APIs, email attachments, data URLs, and any scenario where binary data needs to be represented as text.',
    howTo: [
      'Select Encode or Decode mode',
      'Enter your text or Base64 string',
      'Click the convert button',
      'Copy the result to your clipboard',
    ],
    features: [
      'Encode text to Base64',
      'Decode Base64 to text',
      'One-click copy functionality',
      'Instant conversion',
      'Works with any text data',
      'No data leaves your device',
    ],
  },
  'url-encoder-decoder': {
    about: 'URL Encoder/Decoder helps you safely encode and decode URLs. URL encoding converts special characters, spaces, and non-ASCII characters into percent-encoded values that can be safely transmitted over the internet. This tool is essential for web developers, API integration, and creating valid URLs with special characters.',
    howTo: [
      'Select Encode or Decode mode',
      'Enter your URL or encoded string',
      'Click the convert button',
      'Copy the result to your clipboard',
    ],
    features: [
      'Encode URLs with special characters',
      'Decode URL-encoded strings',
      'Handle spaces and special characters',
      'One-click copy functionality',
      'Instant conversion',
      'Safe for all URL formats',
    ],
  },
  'hash-generator': {
    about: 'Hash Generator creates cryptographic hash values from your input text. Hash functions are one-way functions that convert data into fixed-size strings. This tool supports multiple hash algorithms including MD5, SHA-1, SHA-256, and SHA-512. Hashes are commonly used for data integrity verification, password storage, and digital signatures.',
    howTo: [
      'Enter the text you want to hash',
      'Click "Generate Hashes"',
      'View all generated hash values',
      'Copy any hash value to your clipboard',
    ],
    features: [
      'Multiple hash algorithms (MD5, SHA-1, SHA-256, SHA-512)',
      'Instant hash generation',
      'One-click copy for each hash',
      'Secure client-side processing',
      'No data transmission',
      'Perfect for development and testing',
    ],
  },
  'uuid-generator': {
    about: 'UUID Generator creates unique identifiers for your applications. UUIDs (Universally Unique Identifiers) are 128-bit identifiers that are unique across time and space. This tool generates version 4 (random) UUIDs that are perfect for databases, distributed systems, and any application requiring unique identifiers.',
    howTo: [
      'Enter the number of UUIDs to generate',
      'Click "Generate UUIDs"',
      'View all generated UUIDs',
      'Copy individual UUIDs or all at once',
    ],
    features: [
      'Generate multiple UUIDs at once',
      'Version 4 (random) UUIDs',
      'Copy individual or all UUIDs',
      'Standard UUID format',
      'Extremely low collision probability',
      'Perfect for database keys',
    ],
  },
  'lorem-ipsum-generator': {
    about: 'Lorem Ipsum Generator creates placeholder text for your designs and mockups. Lorem Ipsum is the standard placeholder text used in the design and publishing industries. This tool lets you generate words, sentences, or paragraphs of Lorem Ipsum text to fill your designs without relying on meaningful content.',
    howTo: [
      'Select type (Words, Sentences, or Paragraphs)',
      'Enter the count you need',
      'Click "Generate Lorem Ipsum"',
      'Copy the generated text',
    ],
    features: [
      'Generate words, sentences, or paragraphs',
      'Customizable count',
      'One-click copy functionality',
      'Standard Lorem Ipsum text',
      'Perfect for design mockups',
      'No character limits',
    ],
  },
  'timestamp-converter': {
    about: 'Timestamp Converter converts between Unix timestamps and human-readable dates. Unix timestamps represent the number of seconds since January 1, 1970 (Unix epoch). This tool is essential for developers working with APIs, databases, and any system that uses Unix timestamps for date/time storage.',
    howTo: [
      'Select conversion direction (Timestamp to Date or Date to Timestamp)',
      'Enter your timestamp or select a date',
      'View the converted result',
      'Copy the result to your clipboard',
    ],
    features: [
      'Convert timestamps to dates',
      'Convert dates to timestamps',
      'Get current timestamp',
      'Human-readable date format',
      'One-click copy functionality',
      'Timezone-independent',
    ],
  },
  'unit-converter': {
    about: 'Unit Converter helps you convert between different units of measurement. This tool supports length (meters, kilometers, inches, feet, miles), weight (kilograms, grams, pounds, ounces), and temperature (Celsius, Fahrenheit, Kelvin). All conversions use standard conversion factors for accuracy.',
    howTo: [
      'Select unit type (Length, Weight, or Temperature)',
      'Choose the "From" and "To" units',
      'Enter the value to convert',
      'View the converted result',
    ],
    features: [
      'Multiple unit types (Length, Weight, Temperature)',
      'Wide range of units for each type',
      'Instant conversion',
      'Accurate conversion factors',
      'Easy unit selection',
      'Real-time calculation',
    ],
  },
  'percentage-calculator': {
    about: 'Percentage Calculator performs various percentage calculations. Calculate what percentage one number is of another, find percentage increase or decrease, or calculate a percentage of a value. This tool is perfect for financial calculations, discounts, markups, and any scenario requiring percentage math.',
    howTo: [
      'Select calculation type',
      'Enter the required values',
      'Click "Calculate"',
      'View the percentage result',
    ],
    features: [
      'Multiple calculation types',
      'Percentage of a value',
      'Percentage increase/decrease',
      'What percentage is X of Y',
      'Instant calculation',
      'Easy-to-use interface',
    ],
  },
  'random-number-generator': {
    about: 'Random Number Generator creates random numbers within a specified range. This tool is perfect for games, simulations, testing, and any scenario where you need random numbers. You can generate single numbers or multiple numbers at once, all within your specified minimum and maximum range.',
    howTo: [
      'Enter minimum and maximum values',
      'Enter the count of numbers to generate',
      'Click "Generate Random Numbers"',
      'View and copy the generated numbers',
    ],
    features: [
      'Customizable range (min-max)',
      'Generate multiple numbers at once',
      'Copy all numbers at once',
      'True random number generation',
      'Perfect for games and testing',
      'No limits on generation',
    ],
  },
  'text-to-binary': {
    about: 'Text to Binary Converter converts text into binary code and vice versa. Binary code represents text using only 0s and 1s, with each character represented by an 8-bit binary number. This tool is useful for learning binary encoding, debugging, and understanding how computers represent text data.',
    howTo: [
      'Select conversion direction (Text to Binary or Binary to Text)',
      'Enter your text or binary string',
      'Click "Convert"',
      'Copy the result to your clipboard',
    ],
    features: [
      'Convert text to binary',
      'Convert binary to text',
      'Space-separated byte format',
      'One-click copy functionality',
      'Instant conversion',
      'Perfect for learning and debugging',
    ],
  },
  'html-encoder-decoder': {
    about: 'HTML Encoder/Decoder converts special characters to HTML entities and vice versa. HTML encoding is essential for safely displaying HTML content, preventing XSS attacks, and ensuring proper rendering. This tool helps you encode special characters like <, >, &, and quotes into their HTML entity equivalents.',
    howTo: [
      'Select Encode or Decode mode',
      'Enter your HTML or encoded string',
      'Click the convert button',
      'Copy the result to your clipboard',
    ],
    features: [
      'Encode HTML special characters',
      'Decode HTML entities',
      'Prevent XSS attacks',
      'Safe HTML rendering',
      'One-click copy functionality',
      'Instant conversion',
    ],
  },
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  
  if (!tool) {
    notFound()
  }

  const ToolComponent = toolComponents[slug]
  const content = toolContent[slug]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/tools"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to All Tools
        </Link>

        {/* Tool Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-5xl">{tool.icon}</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {tool.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
                {tool.description}
              </p>
            </div>
          </div>
          <span className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full transition-colors duration-300">
            {tool.category}
          </span>
        </div>

        <AdPlaceholder format="horizontal" />

        {/* Tool Component */}
        <div className="my-8">
          {ToolComponent ? <ToolComponent /> : <div className="text-center text-red-600 dark:text-red-400">Tool component not found</div>}
        </div>

        <AdPlaceholder format="horizontal" />

        {/* SEO Content */}
        {content && (
          <div className="mt-12 space-y-8">
            {/* About Section */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                About {tool.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                {content.about}
              </p>
            </section>

            {/* How to Use Section */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                How to Use {tool.name}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {content.howTo.map((step, index) => (
                  <li key={index} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            {/* Features Section */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Key Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    <span className="text-blue-600 dark:text-blue-400 mr-2 transition-colors duration-300">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ/Additional Info */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Why Use {tool.name}?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                Our {tool.name} is completely free to use, requires no registration, and works entirely in your browser. 
                Your data never leaves your device, ensuring complete privacy and security. The tool is designed to be 
                fast, accurate, and easy to use, making it perfect for both beginners and professionals.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  🚀 Fast & Efficient
                </span>
                <span className="inline-block bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  🔒 100% Private
                </span>
                <span className="inline-block bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  💯 Always Free
                </span>
                <span className="inline-block bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  📱 Mobile Friendly
                </span>
              </div>
            </section>
          </div>
        )}

        {/* Related Tools */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toolsData
              .filter((t) => t.id !== tool.id)
              .slice(0, 4)
              .map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 card-hover transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{relatedTool.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {relatedTool.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        {relatedTool.category}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
