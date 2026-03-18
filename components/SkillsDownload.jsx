"use client";

import { useState, useEffect } from "react";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SkillsDownload() {
  const OSS_BASE_URL = process.env.NEXT_PUBLIC_OSS_BASE_URL;
  const [manifest, setManifest] = useState(null);

  useEffect(() => {
    if (!OSS_BASE_URL) return;
    fetch(`${OSS_BASE_URL}/skills/manifest.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setManifest)
      .catch(() => {});
  }, [OSS_BASE_URL]);

  if (!OSS_BASE_URL) {
    return (
      <div className="my-6 p-6 border border-red-200 dark:border-red-800 rounded-xl bg-red-50 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400 text-center">
          OSS 下载地址未配置，请设置 NEXT_PUBLIC_OSS_BASE_URL 环境变量
        </p>
      </div>
    );
  }

  const downloadUrl =
    manifest?.downloadUrl ||
    `${OSS_BASE_URL}/skills/latest/trade-signal-skills.zip`;

  const openclawDownloadUrl =
    manifest?.openclawDownloadUrl ||
    `${OSS_BASE_URL}/skills/latest/trade-signal-skills-openclaw.zip`;

  const skillCount = manifest
    ? (manifest.skills?.feed?.skillCount || 0) +
      (manifest.skills?.analysis?.skillCount || 0)
    : null;

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      <div className="p-7 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 shrink-0">
            <span className="text-2xl">🧩</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              Signal Skills 技能包
            </h4>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              Cursor · Claude Code · Windsurf
            </p>
          </div>
        </div>

        {manifest && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 dark:text-gray-500 mb-5">
            <span>v{manifest.latest}</span>
            <span>{manifest.updatedAt}</span>
            <span>ZIP · {formatSize(manifest.size)}</span>
            {skillCount > 0 && <span>{skillCount} 个技能</span>}
          </div>
        )}

        <a
          href={downloadUrl}
          className="inline-flex items-center justify-center gap-1.5 w-full px-6 py-3 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow text-center mt-auto"
          download
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
          </svg>
          下载技能包
        </a>
      </div>

      <div className="p-7 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 shrink-0">
            <span className="text-2xl">🦀</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              Signal Skills 技能包
            </h4>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              OpenClaw 专用
            </p>
          </div>
        </div>

        {manifest && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 dark:text-gray-500 mb-5">
            <span>v{manifest.latest}</span>
            <span>{manifest.updatedAt}</span>
            {manifest.openclawSize && <span>ZIP · {formatSize(manifest.openclawSize)}</span>}
            {skillCount > 0 && <span>{skillCount} 个技能</span>}
          </div>
        )}

        <a
          href={openclawDownloadUrl}
          className="inline-flex items-center justify-center gap-1.5 w-full px-6 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow text-center mt-auto"
          download
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
          </svg>
          下载 OpenClaw 版
        </a>
      </div>
    </div>
  );
}
