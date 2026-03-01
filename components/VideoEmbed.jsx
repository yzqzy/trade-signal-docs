"use client";

/**
 * 视频嵌入组件：使用 OSS 等外链 MP4 地址播放。
 */
export default function VideoEmbed({ src, title = "视频", poster, className = "" }) {
  if (!src) {
    return (
      <div className={`flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ${className}`} style={{ aspectRatio: "16/9", minHeight: "200px" }}>
        <p className="text-sm text-gray-500 dark:text-gray-400">暂无视频（请配置 src 链接）</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-black ${className}`} style={{ aspectRatio: "16/9" }}>
      <video
        src={src}
        poster={poster}
        title={title}
        controls
        playsInline
        className="h-full w-full object-contain"
      >
        您的浏览器不支持视频播放，请
        <a href={src} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">
          下载视频
        </a>
        观看。
      </video>
    </div>
  );
}
