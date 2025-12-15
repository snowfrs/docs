import { visit } from 'unist-util-visit';
import type { Transformer } from 'unified';
import type { Node } from 'unist';

interface DirectiveNode extends Node {
    type: 'containerDirective' | 'leafDirective' | 'textDirective';
    name: string;
    attributes?: Record<string, string>;
    children: Node[];
    data?: Record<string, unknown>;
}

export function remarkAdmonition(): Transformer {
    return (tree) => {
        visit(tree, (node) => {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                const directive = node as DirectiveNode;
                if (!['note', 'tip', 'info', 'warning', 'danger'].includes(directive.name)) {
                    return;
                }

                const data = directive.data || (directive.data = {});
                const tagName = 'Callout';

                // Transform to MDX JSX
                // We mutate the node into an MDX JSX element
                (node as any).type = 'mdxJsxFlowElement';
                (node as any).name = tagName;
                (node as any).attributes = [
                    { type: 'mdxJsxAttribute', name: 'type', value: directive.name },
                    { type: 'mdxJsxAttribute', name: 'title', value: directive.attributes?.title },
                ].filter(Boolean);
            }
        });
    };
}
