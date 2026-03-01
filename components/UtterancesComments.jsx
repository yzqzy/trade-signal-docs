"use client";

import { useEffect, useRef } from "react";

/**
 * 基于 GitHub Issues 的评论组件（Utterances）。
 * 无需开启 Discussions，只需安装 Utterances App 并配置 repo。
 * 配置说明见项目根目录 COMMENT_SETUP.md
 */
export default function UtterancesComments() {
  const containerRef = useRef(null);

  useEffect(() => {
    const repo = process.env.NEXT_PUBLIC_UTTERANCES_REPO;
    if (!repo || !containerRef.current) return;

    // 清空容器，避免 React Strict Mode 或重复挂载时出现两个评论框/两个登录按钮
    containerRef.current.innerHTML = "";

    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    const theme = isDark ? "github-dark" : "github-light";

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", theme);
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("label", "comment");

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.innerHTML = "";
    };
  }, []);

  const repo = process.env.NEXT_PUBLIC_UTTERANCES_REPO;
  if (!repo) {
    return (
      <div className="mt-8 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
        评论功能需配置：在 <code className="text-xs">.env.local</code> 中设置{" "}
        <code className="text-xs">NEXT_PUBLIC_UTTERANCES_REPO</code>（格式：<code className="text-xs">owner/repo</code>），
        并安装 <a href="https://github.com/apps/utterances" target="_blank" rel="noopener noreferrer" className="underline">Utterances App</a>。
        详细步骤见 <code className="text-xs">COMMENT_SETUP.md</code>。
      </div>
    );
  }

  return (
    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">评论</h3>
      <div ref={containerRef} />
    </div>
  );
}
