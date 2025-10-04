import { createClient } from '@supabase/supabase-js'

// Client-side Supabase instance. Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// in your environment. If not set, the functions that use this client should handle gracefully.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any)

export type SavedPlan = {
  id: string
  user_id: string | null
  name: string
  destination: string | null
  start_date: string | null
  end_date: string | null
  plan: any
  created_at: string
}
