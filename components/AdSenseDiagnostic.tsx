import { useEffect, useState } from 'react'

/**
 * AdSense Diagnostic Tool
 * 
 * Add this component temporarily to your page to diagnose AdSense issues
 * 
 * Usage:
 * import { AdSenseDiagnostic } from './components/AdSenseDiagnostic'
 * 
 * Then add to your page:
 * <AdSenseDiagnostic />
 * 
 * Remove in production after testing!
 */
export const AdSenseDiagnostic = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [adsbygoogle, setAdsbygoogle] = useState<any>(null)
  const [scriptUrl, setScriptUrl] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    const checkInterval = setInterval(() => {
      // Check if script is loaded
      const hasAdsbygoogle = typeof (window as any).adsbygoogle !== 'undefined'
      setScriptLoaded(hasAdsbygoogle)
      
      if (hasAdsbygoogle) {
        setAdsbygoogle((window as any).adsbygoogle)
      }

      // Check if script tag exists
      const scriptElement = document.querySelector('script[src*="adsbygoogle"]')
      if (scriptElement) {
        setScriptUrl(scriptElement.getAttribute('src'))
      }

      // Check for common errors
      const newErrors: string[] = []
      
      // Check for duplicate scripts
      const scriptElements = document.querySelectorAll('script[src*="adsbygoogle"]')
      if (scriptElements.length > 1) {
        newErrors.push(`❌ DUPLICATE SCRIPTS: Found ${scriptElements.length} AdSense scripts`)
      }

      // Check for ad containers
      const adContainers = document.querySelectorAll('ins.adsbygoogle')
      if (adContainers.length === 0) {
        newErrors.push('⚠️ No ad containers found on page')
      } else {
        newErrors.push(`✅ Found ${adContainers.length} ad container(s)`)
      }

      // Check if ads are filled
      adContainers.forEach((ad, index) => {
        const status = ad.getAttribute('data-ad-status')
        const slot = ad.getAttribute('data-ad-slot')
        if (status === 'filled') {
          newErrors.push(`✅ Ad ${index + 1} (${slot}): FILLED`)
        } else if (status === 'unfilled') {
          newErrors.push(`⚠️ Ad ${index + 1} (${slot}): UNFILLED (no ads available)`)
        } else {
          newErrors.push(`🔵 Ad ${index + 1} (${slot}): Loading...`)
        }
      })

      setErrors(newErrors)
    }, 1000)

    return () => clearInterval(checkInterval)
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null // Only show in development
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold' }}>
        🔍 AdSense Diagnostic
      </h3>

      <div style={{ marginBottom: '10px' }}>
        <strong>Script Status:</strong>{' '}
        {scriptLoaded ? (
          <span style={{ color: '#4ade80' }}>✅ Loaded</span>
        ) : (
          <span style={{ color: '#fbbf24' }}>⏳ Loading...</span>
        )}
      </div>

      {scriptUrl && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Script URL:</strong>
          <div style={{ fontSize: '10px', wordBreak: 'break-all', opacity: 0.8 }}>
            {scriptUrl}
          </div>
        </div>
      )}

      {adsbygoogle && (
        <div style={{ marginBottom: '10px' }}>
          <strong>AdsByGoogle:</strong>{' '}
          <span style={{ color: '#4ade80' }}>
            {Array.isArray(adsbygoogle) ? `Array[${adsbygoogle.length}]` : 'Loaded'}
          </span>
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <strong>Status:</strong>
        {errors.map((error, index) => (
          <div
            key={index}
            style={{
              marginTop: '5px',
              padding: '5px',
              background: error.startsWith('✅')
                ? 'rgba(74, 222, 128, 0.1)'
                : error.startsWith('❌')
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(251, 191, 36, 0.1)',
              borderRadius: '4px',
            }}
          >
            {error}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #444' }}>
        <div style={{ fontSize: '10px', opacity: 0.6 }}>
          💡 Tip: Check browser console for detailed logs
          <br />
          📊 Refresh page if ads don't appear in 30 seconds
          <br />
          🚫 Disable ad blockers for testing
        </div>
      </div>

      <button
        onClick={() => {
          console.log('=== AdSense Debug Info ===')
          console.log('Script Loaded:', scriptLoaded)
          console.log('AdsByGoogle:', (window as any).adsbygoogle)
          console.log('Script Elements:', document.querySelectorAll('script[src*="adsbygoogle"]'))
          console.log('Ad Containers:', document.querySelectorAll('ins.adsbygoogle'))
          console.log('========================')
        }}
        style={{
          marginTop: '10px',
          padding: '8px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '12px',
        }}
      >
        📋 Log Debug Info to Console
      </button>
    </div>
  )
}
