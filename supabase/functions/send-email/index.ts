const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

import { z } from 'npm:zod@3.25.76'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Hardcoded — function only delivers leads to the business owner.
const FIXED_TO = 'marcus@godoyprime.com.br'
const FIXED_FROM = 'Marcus Godoy — Godoy Prime <noreply@godoyprime.com.br>'

const BodySchema = z.object({
  subject: z.string().min(1).max(200),
  html: z.string().min(1).max(20000),
})

// Simple in-memory per-IP rate limit (best-effort; per isolate)
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60_000
const ipHits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  hits.push(now)
  ipHits.set(ip, hits)
  return hits.length > RATE_LIMIT_MAX
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Require authentication: only logged-in users (e.g. admin posting from app)
    // or internal calls bearing INTERNAL_FUNCTION_SECRET can invoke this.
    const internalSecret = Deno.env.get('INTERNAL_FUNCTION_SECRET')
    const internalHeader = req.headers.get('x-internal-secret')
    const isInternal = !!internalSecret && internalHeader === internalSecret
    if (!isInternal) {
      const authHeader = req.headers.get('Authorization') ?? ''
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
      const supabase = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      })
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const { subject, html } = parsed.data

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FIXED_FROM,
        to: [FIXED_TO],
        subject,
        html,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend API error:', data)
      return new Response(JSON.stringify({ error: 'Email send failed', details: data }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
