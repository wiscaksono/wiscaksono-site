const { remarkCodeHike } = require("@code-hike/mdx");
const theme = require("shiki/themes/nord.json");

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about/personal",
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

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme, lineNumbers: true }]],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
