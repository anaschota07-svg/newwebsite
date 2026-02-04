'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Tool } from '@/data/tools/toolsData'
import AdSense from '@/components/AdSense'
import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
import { GetLinkButton } from '@/components/GetLinkButton'
import { AdComponent } from '@/components/AdComponent'
import { StepTimer } from '@/components/StepTimer'

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
  const { currentStep, setCurrentStep, sessionToken, shortCode } = useMiddlewareFlow()

  // Debug: Log when tool detail page loads AND auto-fix step if needed
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Tool detail page loaded:', {
        tool: tool.name,
        step: currentStep,
        sessionToken: sessionToken ? `${sessionToken.substring(0, 10)}...` : 'null',
        shortCode: shortCode || 'null',
        shouldShowTimer: !!(sessionToken && shortCode && currentStep === 'tool-detail-timer'),
        shouldShowScrollInstruction: !!(sessionToken && shortCode && currentStep === 'get-link')
      })
    }

    // Auto-fix: If we have session but wrong step, correct it
    if (sessionToken && shortCode) {
      // If step is still tools-next when page loads, fix it
      if (currentStep === 'tools-next') {
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔧 Auto-fixing step from 'tools-next' to 'tool-detail-timer'`)
        }
        setCurrentStep('tool-detail-timer')
      }
      // If step is popup/captcha/home/tools-timer, it means context was reset - fix it
      else if (currentStep === 'popup' || currentStep === 'captcha' || currentStep === 'home-timer' || currentStep === 'home-next' || currentStep === 'tools-timer') {
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔧 Auto-fixing invalid step '${currentStep}' to 'tool-detail-timer'`)
        }
        setCurrentStep('tool-detail-timer')
      }
    }
  }, [tool.name, currentStep, sessionToken, shortCode, setCurrentStep])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tool.slug])

  // Scroll to top when step changes to tool-detail-timer
  useEffect(() => {
    if (currentStep === 'tool-detail-timer') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  return (
    <div className="min-h-screen py-8 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Middleware Flow Section - Tool Detail Timer with Ads */}
        {sessionToken && shortCode && (currentStep === 'tool-detail-timer' || currentStep === 'get-link') && (
          <div className="w-full mb-8">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Ad 1 */}
              <div className="w-full">
                <AdComponent
                  adSlotId="7569504767"
                  size="responsive"
                  className="w-full"
                />
              </div>

              {/* Step 7: Visible Timer (20s countdown) */}
              {currentStep === 'tool-detail-timer' && (
                <div className="text-center py-2">
                  <StepTimer
                    duration={20}
                    onComplete={() => {
                      setCurrentStep('get-link')
                      if (process.env.NODE_ENV === 'development') {
                        console.log('⏱️ Timer completed - Moving to get-link')
                      }
                    }}
                    showContinueButton={false}
                  />
                </div>
              )}

              {/* Step 8: Scroll Instruction (after timer completes) */}
              {currentStep === 'get-link' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full mb-2"
                >
                  <div className="w-full mx-auto">
                    <motion.div
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg shadow-lg text-center"
                    >
                      <p className="text-sm font-bold">
                        ↓ Scroll down to{' '}
                        <motion.span
                          animate={{
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                          className="text-yellow-300"
                        >
                          Get Link
                        </motion.span>{' '}
                        button ↓
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Ad 2 */}
              <div className="w-full">
                <AdComponent
                  adSlotId="7569504767"
                  size="responsive"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

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

        {!sessionToken && <AdSense format="horizontal" />}

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

        {/* Get Link Button Section - At Bottom (Step 8) */}
        {sessionToken && shortCode && (currentStep === 'get-link' || currentStep === 'tool-detail-timer') && (
          <div id="get-link-section" className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
            <GetLinkButton />

            {/* Ad below Get Link Button */}
            <div className="w-full mt-4">
              <AdComponent
                adSlotId="7569504767"
                size="responsive"
                className="w-full"
              />
            </div>
          </div>
        )}

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

        {!sessionToken && <AdSense format="horizontal" />}
      </div>
    </div>
  )
}
