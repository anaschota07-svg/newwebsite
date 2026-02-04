import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { UAParser } from 'ua-parser-js'

export interface FraudCheckResult {
  isFraud: boolean
  fraudScore: number
  reasons: string[]
  fingerprint: string
  deviceHash: string
}

// Check for ad blocker
export const detectAdBlocker = async (): Promise<boolean> => {
  try {
    const testAd = document.createElement('div')
    testAd.innerHTML = '&nbsp;'
    testAd.className = 'adsbox'
    testAd.style.position = 'absolute'
    testAd.style.left = '-9999px'
    document.body.appendChild(testAd)

    await new Promise(resolve => setTimeout(resolve, 100))

    const isBlocked = testAd.offsetHeight === 0 || 
                     testAd.style.display === 'none' ||
                     testAd.style.visibility === 'hidden'

    document.body.removeChild(testAd)
    return isBlocked
  } catch {
    return false
  }
}

// Check for headless browser
export const detectHeadlessBrowser = (): boolean => {
  const checks: boolean[] = []

  // Check for headless indicators
  checks.push(navigator.webdriver === true)
  checks.push((window as any).chrome === undefined)
  checks.push(navigator.plugins.length === 0)
  checks.push(navigator.languages.length === 0)
  
  // Check for automation tools
  const userAgent = navigator.userAgent.toLowerCase()
  checks.push(userAgent.includes('headless'))
  checks.push(userAgent.includes('phantom'))
  checks.push(userAgent.includes('puppeteer'))
  checks.push(userAgent.includes('selenium'))
  checks.push(userAgent.includes('webdriver'))

  // Check screen properties
  checks.push(window.screen.width === 0)
  checks.push(window.screen.height === 0)
  checks.push(window.outerWidth === 0)
  checks.push(window.outerHeight === 0)

  return checks.some(check => check === true)
}

// Get browser fingerprint
export const getBrowserFingerprint = async (): Promise<string> => {
  try {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
  } catch (error) {
    console.error('Fingerprint error:', error)
    // Fallback fingerprint
    return `${navigator.userAgent}-${navigator.language}-${screen.width}x${screen.height}`
  }
}

// Create device hash
export const createDeviceHash = async (): Promise<string> => {
  const fingerprint = await getBrowserFingerprint()
  const parser = new UAParser()
  const ua = parser.getResult()
  
  const deviceInfo = {
    fingerprint,
    browser: `${ua.browser.name}-${ua.browser.version}`,
    os: `${ua.os.name}-${ua.os.version}`,
    device: ua.device.type || 'desktop',
    screen: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  // Simple hash function
  const str = JSON.stringify(deviceInfo)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

// Comprehensive fraud detection
export const performFraudCheck = async (
  _shortCode: string,
  _ipAddress?: string
): Promise<FraudCheckResult> => {
  const reasons: string[] = []
  let fraudScore = 0

  // Check ad blocker (20 points)
  const hasAdBlocker = await detectAdBlocker()
  if (hasAdBlocker) {
    fraudScore += 20
    reasons.push('Ad blocker detected')
  }

  // Check headless browser (30 points)
  const isHeadless = detectHeadlessBrowser()
  if (isHeadless) {
    fraudScore += 30
    reasons.push('Headless browser detected')
  }

  // Check automation tools (25 points)
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.includes('selenium') || userAgent.includes('webdriver')) {
    fraudScore += 25
    reasons.push('Automation tool detected')
  }

  // Check for missing browser features (15 points)
  if (!navigator.cookieEnabled) {
    fraudScore += 15
    reasons.push('Cookies disabled')
  }

  // Check screen size (10 points)
  if (screen.width < 100 || screen.height < 100) {
    fraudScore += 10
    reasons.push('Suspicious screen size')
  }

  // Get fingerprint and device hash
  const fingerprint = await getBrowserFingerprint()
  const deviceHash = await createDeviceHash()

  const isFraud = fraudScore >= 50

  return {
    isFraud,
    fraudScore,
    reasons,
    fingerprint,
    deviceHash,
  }
}

// Check for duplicate access (to be used with backend)
export const checkDuplicateAccess = async (
  deviceHash: string,
  linkId: string,
  _ipAddress?: string
): Promise<boolean> => {
  // This should be checked on backend
  // For now, check localStorage
  const storageKey = `access_${linkId}_${deviceHash}`
  const lastAccess = localStorage.getItem(storageKey)
  
  if (lastAccess) {
    const timeDiff = Date.now() - parseInt(lastAccess)
    // If accessed within last 5 minutes, consider duplicate
    if (timeDiff < 5 * 60 * 1000) {
      return true
    }
  }

  localStorage.setItem(storageKey, Date.now().toString())
  return false
}

