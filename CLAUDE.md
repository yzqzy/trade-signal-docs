# Trade Signal Docs - 项目规范

## 项目概述
基于 Next.js + Nextra 的文档站点，用于 Trade Signal 官方文档。静态导出部署至 GitHub Pages，同时支持 Docker 容器化部署。

## 技术栈
- **框架**: Next.js 15 (App Router), 静态导出 (`output: "export"`)
- **文档框架**: Nextra 4 + nextra-theme-docs
- **UI**: React 19, Tailwind CSS 4, lucide-react 图标
- **语言**: TypeScript (允许 JavaScript, `strict: false`)
- **文档格式**: MDX
- **搜索**: Pagefind (构建后生成静态搜索索引)
- **评论**: GitHub Utterances
- **包管理**: pnpm

## 代码规范

### 文件命名
- React 组件: PascalCase (`ReleaseInfo.jsx`)
- 页面文件: 小写 (`page.tsx`, `page.mdx`)
- 配置/脚本: kebab-case

### TypeScript/JavaScript
- 优先 TypeScript，允许 JavaScript
- 函数组件 + 箭头函数优先
- async/await 处理异步
- ES6+ 语法

### React 组件
- 函数组件 + Hooks
- 客户端组件必须使用 `"use client"` 指令
- 默认导出: `export default function ComponentName() {}`
- 支持暗色模式

### 样式
- Tailwind CSS 优先，避免内联样式
- 暗色模式使用 `dark:` 前缀
- 响应式: `sm:`, `md:`, `lg:` 断点
- 主色: emerald，中性色: gray

### MDX 文档
- YAML frontmatter 定义元数据
- 标题使用中文
- 代码块标注语言
- 使用 `@/` 别名或相对路径导入组件

### 导入顺序
1. 第三方库
2. 本地模块（`@/` 别名或相对路径）

### 注释
- 使用中文编写注释和文档
- 复杂逻辑必须添加注释

### 代码组织
- `components/` - 组件
- `app/` - 页面路由
- `scripts/` - 工具脚本
- `public/` - 静态资源

### Next.js
- App Router 架构
- 静态导出: `output: "export"`, `unoptimized: true`
- 不支持服务端功能（API Routes 等）
- 数据获取在构建时完成或客户端获取

## Git 提交规范
- **提交信息必须使用中文**
- 语义化提交: `<类型>(<范围>): <简短描述>`
- 类型: feat / fix / docs / style / refactor / perf / test / chore / ci
- 示例:
  - `feat(下载页): 添加版本信息展示组件`
  - `fix(组件): 修复暗色模式下的显示问题`
  - `docs(指南): 更新股票筛选器使用说明`

## 开发指南

### 添加新页面
1. 在 `app/` 下创建路由目录
2. 创建 `page.mdx` 或 `page.tsx`
3. 更新 `_meta.ts` 添加到侧边栏

### 添加新组件
1. 在 `components/` 下创建
2. 函数组件 + Hooks + 暗色模式支持
