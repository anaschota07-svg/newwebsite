'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

const load = (loader: () => Promise<{ default: ComponentType }>) =>
  dynamic(loader, {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[12rem] items-center justify-center rounded-2xl border border-white/10 glass">
        <LoadingSpinner size="lg" />
      </div>
    ),
  })

/** Client-only: maps tool slug to lazy UI. */
const toolComponentBySlug: Record<string, ReturnType<typeof load>> = {
  'age-calculator': load(() => import('@/components/tools/AgeCalculator')),
  'bmi-calculator': load(() => import('@/components/tools/BMICalculator')),
  'text-case-converter': load(() => import('@/components/tools/TextCaseConverter')),
  'word-counter': load(() => import('@/components/tools/WordCounter')),
  'password-generator': load(() => import('@/components/tools/PasswordGenerator')),
  'qr-code-generator': load(() => import('@/components/tools/QRCodeGenerator')),
  'color-picker': load(() => import('@/components/tools/ColorPicker')),
  'json-formatter': load(() => import('@/components/tools/JSONFormatter')),
  'base64-encoder-decoder': load(() => import('@/components/tools/Base64EncoderDecoder')),
  'url-encoder-decoder': load(() => import('@/components/tools/URLEncoderDecoder')),
  'hash-generator': load(() => import('@/components/tools/HashGenerator')),
  'uuid-generator': load(() => import('@/components/tools/UUIDGenerator')),
  'lorem-ipsum-generator': load(() => import('@/components/tools/LoremIpsumGenerator')),
  'timestamp-converter': load(() => import('@/components/tools/TimestampConverter')),
  'unit-converter': load(() => import('@/components/tools/UnitConverter')),
  'percentage-calculator': load(() => import('@/components/tools/PercentageCalculator')),
  'random-number-generator': load(() => import('@/components/tools/RandomNumberGenerator')),
  'text-to-binary': load(() => import('@/components/tools/TextToBinary')),
  'html-encoder-decoder': load(() => import('@/components/tools/HTMLEncoderDecoder')),
  'invoice-generator': load(() => import('@/components/tools/InvoiceGenerator')),
  'markdown-editor': load(() => import('@/components/tools/MarkdownEditor')),
  'css-minifier': load(() => import('@/components/tools/CSSMinifier')),
  'js-minifier': load(() => import('@/components/tools/JavaScriptMinifier')),
  'gradient-generator': load(() => import('@/components/tools/GradientGenerator')),
  'box-shadow-generator': load(() => import('@/components/tools/BoxShadowGenerator')),
  'loan-calculator': load(() => import('@/components/tools/LoanCalculator')),
  'calorie-calculator': load(() => import('@/components/tools/CalorieCalculator')),
  'date-calculator': load(() => import('@/components/tools/DateCalculator')),
  'timezone-converter': load(() => import('@/components/tools/TimezoneConverter')),
  'pomodoro-timer': load(() => import('@/components/tools/PomodoroTimer')),
  'regex-tester': load(() => import('@/components/tools/RegexTester')),
  'ip-lookup': load(() => import('@/components/tools/IPLookup')),
  'barcode-generator': load(() => import('@/components/tools/BarcodeGenerator')),
  'csv-to-json': load(() => import('@/components/tools/CSVToJSON')),
  'random-password-generator': load(() => import('@/components/tools/RandomPasswordGenerator')),
  'text-diff-checker': load(() => import('@/components/tools/TextDiffChecker')),
  'email-validator': load(() => import('@/components/tools/EmailValidator')),
  'stopwatch': load(() => import('@/components/tools/Stopwatch')),
  'font-preview': load(() => import('@/components/tools/FontPreview')),
  'speed-test': load(() => import('@/components/tools/SpeedTest')),
}

export function getToolComponentBySlug(slug: string) {
  return toolComponentBySlug[slug] ?? null
}
