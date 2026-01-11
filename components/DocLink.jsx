import NextLink from 'next/link'

/**
 * 文档内链接组件，提供明显的视觉标识
 * 仅用于文档中的内部链接，让用户更容易识别可点击的链接
 * 
 * 样式特点：
 * - 绿色文字（emerald-600/500）
 * - 下划线装饰
 * - hover 时背景色变化
 * - 平滑过渡动画
 */
export default function DocLink({ href, children, className = '', ...props }) {
  return (
    <NextLink
      href={href}
      className={`inline-flex items-center text-emerald-600 dark:text-emerald-500 underline underline-offset-2 decoration-emerald-600 dark:decoration-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:decoration-emerald-700 dark:hover:decoration-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 px-0.5 py-0.5 rounded font-medium ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  )
}
