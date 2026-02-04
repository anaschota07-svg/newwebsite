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
    const [canClose, setCanClose] = useState(false)
    const adRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Timer countdown
        let timeLeft = 20
        const interval = setInterval(() => {
            timeLeft -= 1
            if (timeLeft <= 0) {
                setCanClose(true)
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    // Handle fake close button click - scroll to ad area
    const handleFakeCloseClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        // Scroll to the ad area to help users interact with ads
        if (adRef.current) {
            const adElement = adRef.current.querySelector('ins.adsbygoogle')
            if (adElement) {
                adElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4"
            >
                {/* Just Ad - No Box */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full"
                    style={{
                        maxWidth: '800px',
                        minHeight: '250px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Fake Close Button - Left Side Overlay */}
                    {!canClose && (
                        <button
                            onClick={handleFakeCloseClick}
                            className="absolute left-2 top-2 w-5 h-5 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded transition-colors cursor-pointer z-50"
                            aria-label="View Ad"
                        >
                            <X className="w-3 h-3 text-white" />
                        </button>
                    )}

                    {/* Real Close Button - Right Side Overlay */}
                    {canClose && (
                        <button
                            onClick={onClose}
                            className="absolute right-2 top-2 w-6 h-6 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full transition-colors z-50"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    )}

                    {/* Ad Only - No Padding, No Box */}
                    <div ref={adRef} className="w-full flex items-center justify-center">
                        <AdComponent
                            adSlotId="4686013446"
                            size="300x250"
                            className="w-full"
                            style={{ display: 'inline-block', width: '300px', height: '250px' }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
