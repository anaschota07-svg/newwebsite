'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { Tool } from '@/data/tools/toolsData'

interface ToolDetailPageProps {
  tool: Tool
  ToolComponent: React.ComponentType
  content: {
    about: string
    howTo: string[]
    features: string[]
  }
  relatedTools: Tool[]
}

export function ToolDetailPage({ tool, ToolComponent, content, relatedTools }: ToolDetailPageProps) {
  const categoryGuidance: Record<string, { bestFor: string[]; useCases: string[]; note: string }> = {
    Calculator: {
      bestFor: ['Quick checks before making decisions', 'Students, office users, and everyday planning tasks', 'Anyone who needs a fast result without spreadsheets'],
      useCases: ['Checking numbers before sharing them with someone else', 'Comparing a few scenarios quickly', 'Learning how the result changes when you edit the inputs'],
      note: 'This calculator is intended to save time and explain the result, but you should still verify important financial, academic, legal, or health decisions with the appropriate primary source or professional advice.',
    },
    Developer: {
      bestFor: ['Developers who need a fast browser-based utility', 'Students learning technical formats and transformations', 'Quick debugging without opening a full IDE'],
      useCases: ['Testing small snippets or formats', 'Converting data while documenting work', 'Validating content before using it in production'],
      note: 'Developer tools on this site are designed for convenience and education. For production-critical work, validate the output inside your normal development workflow as well.',
    },
    Security: {
      bestFor: ['Creating stronger defaults for everyday security tasks', 'Understanding common security formats and outputs', 'Generating values quickly inside a browser session'],
      useCases: ['Creating a password or hash during setup', 'Explaining security basics to a teammate or student', 'Running a quick check before copying data elsewhere'],
      note: 'Security tools help with setup and learning, but they are not a substitute for a full security review, password manager, or formal compliance process.',
    },
    Productivity: {
      bestFor: ['Lightweight task support without installing software', 'Quick planning and timing tasks', 'Users who want simple interfaces and immediate output'],
      useCases: ['Drafting or generating a quick working asset', 'Tracking time or conversions during a session', 'Handling one-off administrative work'],
      note: 'Productivity tools are optimized for speed and convenience. If you are creating records for accounting, legal, or business operations, review the final output before relying on it.',
    },
    Design: {
      bestFor: ['Rapid experimentation while designing', 'Developers turning visual ideas into CSS', 'Students learning how color and layout values work'],
      useCases: ['Trying several visual options quickly', 'Copying starter values into a real design project', 'Understanding how visual parameters affect the result'],
      note: 'Design outputs are intended as fast starting points. You may still want to refine the final values inside your normal design or frontend workflow.',
    },
    Generator: {
      bestFor: ['Fast generation of common assets and identifiers', 'Repeated one-off tasks that should not require extra software', 'Users who need copy-ready output'],
      useCases: ['Generating something on demand', 'Creating a draft asset for a document or app', 'Saving time on repetitive setup work'],
      note: 'Generated output is intended to be practical and fast, but it should still be reviewed when accuracy or production quality is important.',
    },
    Finance: {
      bestFor: ['Rough planning and comparison', 'Understanding how a financial input affects the outcome', 'Getting a quick estimate before using an official lender or institution calculator'],
      useCases: ['Comparing two borrowing scenarios', 'Checking a repayment estimate', 'Learning the relationship between rate, duration, and total cost'],
      note: 'Finance tools here are educational and informational. For actual lending, taxation, investment, or legal decisions, confirm figures with the official institution or a qualified professional.',
    },
    Health: {
      bestFor: ['General wellness estimates', 'Understanding common health metrics', 'Quick personal reference checks'],
      useCases: ['Checking a rough score or daily estimate', 'Learning the meaning of a health metric', 'Starting a discussion with a qualified professional'],
      note: 'Health-related tools are informational only and should not replace professional medical advice, diagnosis, or treatment.',
    },
  }

  const guidance = categoryGuidance[tool.category] ?? {
    bestFor: ['Quick browser-based tasks', 'Users who want a simple, no-login utility', 'Getting fast output with minimal setup'],
    useCases: ['One-off conversions or checks', 'Learning how a result is produced', 'Saving time on repetitive work'],
    note: 'This tool is designed to be useful and straightforward, but important decisions should always be verified with the relevant primary source or professional guidance.',
  }

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tool.slug])

  return (
    <div className="min-h-screen py-8 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-5">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Tools</span>
          </Link>
        </div>

        {/* Tool Header */}
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="text-6xl p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 glass border border-white/10">
              {tool.icon}
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-2">
                {tool.name}
              </h1>
              <p className="text-base text-slate-900 dark:text-slate-400 max-w-2xl">
                {tool.description}
              </p>
              <div className="mt-3">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full glass border border-cyan-500/30">
                  {tool.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Component */}
        <div className="mb-8">
          <ToolComponent />
        </div>

        {/* About Section */}
        <div className="mt-8 space-y-4 glass rounded-3xl p-6 border border-white/10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
              About {tool.name}
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {content.about}
            </p>
          </div>

          {/* Blogs */}
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
              How to Use
            </h3>
            <ul className="space-y-2">
              {content.howTo.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
              Best For
            </h3>
            <ul className="space-y-2">
              {guidance.bestFor.map((item, index) => (
                <li key={index} className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
              Common Use Cases
            </h3>
            <ul className="space-y-2">
              {guidance.useCases.map((item, index) => (
                <li key={index} className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose This Tool */}
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
              Why Choose This Tool?
            </h3>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Our {tool.name} is designed with simplicity and efficiency in mind.
              It works entirely in your browser, ensuring your data privacy while delivering instant results.
              No installation, no registration, just pure functionality at your fingertips.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {guidance.note}
            </p>
          </div>
        </div>



        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="group glass rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl p-2 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all">
                      {relatedTool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors truncate">
                        {relatedTool.name}
                      </h3>
                      <span className="text-xs text-slate-600 dark:text-slate-500">
                        {relatedTool.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
