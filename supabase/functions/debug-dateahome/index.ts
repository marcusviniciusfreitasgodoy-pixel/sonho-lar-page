import "https://deno.land/x/xhr@0.1.0/mod.ts"

const DATEAHOME_URL = 'https://api.dateahome.com/webhook/lead/b00e8651-dd31-41fc-a0f0-32a06044f3ee'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })

  const raw = Deno.env.get('DATEAHOME_API_KEY') ?? ''
  const trimmed = raw.trim()
  const hasWhitespace = raw !== trimmed || /\s/.test(raw)

  const meta = {
    present: raw.length > 0,
    rawLength: raw.length,
    trimmedLength: trimmed.length,
    hasWhitespace,
    prefix: trimmed.slice(0, 4),
    suffix: trimmed.slice(-4),
    charCodesHead: Array.from(raw.slice(0, 2)).map((c) => c.charCodeAt(0)),
    charCodesTail: Array.from(raw.slice(-2)).map((c) => c.charCodeAt(0)),
  }

  let testCall: any = { skipped: true }
  if (trimmed) {
    try {
      const res = await fetch(DATEAHOME_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': trimmed },
        body: JSON.stringify({
          leadOrigin: 'Teste Date a Home',
          name: 'Cateno Viglio Junior',
          email: 'cateno@dateahome.com.br',
          ddd: '21',
          phone: '29929992222',
          message: 'TESTE XXXX',
          clientListingId: 'BRRJ260617955',
        }),
      })
      const body = await res.text()
      testCall = { status: res.status, ok: res.ok, body }
    } catch (e) {
      testCall = { error: String(e) }
    }
  }

  return new Response(JSON.stringify({ meta, testCall }, null, 2), {
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
})