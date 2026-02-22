import Link from "next/link";
import { LineChart, BookOpen, Plug, Bot } from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "投资分析工具",
    description:
      "专业的A股投资分析生产力工具，系统化完成从市场分析到投资决策的全流程工作",
    href: "/signal-client",
    cta: "立即体验",
    primary: true
  },
  {
    icon: BookOpen,
    title: "投资指南",
    description: "系统化的投资知识体系，从理念到实践，帮助您建立正确的投资观念",
    href: "/investment-guide",
    cta: "开始学习",
    primary: false
  },
  {
    icon: Plug,
    title: "数据接口库",
    description:
      "金融数据接口库，提供股票、ETF基金、宏观、市场等多维度金融数据",
    href: "/signal-feed",
    cta: "查看文档",
    primary: false
  },
  {
    icon: Bot,
    title: "在线 AI",
    description:
      "智能股票分析助手在线版，提供个股分析、选股选基金、多股对比等专业分析能力，即将上线",
    href: "#",
    cta: "敬请期待",
    primary: false,
    disabled: true
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12 sm:pl-6 sm:pr-12 lg:pr-16 max-sm:px-5 max-sm:py-10">
        <div className="w-full max-w-6xl mx-auto -translate-y-8 max-sm:translate-y-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-[110px] md:gap-y-0 max-sm:gap-y-10">
            <div className="md:col-span-5 flex flex-col md:min-h-0 md:justify-between">
              <h1 className="text-[42px] font-medium leading-[1.1] tracking-tight shrink-0 max-sm:text-3xl max-sm:leading-tight">
                <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent max-sm:block">
                  交易信标
                </span>
                <span className="ml-2 text-2xl font-normal text-gray-500 dark:text-gray-400 max-sm:mt-1 max-sm:ml-0 max-sm:block max-sm:text-xl">
                  TradeSignal
                </span>
              </h1>
              <div className="flex-1 flex flex-col justify-evenly min-h-0 py-3 md:py-4 text-base text-gray-600 dark:text-gray-400 max-sm:py-0 max-sm:pt-5 max-sm:pb-2 max-sm:text-sm max-sm:[&>p]:mb-3 max-sm:[&>p]:last:mb-0">
                <p>
                  以「价值为基、趋势为策、风控优先」为核心理念，专为 A
                  股投资者而设。
                </p>
                <p>
                  整合多维度市场数据，提供专业的投资分析工具，智能追踪市场动态，发现潜在投资机会。
                </p>
                <p>
                  从分析工具、投资指南到数据接口与在线
                  AI，助您系统化完成从市场分析到投资决策的全流程，为投资决策提供可靠支撑。
                </p>
              </div>
              <Link
                href="/signal-client"
                className="shrink-0 inline-flex w-fit items-center justify-center px-6 py-3 text-base font-medium text-white rounded-md bg-linear-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mb-3 max-sm:w-full max-sm:min-h-[44px] max-sm:py-3.5 max-sm:rounded-lg max-sm:mt-2"
              >
                立即体验
              </Link>
            </div>

            <div className="md:col-span-7 md:pl-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] max-sm:gap-8">
                {features.map(feature => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={feature.title} className="max-sm:pb-8">
                      <div className="flex flex-col items-start gap-3 max-sm:flex-row max-sm:items-center max-sm:gap-4">
                        <div
                          className="shrink-0 inline-flex w-10 h-10 items-center justify-center rounded-md bg-linear-to-br from-emerald-600 to-teal-600 text-white max-sm:rounded-lg"
                          aria-hidden
                        >
                          <IconComponent size={22} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 max-sm:text-base">
                          {feature.title}
                        </h2>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-sm:mt-4 max-sm:leading-relaxed">
                        {feature.description}
                      </p>
                      {feature.disabled ? (
                        <span className="mt-3 inline-block text-sm text-gray-500 dark:text-gray-500 max-sm:mt-2 max-sm:py-2">
                          {feature.cta}
                        </span>
                      ) : (
                        <Link
                          href={feature.href}
                          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline transition-colors max-sm:mt-2 max-sm:min-h-[44px] max-sm:py-2"
                        >
                          {feature.cta}
                          <span className="text-emerald-500/80">→</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
