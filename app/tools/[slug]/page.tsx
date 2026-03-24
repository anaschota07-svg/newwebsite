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
import ImageCompressor from '@/components/tools/ImageCompressor'
import PDFMerger from '@/components/tools/PDFMerger'
import InvoiceGenerator from '@/components/tools/InvoiceGenerator'
import MarkdownEditor from '@/components/tools/MarkdownEditor'
import CSSMinifier from '@/components/tools/CSSMinifier'
import JavaScriptMinifier from '@/components/tools/JavaScriptMinifier'
import GradientGenerator from '@/components/tools/GradientGenerator'
import BoxShadowGenerator from '@/components/tools/BoxShadowGenerator'
import ImageResizer from '@/components/tools/ImageResizer'
import CreditCardValidator from '@/components/tools/CreditCardValidator'
import LoanCalculator from '@/components/tools/LoanCalculator'
import CalorieCalculator from '@/components/tools/CalorieCalculator'
import DateCalculator from '@/components/tools/DateCalculator'
import TimezoneConverter from '@/components/tools/TimezoneConverter'
import PomodoroTimer from '@/components/tools/PomodoroTimer'
import RegexTester from '@/components/tools/RegexTester'
import IPLookup from '@/components/tools/IPLookup'
import BarcodeGenerator from '@/components/tools/BarcodeGenerator'
import CurrencyConverter from '@/components/tools/CurrencyConverter'
import CSVToJSON from '@/components/tools/CSVToJSON'
import RandomPasswordGenerator from '@/components/tools/RandomPasswordGenerator'
import TextDiffChecker from '@/components/tools/TextDiffChecker'
import EmailValidator from '@/components/tools/EmailValidator'
import Stopwatch from '@/components/tools/Stopwatch'
import FontPreview from '@/components/tools/FontPreview'
import SpeedTest from '@/components/tools/SpeedTest'
import AdSense from '@/components/AdSense'
import { ToolDetailPage } from '@/components/ToolDetailPage'

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
    title: `${tool.name} - Free Online Tool | SimpleWebToolsBox`,
    description: `${tool.description} Use our free ${tool.name.toLowerCase()} tool instantly. No registration required. Fast, secure, and 100% free.`,
    keywords: [
      tool.name.toLowerCase(),
      `free ${tool.name.toLowerCase()}`,
      `online ${tool.name.toLowerCase()}`,
      tool.category.toLowerCase(),
      'free online tools',
      'web tools',
      'online calculator',
    ],
    openGraph: {
      title: `${tool.name} - Free Online Tool`,
      description: `${tool.description} Use our free ${tool.name.toLowerCase()} tool instantly.`,
      type: 'website',
      url: `https://simplewebtoolsbox.com/tools/${tool.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - Free Online Tool`,
      description: `${tool.description} Use our free ${tool.name.toLowerCase()} tool instantly.`,
    },
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
  'image-compressor': ImageCompressor,
  'pdf-merger': PDFMerger,
  'invoice-generator': InvoiceGenerator,
  'markdown-editor': MarkdownEditor,
  'css-minifier': CSSMinifier,
  'js-minifier': JavaScriptMinifier,
  'gradient-generator': GradientGenerator,
  'box-shadow-generator': BoxShadowGenerator,
  'image-resizer': ImageResizer,
  'credit-card-validator': CreditCardValidator,
  'loan-calculator': LoanCalculator,
  'calorie-calculator': CalorieCalculator,
  'date-calculator': DateCalculator,
  'timezone-converter': TimezoneConverter,
  'pomodoro-timer': PomodoroTimer,
  'regex-tester': RegexTester,
  'ip-lookup': IPLookup,
  'barcode-generator': BarcodeGenerator,
  'currency-converter': CurrencyConverter,
  'csv-to-json': CSVToJSON,
  'random-password-generator': RandomPasswordGenerator,
  'text-diff-checker': TextDiffChecker,
  'email-validator': EmailValidator,
  'stopwatch': Stopwatch,
  'font-preview': FontPreview,
  'speed-test': SpeedTest,
}

const toolContent: { [key: string]: { about: string; howTo: string[]; features: string[] } } = {
  'age-calculator': {
    about: 'This Age Calculator is built for the kinds of everyday checks people actually do online: filling out forms, checking age eligibility, planning birthdays and anniversaries, or working out the exact difference between two dates. Instead of returning only a rough year count, it breaks the result into years, months, and days so the output is easier to use in real situations. It also accounts for leap years and different month lengths, which matters when you need something more precise than a quick mental estimate.',
    howTo: [
      'Choose the birth date or start date you want to calculate from',
      'Run the calculation to see the exact age or date difference instantly',
      'Review the breakdown in years, months, and days instead of relying on a rough year-only estimate',
      'Use the extra totals, such as days or weeks, when you need a more practical planning number',
    ],
    features: [
      'Accounts for leap years and calendar differences',
      'Shows age in multiple useful formats',
      'Provides total days, weeks, and months for planning tasks',
      'Simple input flow for quick one-off checks',
      'Fast browser-based results with no account required',
      'Works locally in the browser for privacy',
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
    about: 'A password generator is only useful if it helps you create passwords you will actually use correctly. This tool is designed for that practical balance: enough control to generate something strong, but simple enough that you can create a new password quickly during account setup, device onboarding, or a security reset. You can tune the length and character types, then review the strength indicator before copying the result into your password manager.',
    howTo: [
      'Set the password length based on the account requirements you are working with',
      'Turn character groups on or off to match the site or app you are signing up for',
      'Generate a password and review the strength feedback before using it',
      'Copy the result into a password manager or secure storage location',
      'Regenerate if you want a different balance of complexity and readability',
    ],
    features: [
      'Configurable length and character rules',
      'Uppercase, lowercase, number, and symbol options',
      'Real-time strength feedback',
      'Quick copy workflow for account setup',
      'Useful for password resets and new registrations',
      'Runs in the browser without sending password data elsewhere',
    ],
  },
  'qr-code-generator': {
    about: 'This QR Code Generator is meant for practical, everyday publishing tasks: turning a link, plain text, or shared information into something mobile-friendly that people can scan quickly. It is useful for printed handouts, menus, invoices, event material, personal portfolios, classroom resources, and quick device-to-device sharing. The main goal is speed and reliability, so you can test the code on your phone, download it, and place it into a document or design without installing separate software.',
    howTo: [
      'Paste the URL, text, or contact information you want people to scan',
      'Generate the QR code and check the preview before downloading it',
      'Scan it once with a phone to confirm the encoded content is correct',
      'Download the image and place it in a flyer, page, invoice, or presentation',
      'Regenerate it any time if the destination text or link changes',
    ],
    features: [
      'Creates QR codes for links, text, and other short content',
      'Downloadable image output for documents and sharing',
      'Fast preview so you can verify before publishing',
      'Simple no-login workflow',
      'Suitable for mobile-first sharing scenarios',
      'Useful for both personal and business materials',
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
    about: 'JSON often becomes hard to read at the exact moment you need to inspect it carefully, such as during API debugging, frontend integration work, or configuration cleanup. This formatter is built for those moments. You can paste raw JSON from an API response, make it readable, validate the syntax, and then minify it again if needed for storage or transport. Because the tool runs in the browser, it is also a convenient option when you want a quick check without sending internal payloads to an external service.',
    howTo: [
      'Paste the JSON payload or configuration block you want to inspect',
      'Format it to make the structure readable and easier to scan',
      'Validate the syntax if you suspect a broken comma, quote, or bracket',
      'Minify it again if you need a compact version for transport or storage',
      'Copy the result back into your editor, API tool, or documentation',
    ],
    features: [
      'Beautifies messy JSON into readable structure',
      'Minifies valid JSON when compact output is needed',
      'Checks syntax before you move data into production workflows',
      'Helpful feedback for debugging invalid payloads',
      'Useful for APIs, configs, and sample data',
      'Browser-based handling for convenience and privacy',
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
 
  'invoice-generator': {
    about: 'Invoice Generator creates professional invoices quickly and easily. This tool helps freelancers, small businesses, and service providers generate customized invoices with all necessary details. Create professional-looking invoices with company information, itemized lists, taxes, and totals.',
    howTo: [
      'Enter your company and client details',
      'Add line items with descriptions and prices',
      'Set tax rates and discounts if needed',
      'Preview and download your invoice',
    ],
    features: [
      'Professional invoice templates',
      'Customizable company and client info',
      'Itemized billing support',
      'Tax and discount calculations',
      'PDF export functionality',
      'Multiple currency support',
    ],
  },
  'markdown-editor': {
    about: 'Markdown Editor provides a live preview of your Markdown content as you type. This tool is perfect for writers, developers, and content creators who work with Markdown syntax. Write in Markdown on the left and see the rendered output on the right in real-time.',
    howTo: [
      'Type or paste your Markdown content',
      'View the live preview on the right',
      'Use Markdown syntax for formatting',
      'Copy or export the rendered HTML',
    ],
    features: [
      'Live preview as you type',
      'Full Markdown syntax support',
      'Syntax highlighting',
      'Export to HTML',
      'Copy rendered content',
      'Split-screen editor',
    ],
  },
  'css-minifier': {
    about: 'CSS Minifier compresses your CSS code by removing whitespace, comments, and unnecessary characters. This reduces file size significantly, improving page load times and performance. The minified CSS maintains all functionality while being optimized for production use.',
    howTo: [
      'Paste your CSS code into the input area',
      'Click "Minify" to compress the code',
      'Review the minified output',
      'Copy the optimized CSS',
    ],
    features: [
      'Remove whitespace and comments',
      'Optimize CSS selectors',
      'Preserve functionality',
      'Significant file size reduction',
      'One-click minification',
      'Format and beautify options',
    ],
  },
  'js-minifier': {
    about: 'JavaScript Minifier compresses JavaScript code while preserving functionality. This tool removes whitespace, comments, and optimizes code structure to reduce file size. Minified JavaScript loads faster, improving website performance and user experience.',
    howTo: [
      'Paste your JavaScript code',
      'Click "Minify" to compress',
      'Review the minified output',
      'Copy the optimized code',
    ],
    features: [
      'Remove whitespace and comments',
      'Optimize variable names',
      'Preserve code functionality',
      'Significant size reduction',
      'Fast processing',
      'Format and beautify options',
    ],
  },
  'gradient-generator': {
    about: 'Gradient Generator creates beautiful CSS gradients with a visual editor. Choose colors, adjust angles, and preview your gradient in real-time. Generate CSS code for linear and radial gradients that you can use in your web projects.',
    howTo: [
      'Select gradient type (linear or radial)',
      'Choose colors for your gradient',
      'Adjust angle and position',
      'Copy the generated CSS code',
    ],
    features: [
      'Visual gradient editor',
      'Multiple color stops',
      'Linear and radial gradients',
      'Real-time preview',
      'CSS code generation',
      'Export gradient as image',
    ],
  },
  'box-shadow-generator': {
    about: 'Box Shadow Generator helps you create CSS box shadows visually. Adjust shadow properties like blur, spread, offset, and color to create the perfect shadow effect. Get the CSS code instantly to use in your projects.',
    howTo: [
      'Adjust shadow properties using sliders',
      'Choose shadow color',
      'Preview the shadow in real-time',
      'Copy the generated CSS code',
    ],
    features: [
      'Visual shadow editor',
      'Adjustable blur, spread, and offset',
      'Color picker for shadows',
      'Real-time preview',
      'CSS code generation',
      'Multiple shadow support',
    ],
  },
  'loan-calculator': {
    about: 'This Loan Calculator is designed for comparison and planning, not just for producing a single monthly payment number. You can use it to test how the payment changes when you adjust the loan amount, term, or interest rate, and to understand how much of the total repayment comes from interest. That makes it useful before speaking to a lender, comparing two offers, or checking whether a longer term really lowers the cost or only spreads it out.',
    howTo: [
      'Enter the amount you want to borrow or compare',
      'Add the interest rate and repayment period from the offer you are reviewing',
      'Run the calculation to inspect the payment amount and total interest',
      'Compare different scenarios by changing one input at a time',
    ],
    features: [
      'Shows recurring payment estimates clearly',
      'Breaks down total repayment and total interest',
      'Helps compare multiple loan scenarios quickly',
      'Useful for pre-decision planning and budgeting',
      'Simple amortization-style understanding of cost over time',
      'Fast browser-based access with no login required',
    ],
  },
  'calorie-calculator': {
    about: 'Calorie Calculator determines your daily caloric needs based on age, weight, height, gender, and activity level. This tool uses established formulas to calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to help you maintain, lose, or gain weight.',
    howTo: [
      'Enter your age, weight, and height',
      'Select gender and activity level',
      'Choose your goal (maintain/lose/gain)',
      'View your daily calorie needs',
    ],
    features: [
      'BMR and TDEE calculations',
      'Multiple activity levels',
      'Weight goal options',
      'Macronutrient breakdown',
      'Accurate formulas',
      'Personalized recommendations',
    ],
  },
  'date-calculator': {
    about: 'Date Calculator performs date arithmetic by adding or subtracting days, weeks, months, or years from any date. It also calculates the difference between two dates. Perfect for project planning, deadline tracking, and date-based calculations.',
    howTo: [
      'Select a start date',
      'Choose to add or subtract time',
      'Enter the amount (days, weeks, months, years)',
      'View the calculated result date',
    ],
    features: [
      'Add or subtract from dates',
      'Calculate date differences',
      'Support for days, weeks, months, years',
      'Account for leap years',
      'Multiple date formats',
      'Easy-to-use interface',
    ],
  },
  'timezone-converter': {
    about: 'Timezone Converter converts times between different time zones worldwide. This tool is essential for scheduling meetings, coordinating with international teams, or understanding time differences. Select any timezone and convert times instantly.',
    howTo: [
      'Select source timezone',
      'Enter the time to convert',
      'Choose destination timezone',
      'View the converted time',
    ],
    features: [
      'Worldwide timezone support',
      'Daylight saving time handling',
      'Multiple timezone selection',
      'Current time display',
      'Time difference calculation',
      'Easy timezone search',
    ],
  },
  'pomodoro-timer': {
    about: 'Pomodoro Timer helps you boost productivity using the Pomodoro Technique. Work in focused 25-minute intervals followed by short breaks. This time management method improves focus and prevents burnout by breaking work into manageable chunks.',
    howTo: [
      'Set your work duration (default 25 minutes)',
      'Set break duration (default 5 minutes)',
      'Click start to begin a work session',
      'Take breaks when the timer completes',
    ],
    features: [
      'Customizable work and break times',
      'Visual countdown timer',
      'Sound notifications',
      'Session tracking',
      'Productivity statistics',
      'Full-screen focus mode',
    ],
  },
  'regex-tester': {
    about: 'Regex Tester helps you test and debug regular expressions. Enter a regex pattern and test it against sample text to see matches in real-time. This tool is essential for developers working with pattern matching and text processing.',
    howTo: [
      'Enter your regular expression pattern',
      'Input test text',
      'View matches highlighted in real-time',
      'See match groups and details',
    ],
    features: [
      'Real-time pattern matching',
      'Match highlighting',
      'Capture group display',
      'Common regex patterns library',
      'Error detection',
      'Match explanation',
    ],
  },
  'ip-lookup': {
    about: 'IP Address Lookup provides detailed information about any IP address. Get location data, ISP information, and network details for any IPv4 or IPv6 address. This tool is useful for network troubleshooting, security analysis, and geolocation.',
    howTo: [
      'Enter an IP address',
      'Click "Lookup" to get information',
      'View location, ISP, and network details',
      'Check your own IP address',
    ],
    features: [
      'IP geolocation',
      'ISP and organization info',
      'Network type detection',
      'IPv4 and IPv6 support',
      'Location mapping',
      'Detailed network information',
    ],
  },
  'barcode-generator': {
    about: 'Barcode Generator creates various types of barcodes including Code 128, EAN-13, QR codes, and more. Generate barcodes for products, inventory management, or any application requiring barcode encoding. Download barcodes as images for use in your projects.',
    howTo: [
      'Select barcode type',
      'Enter the data to encode',
      'Customize size and format',
      'Download the generated barcode',
    ],
    features: [
      'Multiple barcode formats',
      'Customizable size and resolution',
      'High-quality output',
      'Download as PNG or SVG',
      'Instant generation',
      'Compatible with scanners',
    ],
  },
  'csv-to-json': {
    about: 'CSV to JSON Converter transforms CSV (Comma-Separated Values) files into JSON format. This tool is essential for data processing, API integration, and converting tabular data to structured JSON. Supports custom delimiters and handles complex CSV structures.',
    howTo: [
      'Upload a CSV file or paste CSV data',
      'Configure delimiter and options',
      'Click "Convert to JSON"',
      'Copy or download the JSON output',
    ],
    features: [
      'CSV to JSON conversion',
      'Custom delimiter support',
      'Header row detection',
      'Nested JSON support',
      'Large file handling',
      'Preview before conversion',
    ],
  },
  'random-password-generator': {
    about: 'Random Password Generator creates multiple strong passwords at once with advanced security options. Generate secure passwords with customizable length, character types, and exclusion rules. Perfect for creating multiple account passwords quickly.',
    howTo: [
      'Set password length and count',
      'Choose character types to include',
      'Set exclusion rules if needed',
      'Generate and copy passwords',
    ],
    features: [
      'Generate multiple passwords',
      'Customizable length and complexity',
      'Character type selection',
      'Exclude similar characters',
      'Password strength indicator',
      'Bulk password generation',
    ],
  },
  'text-diff-checker': {
    about: 'Text Difference Checker compares two texts side-by-side and highlights differences. This tool is perfect for reviewing changes, comparing versions, or finding discrepancies between documents. See additions, deletions, and modifications clearly marked.',
    howTo: [
      'Paste or enter the first text',
      'Enter the second text to compare',
      'Click "Compare" to find differences',
      'Review highlighted changes',
    ],
    features: [
      'Side-by-side comparison',
      'Highlight additions and deletions',
      'Word-level diff detection',
      'Character-level precision',
      'Easy-to-read formatting',
      'Copy differences',
    ],
  },
  'email-validator': {
    about: 'Email Validator checks if email addresses are properly formatted and valid. This tool verifies email syntax, domain existence, and format correctness. Essential for form validation, data cleaning, and ensuring email addresses are valid before use.',
    howTo: [
      'Enter an email address',
      'Click "Validate" to check',
      'View validation results',
      'See detailed validation information',
    ],
    features: [
      'Syntax validation',
      'Domain verification',
      'Format checking',
      'MX record lookup',
      'Disposable email detection',
      'Bulk email validation',
    ],
  },
  'stopwatch': {
    about: 'Stopwatch Timer provides precise time tracking with lap and split time functionality. Use this tool for timing events, workouts, presentations, or any activity requiring accurate time measurement. Track multiple intervals and review your timing history.',
    howTo: [
      'Click "Start" to begin timing',
      'Use "Lap" to record split times',
      'Click "Stop" to pause',
      'Reset to start over',
    ],
    features: [
      'Precise millisecond accuracy',
      'Lap and split time tracking',
      'Multiple timer modes',
      'History of recorded times',
      'Sound notifications',
      'Full-screen mode',
    ],
  },
  'font-preview': {
    about: 'Font Preview Tool lets you preview and compare different fonts with custom text and sizes. This tool is perfect for designers and developers choosing fonts for projects. See how fonts look at different sizes and with your specific text.',
    howTo: [
      'Enter text to preview',
      'Select font family',
      'Adjust font size and weight',
      'Compare multiple fonts side-by-side',
    ],
    features: [
      'Preview custom text',
      'Multiple font families',
      'Adjustable size and weight',
      'Side-by-side comparison',
      'Google Fonts integration',
      'Export font choices',
    ],
  },
  'speed-test': {
    about: 'Speed Test Calculator measures your internet connection speed for download and upload rates. Test your broadband, WiFi, or mobile data connection to see actual speeds. Get detailed metrics including ping, download speed, and upload speed.',
    howTo: [
      'Click "Start Speed Test"',
      'Wait for download test to complete',
      'Upload test will run automatically',
      'View detailed speed results',
    ],
    features: [
      'Download speed measurement',
      'Upload speed testing',
      'Ping/latency measurement',
      'Multiple server locations',
      'Historical speed tracking',
      'Detailed connection statistics',
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
  
  // Safety check: if component or content is missing, show 404
  if (!ToolComponent || !content) {
    notFound()
  }
  
  // Get related tools (same category, exclude current tool)
  const relatedTools = toolsData
    .filter((t) => t.id !== tool.id && t.category === tool.category)
    .slice(0, 4)

  return (
    <ToolDetailPage
      tool={tool}
      ToolComponent={ToolComponent}
      content={content}
      relatedTools={relatedTools}
    />
  )
}
