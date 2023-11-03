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
    ];
  },
};

module.exports = withContentlayer(nextConfig);
