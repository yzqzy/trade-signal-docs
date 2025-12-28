"use client";

import { useState, useRef, useEffect } from "react";

/**
 * 使用 OSS 静态地址的下载组件
 * OSS latest 目录始终指向最新版本，无需版本号显示
 */
export default function ReleaseInfo() {
  // OSS 静态下载地址（通过环境变量配置）
  const OSS_BASE_URL = process.env.NEXT_PUBLIC_OSS_BASE_URL;
  
  // macOS 架构选择状态
  const [macosArch, setMacosArch] = useState("arm64"); // 默认选择 Apple Silicon
  const [showMacosMenu, setShowMacosMenu] = useState(false);
  const menuRef = useRef(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMacosMenu(false);
      }
    };

    if (showMacosMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMacosMenu]);

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
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 min-h-[2.5rem]">
              支持 macOS 12.0+
              <br />
              <span className="text-xs">(Intel & Apple Silicon)</span>
            </p>
            <div className="relative mt-auto" ref={menuRef}>
              <button
                onClick={() => setShowMacosMenu(!showMacosMenu)}
                className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow text-center flex items-center justify-center gap-2"
              >
                <span>下载安装包</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showMacosMenu ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showMacosMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                  <a
                    href={downloadLinks.macos.arm64}
                    onClick={() => setShowMacosMenu(false)}
                    className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    download
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Apple Silicon (M 系列)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">适用于 M1/M2/M3/M4 芯片</div>
                  </a>
                  <a
                    href={downloadLinks.macos.x64}
                    onClick={() => setShowMacosMenu(false)}
                    className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-t border-gray-200 dark:border-gray-700"
                    download
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Intel 芯片</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">适用于 Intel 处理器</div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Windows */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="text-5xl mb-4">🪟</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Windows
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 min-h-[2.5rem]">
              支持 Windows 10+
            </p>
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 min-h-[2.5rem]">
              支持 Ubuntu 18.04+
            </p>
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
