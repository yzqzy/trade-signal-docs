/**
 * 安全风险警告组件：用于显示安全相关的重要提示
 * 比 InvestmentDisclaimer 更醒目，使用红色边框和警告图标
 * 支持自定义内容（children prop）
 */
export default function SecurityDisclaimer({ children }) {
  return (
    <div
      role="alert"
      aria-label="安全警告"
      className="mt-6 mb-6 border-2 border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg p-4"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm flex-shrink-0" aria-hidden="true">⚠️</span>
        <div className="text-sm text-red-900 dark:text-red-200 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
