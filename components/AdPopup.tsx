'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { AdComponent } from './AdComponent'

interface AdPopupProps {
    onClose: () => void
    sessionToken?: string
    shortCode?: string
}

export const AdPopup = ({ onClose }: AdPopupProps) => {
    const [countdown, setCountdown] = useState(5)
    const [canClose, setCanClose] = useState(false)

    useEffect(() => {
        let timeLeft = 5
        const interval = setInterval(() => {
            timeLeft -= 1
            setCountdown(timeLeft)
            if (timeLeft <= 0) {
                setCanClose(true)
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-slate-900 rounded-2xl p-4 shadow-2xl"
                    style={{ maxWidth: '360px', width: '100%' }}
                >
                    {/* Close button — clearly ABOVE the ad, never overlapping it */}
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-xs text-slate-400 font-medium">Advertisement</span>
                        {canClose ? (
                            <button
                                onClick={onClose}
                                className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white text-xs font-semibold"
                                aria-label="Close advertisement"
                            >
                                <X className="w-3 h-3" />
                                Close
                            </button>
                        ) : (
                            <span className="text-xs text-slate-400 bg-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                                Close in {countdown}s
                            </span>
                        )}
                    </div>

                    {/* Ad unit — no buttons overlapping it */}
                    <AdComponent
                        adSlotId="4686013446"
                        size="300x250"
                        style={{ display: 'block', width: '300px', height: '250px' }}
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
