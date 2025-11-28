import nextra from "nextra";

const withNextra = nextra({});

// 判断是否为生产环境（GitHub Pages 部署）
const isProd = process.env.NODE_ENV === "production";
// 从环境变量获取 basePath，如果没有则根据生产环境判断
const basePath = process.env.PAGES_BASE_PATH || (isProd ? "/trade-signal-docs" : "");

export default withNextra({
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true // GitHub Pages 不支持 Next.js 图片优化
  }
});
