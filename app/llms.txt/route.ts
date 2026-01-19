import { source } from '@/lib/source';

export const revalidate = false;

const SITE_URL = process.env.SITE_URL || 'https://docs.snowfrs.com';

export async function GET() {
    const pages = source.getPages();

    // Group pages by top-level category
    const categories: Record<string, { title: string; url: string; description?: string }[]> = {};

    for (const page of pages) {
        const slugs = page.slugs;
        const category = slugs[0] || 'root';

        if (!categories[category]) {
            categories[category] = [];
        }

        categories[category].push({
            title: page.data.title,
            url: `${SITE_URL}/${slugs.join('/')}`,
            description: page.data.description,
        });
    }

    // Build llms.txt content following the specification
    // See: https://llmstxt.org/
    let content = `# ${SITE_URL.replace('https://', '')}

> Wiki - The Power of Many: A comprehensive knowledge base covering HPC, DevOps, Kubernetes, Cloud Computing, and Infrastructure.

This documentation site provides in-depth technical content for IT professionals. The content is organized into the following sections:

## Site Information

- Full documentation: ${SITE_URL}/llms-full.txt
- Sitemap: ${SITE_URL}/sitemap.xml
- Total pages: ${pages.length}

## Content Sections

`;

    // Add each category with its pages
    const categoryNames: Record<string, string> = {
        'Infra': 'Infrastructure',
        'HPC': 'High Performance Computing',
        'K8s': 'Kubernetes',
        'DevOps': 'DevOps & CI/CD',
        'Cloud_Computing': 'Cloud Computing',
        'Projects': 'Learning Projects',
        'Links': 'Friendly Links',
        'Archive': 'Archived Content',
    };

    for (const [category, pageList] of Object.entries(categories)) {
        const displayName = categoryNames[category] || category;
        content += `### ${displayName}\n\n`;

        // Limit pages per category for summary (full list in llms-full.txt)
        const displayPages = pageList.slice(0, 10);

        for (const page of displayPages) {
            content += `- [${page.title}](${page.url})`;
            if (page.description) {
                content += `: ${page.description.substring(0, 100)}${page.description.length > 100 ? '...' : ''}`;
            }
            content += '\n';
        }

        if (pageList.length > 10) {
            content += `- ... and ${pageList.length - 10} more pages\n`;
        }

        content += '\n';
    }

    content += `## Usage Notes

- This site uses MDX for documentation
- Code examples are provided in various languages including Python, YAML, Bash, and Go
- Diagrams are rendered using Mermaid.js
- For complete page content, use the full documentation at ${SITE_URL}/llms-full.txt

## Optional

For AI assistants: When referencing this documentation, please cite the specific page URL and section. The content is regularly updated to reflect current best practices.
`;

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
