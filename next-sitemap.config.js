/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://docs.snowfrs.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    // 排除不需要包含在 sitemap 中的路径
    exclude: ['/og/*'],
    // 开启 sitemap 索引功能
    generateIndexSitemap: true,
    outDir: 'public',
};
