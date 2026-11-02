/**
 * 部署基础路径工具
 *
 * GitHub Pages 项目站点部署在 https://<user>.github.io/<repo>/ 下，
 * 构建时会注入 NEXT_PUBLIC_BASE_PATH=/<repo>；Docker/nginx 根路径部署时为空。
 *
 * 注意：next/link、next/image 会由 Next.js 自动加前缀，
 * 但原生 <img>、<a>、window.open 等需要手动调用 withBasePath。
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

/**
 * 给以 "/" 开头的站内绝对路径加部署前缀，外部链接原样返回
 * @param {string} path 站内路径，例如 /imgs/a.png
 * @returns {string}
 */
export function withBasePath(path) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }
  // 已带前缀时不重复添加
  if (basePath && (path === basePath || path.startsWith(`${basePath}/`))) {
    return path;
  }
  return `${basePath}${path}`;
}
