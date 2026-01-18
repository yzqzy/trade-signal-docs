import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center px-4 -mt-16 sm:-mt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-8">
              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                交易信标
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2 md:ml-4 text-2xl sm:text-3xl md:text-4xl">
                TradeSignal
              </span>
            </h1>

            <p className="text-lg sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              整合多维度市场数据，提供专业的投资分析工具。
              智能追踪市场动态，发现潜在投资机会，为您的每一个投资决策提供可靠的数据支撑。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-center px-2">
              <Link
                href="/signal-client"
                className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-lg font-semibold border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors duration-200 rounded-lg cursor-pointer text-center"
              >
                立即体验
              </Link>
              <a
                href="https://github.com/yzqzy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors duration-200 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <SiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                GitHub
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
