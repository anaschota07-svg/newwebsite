'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { Tool } from '@/data/tools/toolsData'
// import AdSense from '@/components/AdSense'
// [MIDDLEWARE] import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
// [MIDDLEWARE] import { GetLinkButton } from '@/components/GetLinkButton'
// [MIDDLEWARE] import { AdComponent } from '@/components/AdComponent'
// [MIDDLEWARE] import { StepTimer } from '@/components/StepTimer'

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
  // [MIDDLEWARE] const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()
  // Placeholders while middleware is commented out — remove these 4 lines to restore:
  const sessionToken = null
  const shortCode = null
  const currentStep = ''
  const setCurrentStep = (_step: string) => {}

  // Scroll to top when page loads (kept — good UX regardless of middleware)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tool.slug])

  // [MIDDLEWARE] Auto-fix step + scroll-to-timer + scroll-to-get-link effects — commented out for AdSense review
  // Uncomment the 3 useEffect blocks below to restore:
  // useEffect(() => {
  //   if (sessionToken && shortCode) {
  //     if (currentStep === 'tools-next') setCurrentStep('tool-detail-timer')
  //     else if (['popup','captcha','home-timer','home-next','tools-timer'].includes(currentStep))
  //       setCurrentStep('tool-detail-timer')
  //   }
  // }, [tool.name, currentStep, sessionToken, shortCode, setCurrentStep])
  // useEffect(() => {
  //   if (currentStep === 'tool-detail-timer') window.scrollTo({ top: 0, behavior: 'smooth' })
  // }, [currentStep])
  // useEffect(() => {
  //   if (currentStep === 'get-link') setTimeout(() => {
  //     document.getElementById('get-link-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  //   }, 500)
  // }, [currentStep])
  // [MIDDLEWARE END]

  return (
    <div className="min-h-screen py-8 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* [MIDDLEWARE] Tool Detail Timer + Ads section — commented out for AdSense review
        {sessionToken && shortCode && (currentStep === 'tool-detail-timer' || currentStep === 'get-link') && (
          <div className="w-full mb-8"> ... StepTimer + AdComponent ... </div>
        )}
        [MIDDLEWARE END] */}

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

          {/* How to Use */}
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
        {/* [MIDDLEWARE] Get Link Button + bottom ads section — commented out for AdSense review
        {sessionToken && shortCode && (
          <div id="get-link-section"> ... AdComponent + GetLinkButton + AdComponent ... </div>
        )}
        [MIDDLEWARE END] */}
      </div>
    </div>
  )
}
