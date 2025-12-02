import nextra from "nextra";

const withNextra = nextra({});

const basePath =
  process.env.PAGES_BASE_PATH ||
  (process.env.NODE_ENV === "production" ? "/trade-signal-docs" : "");

export default withNextra({
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true // GitHub Pages 不支持 Next.js 图片优化
  }
});
