import { createMDX } from 'fumadocs-mdx/next';

// 1. 核心优化：限制 Shiki 打包的语言和主题
const withMDX = createMDX({
  mdxOptions: {
    rehypeCodeOptions: {
      // ⚠️ 如果不加这一段，Shiki 会打包几百种语言，导致体积爆炸
      langs: [
        'text', 'json', 'yaml', 'bash', 'shell', 'zsh',
        'js', 'javascript', 'ts', 'typescript', 'tsx', 'jsx',
        'md', 'mdx', 'html', 'css', 'scss',
        'python', 'go', 'rust', 'java', 'docker', 'dockerfile'
      ],
      // 只保留常用主题
      themes: ['github-light', 'github-dark'],
    },
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // 关闭 Source Maps 可以显著减小体积
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
  // 显式配置 output 为 standalone (OpenNext 需要，虽然它通常会自动处理)
  output: 'standalone',
};

export default withMDX(config);
