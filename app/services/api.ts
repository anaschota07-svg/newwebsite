import axios from 'axios'

// Use production URL as default, fallback to localhost only in development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.zap2link.com')

// Debug: Log API URL (only in development or if explicitly set)
if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.log('🔧 API Base URL:', API_BASE_URL)
  console.log('🔧 Environment:', process.env.NODE_ENV)
  console.log('🔧 NEXT_PUBLIC_API_BASE_URL from env:', process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET')
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  timeoutErrorMessage: 'Request timed out. Please check your internet connection and try again.',
})

// Add request interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle timeout errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('⏱️ Request timeout:', error.config?.url)
      error.message = 'Connection timeout. The server took too long to respond. Please try again.'
      return Promise.reject(error)
    }
    
    // Handle network errors (connection refused, DNS, etc.)
    if (!error.response && error.request) {
      console.error('🌐 Network error:', {
        url: error.config?.url,
        message: error.message,
        code: error.code,
      })
      
      // Provide user-friendly error message
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        error.message = 'Unable to connect to server. Please check your internet connection and try again.'
      } else if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
        error.message = 'Server not found. Please check your internet connection.'
      }
      
      return Promise.reject(error)
    }
    
    return Promise.reject(error)
  }
)

// Get link details by short code - Use backend API to bypass RLS
export const getLinkByShortCode = async (shortCode: string) => {
  try {
    // Use backend API instead of direct Supabase query to bypass RLS
    // The backend uses supabaseAdmin which bypasses RLS
    const response = await api.get(`/api/middleware/links/${shortCode}`)
    
    // Map backend response to our Link interface
    const linkData = {
      id: response.data.id,
      user_id: '', // Not needed for middleware
      original_url: response.data.original_url,
      short_code: shortCode,
      title: response.data.title,
      description: response.data.description,
      is_active: response.data.is_active,
      created_at: '',
      updated_at: '',
      show_preview: true,
      preview_duration: response.data.preview_duration || 10,
      is_direct: response.data.is_direct || false,
      expires_at: response.data.hasExpiration ? response.data.expires_at : undefined,
      click_count: 0,
      last_clicked: undefined,
      earning_rate: 0.001,
    }
    
    return { data: linkData, error: null }
  } catch (error: any) {
    console.error('❌ Failed to fetch link from backend API:', {
      shortCode,
      error: error.message,
      code: error.code,
      url: error.config?.url,
    })
    
    // Provide user-friendly error messages
    let errorMessage = 'Failed to fetch link'
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      errorMessage = 'Connection timeout. Please try again.'
    } else if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
      errorMessage = 'Unable to connect to server. Please check your internet connection.'
    } else if (error.response?.status === 404) {
      errorMessage = 'Link not found'
    } else if (error.response?.status === 503) {
      errorMessage = 'Service temporarily unavailable. Please try again later.'
    } else {
      errorMessage = error.response?.data?.error || error.message || 'Failed to fetch link'
    }
    
    return { 
      data: null, 
      error: errorMessage
    }
  }
}

// Create click session - Use backend API to bypass RLS
export const createClickSession = async (sessionData: {
  short_link_id: string
  session_token: string
  ip_address?: string
  user_agent?: string
  browser_fingerprint?: string
  device_hash?: string
  fingerprint?: any
  referrer?: string
  country_code?: string
}) => {
  try {
    // Try backend API first
    const response = await api.post('/api/middleware/sessions', {
      ...sessionData,
      status: 'active',
      current_step: 1,
      time_spent_seconds: 0,
      requirements_met: false,
      completed_steps: [],
      earnings_amount: 0,
      is_duplicate_access: false,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    })
    return { data: response.data, error: null }
  } catch (error: any) {
    // If backend fails, return error but don't throw (non-blocking)
    const errorDetails = error.response?.data || {}
    console.error('❌ Session creation failed:', {
      message: error.message,
      status: error.response?.status,
      errorDetails: errorDetails,
      code: errorDetails.code,
      details: errorDetails.details,
      hint: errorDetails.hint,
      supabaseError: errorDetails.supabaseError,
      fullError: error
    })
    return { 
      data: null, 
      error: errorDetails.details || errorDetails.error || error.message 
    }
  }
}

// Update click session - Use backend API
export const updateClickSession = async (
  sessionId: string,
  updates: {
    current_step?: number
    time_spent_seconds?: number
    requirements_met?: boolean
    completed_steps?: number[]
    status?: string
    completed_at?: string
    [key: string]: any // Allow additional properties
  }
) => {
  try {
    // Don't send updated_at - it doesn't exist in the click_sessions table schema
    const response = await api.patch(`/api/middleware/sessions/${sessionId}`, updates)
    return { data: response.data, error: null }
  } catch (error: any) {
    // Non-blocking - just log warning
    console.warn('Session update failed (non-blocking):', error)
    return { data: null, error: error.message }
  }
}

// Check for duplicate device access - Use backend API
export const checkDeviceAccess = async (
  linkId: string,
  deviceHash: string,
  ipAddress?: string
) => {
  try {
    const response = await api.post('/api/middleware/device-access/check', {
      link_id: linkId,
      device_hash: deviceHash,
      ip_address: ipAddress,
      user_agent: navigator.userAgent,
    })
    return { 
      isDuplicate: response.data.isDuplicate || false,
      isDuplicateForEarnings: response.data.isDuplicateForEarnings || false,
      data: response.data.data || null 
    }
  } catch (error: any) {
    // Non-blocking - assume not duplicate if check fails
    console.warn('Device access check failed (non-blocking):', error)
    return { isDuplicate: false, data: null, error: error.message }
  }
}

// Record click - Use backend API
export const recordClick = async (clickData: {
  link_id: string
  ip_address?: string
  user_agent?: string
  country?: string
  device?: string
  browser?: string
  os?: string
  referrer?: string
}) => {
  try {
    const response = await api.post('/api/middleware/clicks', {
      ...clickData,
      clicked_at: new Date().toISOString(),
    })
    return { data: response.data, error: null }
  } catch (error: any) {
    // Non-blocking - log but don't throw
    console.warn('Click recording failed (non-blocking):', error)
    return { data: null, error: error.message }
  }
}

// Record link analytics event - Use backend API
export const recordAnalyticsEvent = async (eventData: {
  link_id: string
  event_type: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  country?: string
  city?: string
  device_type?: string
  browser?: string
  os?: string
  metadata?: any
}) => {
  try {
    const response = await api.post('/api/middleware/analytics', {
      ...eventData,
      created_at: new Date().toISOString(),
    })
    return { data: response.data, error: null }
  } catch (error: any) {
    // Non-blocking - log but don't throw
    console.warn('Analytics recording failed (non-blocking):', error)
    return { data: null, error: error.message }
  }
}

// Get client IP (via backend)
export const getClientIP = async (): Promise<string> => {
  try {
    const response = await api.get('/api/ip')
    return response.data.ip || 'unknown'
  } catch {
    return 'unknown'
  }
}

// ============================================
// MIDDLEWARE SESSION API (from guide)
// ============================================

// Validate session token when middleware website loads
export const validateMiddlewareSession = async (sessionToken: string, shortCode: string) => {
  try {
    const url = `${API_BASE_URL}/api/middleware/validate-session`
    console.log('🔍 Validating session at:', url)
    const response = await api.post('/api/middleware/validate-session', {
      sessionToken,
      shortCode,
    })
    console.log('✅ Session validation successful')
    return { data: response.data, error: null }
  } catch (error: any) {
    console.error('❌ Session validation failed:', error)
    console.error('❌ Request URL was:', error.config?.url || 'unknown')
    console.error('❌ Full error:', error)
    return {
      data: null,
      error: error.response?.data?.error || error.message || 'Invalid or expired session',
    }
  }
}

// Complete session and get redirect URL
export const completeMiddlewareSession = async (
  shortCode: string,
  sessionData: {
    sessionToken: string
    completedSteps?: number[]
    timeSpent: number
    adViews: number
    scrollDepth: number
  }
) => {
  try {
    const url = `${API_BASE_URL}/api/mirror/complete/${shortCode}`
    console.log('🔍 Completing session at:', url)
    console.log('🔍 Session data:', { shortCode, sessionToken: sessionData.sessionToken?.substring(0, 10) + '...' })
    const response = await api.post(`/api/mirror/complete/${shortCode}`, sessionData)
    console.log('✅ Session completion successful')
    return { data: response.data, error: null }
  } catch (error: any) {
    console.error('❌ Session completion failed:', error)
    console.error('❌ Request URL was:', error.config?.url || error.request?.responseURL || 'unknown')
    console.error('❌ Full error:', error)
    if (error.config) {
      console.error('❌ Full request config:', error.config)
    }
    return {
      data: null,
      error: error.response?.data?.error || error.message || 'Completion failed',
    }
  }
}

// Verify reCAPTCHA v2 token with backend
export const verifyCaptcha = async (token: string, action: string = 'verify') => {
  try {
    // Send token to backend for verification
    // Backend will verify with Google reCAPTCHA v2 API
    // Get site key from environment variable or use fallback
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Ldqrk8sAAAAAINfxjQrAw_AGMpVk3NV3HmXxoLr'
    
    const response = await api.post('/api/middleware/verify-captcha', {
      token,
      action,
      siteKey: siteKey,
      version: 'v2', // Specify v2 for checkbox captcha
    })
    return { 
      data: response.data, 
      error: null,
      success: response.data?.success || false,
      score: response.data?.score || 0,
    }
  } catch (error: any) {
    console.error('Captcha verification failed:', error)
    return {
      data: null,
      error: error.response?.data?.error || error.message || 'Verification failed',
      success: false,
      score: 0,
    }
  }
}

// ============================================
// MIDDLEWARE SESSION STEPS API
// ============================================

// Increment step - Call when user completes a step
export const incrementStep = async (sessionToken: string, shortCode: string) => {
  try {
    const response = await api.post('/api/sessions/increment-step', {
      sessionToken,
      shortCode,
    })
    return { 
      success: true, 
      data: response.data, 
      error: null,
      current_step: response.data.current_step,
      completed_steps: response.data.completed_steps,
      session: response.data.session
    }
  } catch (error: any) {
    console.error('Step increment failed:', error)
    return {
      success: false,
      data: null,
      error: error.response?.data?.error || error.message || 'Failed to increment step',
      current_step: null,
      completed_steps: [],
      session: null
    }
  }
}

// Check session from Google Search referrer
export const checkGoogleSession = async () => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
      (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://zap2link.com')
    
    // IMPORTANT: Don't set Referer header manually - browser does it automatically
    // Setting it manually causes "Refused to set unsafe header" error
    const response = await api.get('/api/middleware/check-session', {
      // No Referer header - browser sends it automatically
    })
    
    return {
      hasSession: response.data.hasSession || false,
      showAds: response.data.showAds || false,
      sessionToken: response.data.sessionToken || null,
      shortCode: response.data.shortCode || null,
      sessionId: response.data.sessionId || null,
      link: response.data.link || null,
      message: response.data.message || '',
      error: null,
    }
  } catch (error: any) {
    console.error('Google session check failed:', error)
    return {
      hasSession: false,
      showAds: false,
      sessionToken: null,
      shortCode: null,
      sessionId: null,
      link: null,
      message: 'No session found',
      error: error.response?.data?.error || error.message || 'Check failed',
    }
  }
}

// Validate session - Check if session is valid and requirements are met
export const validateSession = async (sessionToken: string, shortCode?: string) => {
  try {
    const url = shortCode 
      ? `/api/sessions/validate/${sessionToken}?shortCode=${shortCode}`
      : `/api/sessions/validate/${sessionToken}`
    
    const response = await api.get(url)
    return {
      valid: true,
      data: response.data,
      error: null,
      requirements_met: response.data.requirements_met || false,
      session: response.data.session,
      minimum_steps_required: response.data.minimum_steps_required || 3,
      steps_remaining: response.data.steps_remaining || 0,
      message: response.data.message
    }
  } catch (error: any) {
    console.error('Session validation failed:', error)
    const status = error.response?.status
    if (status === 401 || status === 404) {
      return {
        valid: false,
        data: null,
        error: error.response?.data?.error || 'Session expired or not found',
        requirements_met: false,
        session: null,
        minimum_steps_required: 3,
        steps_remaining: 3,
        message: 'Session expired'
      }
    }
    return {
      valid: false,
      data: null,
      error: error.response?.data?.error || error.message || 'Validation failed',
      requirements_met: false,
      session: null,
      minimum_steps_required: 3,
      steps_remaining: 3,
      message: 'Validation failed'
    }
  }
}

