/**
 * 投资指南通用说明：教育用途、不构成投资建议
 * 用于投资指南下各篇文章文首，统一合规表述
 * 无背景，仅左边线 + 灰色小字，轻量不抢眼
 */
export default function InvestmentDisclaimer() {
  return (
    <div
      role="note"
      aria-label="说明"
      className="mt-4 mb-2 border-l-2 border-gray-200 dark:border-gray-600 pl-3"
    >
      <p className="text-xs text-gray-700 dark:text-gray-400 m-0 leading-relaxed">
        说明：本文为投资教育与认知分享，不构成任何投资建议。请根据自身情况独立决策。
      </p>
    </div>
  )
}
