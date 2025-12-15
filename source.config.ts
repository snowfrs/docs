import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      comment: z.boolean().default(true),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

import { remarkMermaid } from './lib/remark-mermaid';
import { remarkAdmonition } from './lib/remark-admonition';
import remarkDirective from 'remark-directive';

// ... (existing code)

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkDirective, remarkMermaid, remarkAdmonition],
  },
});
