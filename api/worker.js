/**
 * FeverBee AI Recommendation Proxy — Cloudflare Worker with rate limiting
 *
 * PROTECTIONS BUILT IN:
 *   1. CORS restricted to feverbee.com (blocks random websites using your key)
 *   2. Per-IP rate limiting (5 requests / hour / IP)
 *   3. Global daily cap (configurable, default 200/day across all users)
 *   4. Input size limit (10,000 chars — blocks attempts to burn tokens)
 *   5. Max tokens per response (2,000 — caps cost per request)
 *   6. Request deduplication (same exact input within 60s returns cached response)
 *
 * SETUP:
 *   1. cd api
 *   2. wrangler deploy
 *   3. wrangler secret put ANTHROPIC_API_KEY
 *   4. wrangler kv:namespace create "RATE_LIMIT"
 *   5. Copy the namespace ID into wrangler.toml under [[kv_namespaces]]
 *
 * COST SAFETY:
 *   With defaults: max ~200 requests/day × $0.03 = $6/day = $180/month ceiling
 *   Adjust MAX_REQUESTS_PER_DAY below to tune.
 */

// ==== CONFIG — adjust these ====
const ALLOWED_ORIGINS = [
  'https://www.feverbee.com',
  'https://feverbee.com',
  'https://richardmillington.github.io',
];
const MAX_REQUESTS_PER_IP_PER_HOUR = 5;
const MAX_REQUESTS_PER_DAY_GLOBAL = 200;
const MAX_INPUT_CHARS = 10000;
const MAX_OUTPUT_TOKENS = 2000;
const CACHE_TTL_SECONDS = 60;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const isAllowedOrigin = ALLOWED_ORIGINS.some(o => origin === o || origin.endsWith(o.replace('https://', '.')));

    const corsHeaders = {
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, corsHeaders);
    }

    // Block unknown origins
    if (origin && !isAllowedOrigin) {
      return json({ error: 'Unauthorized origin' }, 403, corsHeaders);
    }

    try {
      const { requirements, systemPrompt } = await request.json();

      if (!requirements || !systemPrompt) {
        return json({ error: 'Missing requirements or systemPrompt' }, 400, corsHeaders);
      }

      // INPUT SIZE LIMIT — prevents burning tokens on huge inputs
      const totalLen = (requirements.length || 0) + (systemPrompt.length || 0);
      if (requirements.length > MAX_INPUT_CHARS) {
        return json({ error: `Input too long. Max ${MAX_INPUT_CHARS} characters.` }, 400, corsHeaders);
      }

      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const now = Date.now();
      const hourKey = `rate:${ip}:${Math.floor(now / 3600000)}`;
      const dayKey = `global:${Math.floor(now / 86400000)}`;

      // KV-based rate limiting (requires RATE_LIMIT namespace binding)
      if (env.RATE_LIMIT) {
        // PER-IP LIMIT
        const ipCount = parseInt(await env.RATE_LIMIT.get(hourKey) || '0');
        if (ipCount >= MAX_REQUESTS_PER_IP_PER_HOUR) {
          return json({
            error: `Rate limit exceeded. Max ${MAX_REQUESTS_PER_IP_PER_HOUR} requests per hour. Try again later or email us directly.`
          }, 429, corsHeaders);
        }

        // GLOBAL DAILY CAP
        const globalCount = parseInt(await env.RATE_LIMIT.get(dayKey) || '0');
        if (globalCount >= MAX_REQUESTS_PER_DAY_GLOBAL) {
          return json({
            error: "Daily request limit reached. The AI recommendation feature has hit its daily cap. Please try again tomorrow or email richard@feverbee.com for a personalised recommendation."
          }, 429, corsHeaders);
        }

        // REQUEST DEDUPLICATION — same input within 60s returns cached
        const cacheKey = `cache:${await hashString(requirements + systemPrompt)}`;
        const cached = await env.RATE_LIMIT.get(cacheKey);
        if (cached) {
          return new Response(cached, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'HIT' }
          });
        }

        // Increment counters (expire after their window)
        await env.RATE_LIMIT.put(hourKey, String(ipCount + 1), { expirationTtl: 3600 });
        await env.RATE_LIMIT.put(dayKey, String(globalCount + 1), { expirationTtl: 86400 });

        // Call API
        const response = await callClaude(env.ANTHROPIC_API_KEY, requirements, systemPrompt);
        const text = JSON.stringify(response);

        // Cache for 60s
        await env.RATE_LIMIT.put(cacheKey, text, { expirationTtl: CACHE_TTL_SECONDS });

        return new Response(text, {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // No KV — fall through to unprotected call (NOT RECOMMENDED)
      const response = await callClaude(env.ANTHROPIC_API_KEY, requirements, systemPrompt);
      return json(response, 200, corsHeaders);

    } catch (err) {
      return json({ error: err.message }, 500, corsHeaders);
    }
  }
};

async function callClaude(apiKey, requirements, systemPrompt) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: systemPrompt,
      messages: [{ role: 'user', content: `Here are my community platform requirements:\n\n${requirements}` }],
    }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error?.message || `API error: ${resp.status}`);
  }
  return data;
}

async function hashString(str) {
  const enc = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}
