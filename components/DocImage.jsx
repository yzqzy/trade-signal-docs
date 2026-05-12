/**
 * 文档截图组件 —— 自适应宽高比，底部左侧显示描述文字
 *
 * @param {string} src      图片路径（/imgs/...）
 * @param {string} alt      无障碍文本
 * @param {string} caption  底部描述（可选）
 */
export default function DocImage({ src, alt, caption }) {
  return (
    <figure className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm mt-4 mb-6">
      <img src={src} alt={alt || caption || ""} className="w-full block" />
      {caption && (
        <figcaption className="text-xs text-gray-500 dark:text-gray-400 px-2.5 py-1.5 border-t border-gray-100 dark:border-gray-700">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
