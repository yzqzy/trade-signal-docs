"use client";

import NextImage from "next/image";
import { useMemo } from "react";

/**
 * 自定义 Image 组件，自动处理 basePath
 * 在静态导出模式下，确保图片路径包含 basePath
 */
export default function Image({ src, ...props }) {
  // 获取 basePath
  // 在客户端，从 window.__NEXT_DATA__ 获取（Next.js 自动注入）
  // 在构建时，从环境变量获取
  const basePath = useMemo(() => {
    if (typeof window !== "undefined") {
      // 客户端：从 Next.js 注入的数据中获取
      return window.__NEXT_DATA__?.assetPrefix || "";
    }
    // 服务端：从环境变量获取（构建时）
    return process.env.NEXT_PUBLIC_BASE_PATH || "";
  }, []);

  // 处理图片路径
  const imageSrc = useMemo(() => {
    if (!src) return src;

    // 如果是绝对路径（http:// 或 https://），直接使用
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    // 如果路径以 / 开头，添加 basePath
    if (src.startsWith("/")) {
      return `${basePath}${src}`;
    }
    // 其他情况直接使用
    return src;
  }, [src, basePath]);

  return <NextImage src={imageSrc} {...props} />;
}
