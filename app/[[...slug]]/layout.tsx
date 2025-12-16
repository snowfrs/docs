import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
// import * as LucideIcons from 'lucide-react';
import type { ReactNode } from 'react';
import { iconMap } from '@/lib/icons';

// import type { PageTree } from 'fumadocs-core/server';

function transformNodes(nodes: any[]): any[] {
  return nodes.map((node) => {
    let newNode = { ...node };

    if (node.type === 'folder' || node.type === 'page') {
      // 1. Try to find icon in node itself (meta.json or hoisted)
      let iconName = node.icon as string | undefined;

      // 2. If no icon on node, look up the page data (for index pages of folders)
      if (!iconName) {
        let pageUrl: string | undefined;
        if (node.type === 'page') {
          pageUrl = node.url;
        } else if (node.type === 'folder' && node.index) {
          pageUrl = node.index.url;
        }

        if (pageUrl) {
          const page = source.getPage(pageUrl.split('/').filter(Boolean));
          if (page?.data?.icon) {
            iconName = page.data.icon as string;
          }
        }
      }

      if (iconName && typeof iconName === 'string') {
        // Use explicit map to prevent tree-shaking issues
        const IconElement = iconMap[iconName];
        if (IconElement) {
          newNode.icon = IconElement;
        }
      }
    }

    if (newNode.type === 'folder') {
      newNode.children = transformNodes(newNode.children);
    }

    return newNode;
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const tree = {
    ...source.pageTree,
    children: transformNodes(source.pageTree.children),
  };

  return (
    <DocsLayout tree={tree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
