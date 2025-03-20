/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://stocktrix.online",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: ["/"] },
    ],
  },
};
