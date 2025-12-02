"use client";

import NextImage from "next/image";
import { useMemo } from "react";

export default function Image({ src, ...props }) {
  const basePath = useMemo(() => {
    // 优先使用环境变量（构建时已替换为实际值）
    const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    if (typeof window !== "undefined") {
      // 客户端：尝试从 window.__NEXT_DATA__ 获取（如果存在且更可靠）
      const nextData = window.__NEXT_DATA__;
      if (nextData?.assetPrefix) {
        return nextData.assetPrefix;
      }
    }

    // 使用环境变量（构建时已替换）
    return envBasePath;
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
