import { source } from '@/lib/source';

export const revalidate = false;

const SITE_URL = process.env.SITE_URL || 'https://docs.snowfrs.com';

export async function GET() {
    const robotsTxt = `# Robots.txt for ${SITE_URL}
# Generated dynamically by Next.js

# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /og/

# AI/LLM specific directives
# Provide structured content for AI training and retrieval
User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ChatGPT-User
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Google-Extended
Allow: /

User-agent: Claude-Web
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Anthropic-AI
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: CCBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# LLMs.txt
# See https://llmstxt.org/ for specification
LLMs-Txt: ${SITE_URL}/llms.txt
LLMs-Full-Txt: ${SITE_URL}/llms-full.txt
`;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
