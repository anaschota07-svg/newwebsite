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
  'image-compressor': {
    about: 'Image Compressor reduces image file sizes without significant quality loss. This tool is perfect for optimizing images for web use, email attachments, or storage. It supports JPEG, PNG, and WebP formats, allowing you to compress images while maintaining visual quality. The tool processes images entirely in your browser, ensuring your privacy and security.',
    howTo: [
      'Upload your image by clicking or dragging and dropping',
      'Adjust the compression quality slider',
      'Preview the compressed image',
      'Download the optimized image',
    ],
    features: [
      'Support for JPEG, PNG, and WebP formats',
      'Adjustable compression quality',
      'Real-time file size preview',
      'No quality loss option',
      'Client-side processing for privacy',
      'Instant compression',
    ],
  },
  'pdf-merger': {
    about: 'PDF Merger combines multiple PDF files into a single document. This tool is essential for organizing documents, combining reports, or merging multiple files for easier sharing. The merger maintains the quality and formatting of all original PDFs while creating one unified document.',
    howTo: [
      'Upload multiple PDF files',
      'Arrange files in the desired order',
      'Click "Merge PDFs"',
      'Download the merged PDF file',
    ],
    features: [
      'Merge unlimited PDF files',
      'Drag and drop file ordering',
      'Maintains original quality',
      'Fast processing',
      'Secure client-side merging',
      'No file size limits',
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
  'image-resizer': {
    about: 'Image Resizer changes image dimensions to specific sizes or percentages. This tool is perfect for resizing images for social media, websites, or thumbnails. Maintain aspect ratio or set custom dimensions for your needs.',
    howTo: [
      'Upload your image',
      'Set target dimensions or percentage',
      'Choose to maintain aspect ratio',
      'Download the resized image',
    ],
    features: [
      'Resize by pixels or percentage',
      'Maintain aspect ratio option',
      'Support for multiple formats',
      'High-quality resizing',
      'Batch resize multiple images',
      'Instant processing',
    ],
  },
  'credit-card-validator': {
    about: 'Credit Card Validator checks if credit card numbers are valid using the Luhn algorithm. This tool helps developers validate card numbers in forms and applications. It identifies card types and verifies number format without processing any transactions.',
    howTo: [
      'Enter a credit card number',
      'Click "Validate" to check',
      'View validation results',
      'See card type and format info',
    ],
    features: [
      'Luhn algorithm validation',
      'Card type detection',
      'Format verification',
      'Instant validation',
      'No data transmission',
      'Developer-friendly tool',
    ],
  },
  'loan-calculator': {
    about: 'Loan Calculator computes loan payments, interest rates, and amortization schedules. This tool helps you understand loan terms, calculate monthly payments, and see how much interest you\'ll pay over the life of the loan. Perfect for mortgages, car loans, and personal loans.',
    howTo: [
      'Enter loan amount',
      'Set interest rate and loan term',
      'Choose payment frequency',
      'View payment schedule and amortization',
    ],
    features: [
      'Calculate monthly payments',
      'Amortization schedule',
      'Interest calculations',
      'Multiple payment frequencies',
      'Total interest display',
      'Payment breakdown',
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
  'currency-converter': {
    about: 'Currency Converter converts between 150+ world currencies with real-time or historical exchange rates. This tool is perfect for travelers, international businesses, or anyone needing currency conversion. Get accurate conversion rates instantly.',
    howTo: [
      'Select source currency',
      'Enter the amount to convert',
      'Choose destination currency',
      'View the converted amount',
    ],
    features: [
      '150+ world currencies',
      'Real-time exchange rates',
      'Historical rate lookup',
      'Reverse conversion',
      'Currency rate charts',
      'Offline mode support',
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
