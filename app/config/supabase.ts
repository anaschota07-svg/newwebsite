import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''


if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  }
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on your schema
export interface Link {
  id: string
  user_id: string
  original_url: string
  short_code: string
  title?: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
  show_preview: boolean
  preview_duration: number
  is_direct: boolean
  expires_at?: string
  click_count: number
  last_clicked?: string
  earning_rate: number
}

export interface ClickSession {
  id: string
  short_link_id: string
  session_token: string
  ip_address?: string
  user_agent?: string
  browser_fingerprint?: string
  started_at: string
  completed_at?: string
  status: string
  current_step: number
  time_spent_seconds: number
  requirements_met: boolean
  referrer?: string
  country_code?: string
  created_at: string
  expires_at?: string
  completed_steps: number[]
  device_id?: string
  device_hash?: string
  fingerprint?: any
  earnings_amount: number
  is_duplicate_access: boolean
}

export interface DeviceLinkAccess {
  id: string
  link_id?: string
  device_id: string
  device_hash: string
  ip_address?: string
  user_agent?: string
  fingerprint?: any
  earnings_credited: boolean
  earnings_amount: number
  access_count: number
  first_access: string
  last_access: string
  last_ip?: string
  completion_time?: string
  created_at: string
  updated_at: string
}

export interface PendingArticle {
  id: string
  title: string
  excerpt: string
  slug: string
  category: string
  content: string
  author: string
  read_time: string
  date: string
  image_url?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at?: string
  rejection_reason?: string
}

export interface VerifiedArticle {
  id: string
  title: string
  excerpt: string
  slug: string
  category: string
  content: string
  author: string
  read_time: string
  date: string
  image_url?: string
  created_at: string
  updated_at?: string
}

