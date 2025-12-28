"use client";

import { useState } from "react";

/**
 * 使用 OSS 静态地址的下载组件
 * OSS latest 目录始终指向最新版本，无需版本号显示
 */
export default function ReleaseInfo() {
  // OSS 静态下载地址（通过环境变量配置）
  const OSS_BASE_URL = process.env.NEXT_PUBLIC_OSS_BASE_URL;
  
  // macOS 架构选择状态
  const [macosArch, setMacosArch] = useState("arm64"); // 默认选择 Apple Silicon

  if (!OSS_BASE_URL) {
    return (
      <div className="my-6 p-6 border border-red-200 dark:border-red-800 rounded-xl bg-red-50 dark:bg-red-900/20">
        <div className="text-center">
          <p className="text-sm text-red-600 dark:text-red-400">
            ⚠️ OSS 下载地址未配置，请设置 NEXT_PUBLIC_OSS_BASE_URL 环境变量
          </p>
        </div>
      </div>
    );
  }

  const downloadLinks = {
    windows: `${OSS_BASE_URL}/latest-setup.exe`,
    macos: {
      x64: `${OSS_BASE_URL}/latest-x64.dmg`,
      arm64: `${OSS_BASE_URL}/latest-arm64.dmg`
    },
    linux: `${OSS_BASE_URL}/latest.AppImage`
  };

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* macOS */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="text-5xl mb-4">🍎</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              macOS
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 min-h-[2.5rem]">
              支持 macOS 12.0+
            </p>
            {/* 架构选择标签 */}
            <div className="flex justify-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMacosArch("arm64")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  macosArch === "arm64"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-transparent hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                M 系列
              </button>
              <button
                type="button"
                onClick={() => setMacosArch("x64")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  macosArch === "x64"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-transparent hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Intel
              </button>
            </div>
            <a
              href={downloadLinks.macos[macosArch]}
              className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow text-center mt-auto"
              download
            >
              下载安装包
            </a>
          </div>
        </div>

        {/* Windows */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="text-5xl mb-4">🪟</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Windows
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 min-h-[2.5rem]">
              支持 Windows 10+
            </p>
            {/* 占位，保持与 macOS 卡片高度一致 */}
            <div className="h-8 mb-4"></div>
            <a
              href={downloadLinks.windows}
              className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow text-center mt-auto"
              download
            >
              下载安装程序
            </a>
          </div>
        </div>

        {/* Linux */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="text-5xl mb-4">🐧</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Linux
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 min-h-[2.5rem]">
              支持 Ubuntu 18.04+
            </p>
            {/* 占位，保持与 macOS 卡片高度一致 */}
            <div className="h-8 mb-4"></div>
            <a
              href={downloadLinks.linux}
              className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow text-center mt-auto"
              download
            >
              下载 AppImage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
