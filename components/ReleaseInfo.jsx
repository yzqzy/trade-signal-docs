"use client";

/**
 * 使用 OSS 静态地址的下载组件
 * OSS latest 目录始终指向最新版本，无需版本号显示
 */
export default function ReleaseInfo() {
  // OSS 静态下载地址（通过环境变量配置）
  const OSS_BASE_URL = process.env.NEXT_PUBLIC_OSS_BASE_URL;

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
    macos: `${OSS_BASE_URL}/latest.dmg`,
    linux: `${OSS_BASE_URL}/latest.AppImage`
  };

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* macOS */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200">
          <div className="text-center">
            <div className="text-5xl mb-4">🍎</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              macOS
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              支持 macOS 12.0+<br />
              <span className="text-xs">(Intel & Apple Silicon)</span>
            </p>
            <a
              href={downloadLinks.macos}
              className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow"
              download
            >
              下载安装包
            </a>
          </div>
        </div>

        {/* Windows */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200">
          <div className="text-center">
            <div className="text-5xl mb-4">🪟</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Windows
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              支持 Windows 10+
            </p>
            <a
              href={downloadLinks.windows}
              className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow"
              download
            >
              下载安装程序
            </a>
          </div>
        </div>

        {/* Linux */}
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200">
          <div className="text-center">
            <div className="text-5xl mb-4">🐧</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Linux
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              支持 Ubuntu 18.04+
            </p>
            <a
              href={downloadLinks.linux}
              className="inline-block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow"
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
