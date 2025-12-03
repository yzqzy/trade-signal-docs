"use client";

import { useEffect, useState } from "react";

/**
 * 从构建时生成的 releases.json 读取版本信息
 * 支持静态导出模式
 */
export default function ReleaseInfo() {
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从 public 目录读取 JSON 文件
    fetch("/releases.json")
      .then(res => res.json())
      .then(data => {
        setRelease(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load release info:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="my-6">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!release || release.error) {
    return (
      <div className="my-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            版本信息暂不可用
          </p>
        </div>
      </div>
    );
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatSize = bytes => {
    if (!bytes) return "";
    const mb = (bytes / 1024 / 1024).toFixed(1);
    return `约 ${mb} MB`;
  };

  // 根据文件名匹配不同平台的资源
  const macAsset = release.assets.find(a => a.name.endsWith(".dmg"));
  const winAsset = release.assets.find(a => a.name.endsWith(".exe"));
  const linuxAppImage = release.assets.find(a => a.name.endsWith(".AppImage"));
  const linuxDeb = release.assets.find(a => a.name.endsWith(".deb"));

  return (
    <>
      {/* 版本号 - 一行显示 */}
      <div className="mt-6 mb-6">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          最新版本：
        </span>
        <span className="text-base font-medium text-gray-900 dark:text-white ml-1">
          {release.tag_name}
        </span>
      </div>

      {/* 下载链接 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* macOS */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200">
          <div className="text-center">
            <div className="text-5xl mb-4">🍎</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">macOS</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              支持 macOS 10.15+
            </p>
            {macAsset ? (
              <>
                <a
                  href={macAsset.browser_download_url}
                  className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow"
                  download
                >
                  下载 .dmg
                </a>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                  {formatSize(macAsset.size)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">暂无 macOS 版本</p>
            )}
          </div>
        </div>

        {/* Windows */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200">
          <div className="text-center">
            <div className="text-5xl mb-4">🪟</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Windows</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              支持 Windows 10+
            </p>
            {winAsset ? (
              <>
                <a
                  href={winAsset.browser_download_url}
                  className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow"
                  download
                >
                  下载 .exe
                </a>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                  {formatSize(winAsset.size)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">暂无 Windows 版本</p>
            )}
          </div>
        </div>

        {/* Linux */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200">
          <div className="text-center">
            <div className="text-5xl mb-4">🐧</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Linux</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              支持 Ubuntu 18.04+
            </p>
            <div className="space-y-2.5">
              {linuxAppImage ? (
                <a
                  href={linuxAppImage.browser_download_url}
                  className="block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow"
                  download
                >
                  下载 .AppImage
                </a>
              ) : null}
              {linuxDeb ? (
                <a
                  href={linuxDeb.browser_download_url}
                  className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-sm hover:shadow"
                  download
                >
                  下载 .deb
                </a>
              ) : null}
              {!linuxAppImage && !linuxDeb && (
                <p className="text-sm text-gray-400">暂无 Linux 版本</p>
              )}
            </div>
            {(linuxAppImage || linuxDeb) && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                {formatSize(linuxAppImage?.size || linuxDeb?.size)}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
