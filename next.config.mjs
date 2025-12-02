import nextra from "nextra";

const withNextra = nextra({});

// 获取 basePath
// 优先使用 PAGES_BASE_PATH（GitHub Actions 设置）
// 如果没有设置，生产环境使用 /trade-signal-docs，开发环境使用空字符串
const basePath =
  process.env.PAGES_BASE_PATH ||
  (process.env.NODE_ENV === "production" ? "/trade-signal-docs" : "");

// 调试信息（仅在构建时输出）
if (process.env.NODE_ENV === "production") {
  console.log("Next.js Config - basePath:", basePath);
  console.log("Next.js Config - PAGES_BASE_PATH:", process.env.PAGES_BASE_PATH);
  console.log("Next.js Config - NODE_ENV:", process.env.NODE_ENV);
}

export default withNextra({
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
});
