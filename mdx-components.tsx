import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './components/mdx/mermaid';
import { Callout } from 'fumadocs-ui/components/callout';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Mermaid,
    Callout,
  };
}
