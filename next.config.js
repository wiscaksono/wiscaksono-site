const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about/personal.ts",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/projects/all-projects",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
