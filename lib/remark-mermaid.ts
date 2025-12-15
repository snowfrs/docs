import { visit } from 'unist-util-visit';
import type { Transformer } from 'unified';
import type { Code } from 'mdast';
import type { Parent } from 'unist';

export function remarkMermaid(): Transformer {
    return (tree) => {
        visit(tree, 'code', (node: Code, index, parent: Parent | undefined) => {
            if (node.lang === 'mermaid' && parent && index !== undefined) {
                parent.children.splice(index, 1, {
                    type: 'mdxJsxFlowElement',
                    name: 'Mermaid',
                    attributes: [
                        {
                            type: 'mdxJsxAttribute',
                            name: 'code',
                            value: node.value,
                        },
                    ],
                    children: [],
                } as any);
            }
        });
    };
}
