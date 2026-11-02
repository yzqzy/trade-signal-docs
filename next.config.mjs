import nextra from "nextra";

const withNextra = nextra({});

// 部署基础路径：
// - GitHub Pages 项目站点（https://<user>.github.io/<repo>/）由构建时注入 /<repo>
// - Docker + nginx 根路径部署时留空
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

export default withNextra({
  output: "export",
  basePath,
  images: {
    unoptimized: true
  }
});
