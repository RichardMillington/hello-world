/**
 * FeverBee AI Recommendation Proxy - Cloudflare Worker
 *
 * Deploy to Cloudflare Workers and set the ANTHROPIC_API_KEY secret:
 *   wrangler secret put ANTHROPIC_API_KEY
 *
 * This proxies requests to the Anthropic API so visitors don't need
 * their own API key. Add rate limiting and CORS as needed.
 *
 * Usage from the frontend:
 *   fetch('https://your-worker.workers.dev/recommend', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ requirements: "user's text here", platformData: "..." })
 *   })
 */

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Restrict to your domain in production
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const { requirements, systemPrompt } = await request.json();

      if (!requirements || !systemPrompt) {
        return new Response(JSON.stringify({ error: 'Missing requirements or systemPrompt' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Simple rate limiting via CF headers (enhance with KV for production)
      const ip = request.headers.get('CF-Connecting-IP');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: 'user', content: `Here are my community platform requirements:\n\n${requirements}` }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return new Response(JSON.stringify({ error: data.error?.message || 'API error' }), {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
