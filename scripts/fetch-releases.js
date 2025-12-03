#!/usr/bin/env node

/**
 * 构建时脚本：从 GitHub Releases API 获取最新版本信息
 * 将结果保存为 JSON 文件，供静态页面使用
 */

const fs = require("fs");
const path = require("path");

// 配置：GitHub 仓库地址
const RELEASE_REPO = process.env.RELEASE_REPO || "your-username/signal-client";
const OUTPUT_FILE = path.join(__dirname, "../public/releases.json");

async function fetchLatestRelease() {
  try {
    console.log(`正在从 GitHub 获取最新版本信息: ${RELEASE_REPO}`);

    const [owner, repo] = RELEASE_REPO.split("/");
    if (!owner || !repo) {
      throw new Error(`无效的仓库地址格式: ${RELEASE_REPO}，应为 owner/repo`);
    }

    // 构建请求头，符合最新的 GitHub API 规范
    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "trade-signal-docs-build-script"
    };

    // 如果提供了 token，使用 Bearer 认证（推荐方式）
    if (process.env.RELEASE_TOKEN) {
      headers.Authorization = `Bearer ${process.env.RELEASE_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      {
        headers
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️  仓库 ${RELEASE_REPO} 未找到或没有发布版本`);
        // 创建默认的 JSON 文件
        const defaultData = {
          tag_name: "v1.0.0",
          published_at: new Date().toISOString(),
          assets: [],
          error: "No releases found"
        };
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(defaultData, null, 2));
        console.log(`✅ 已创建默认 releases.json`);
        return;
      }
      throw new Error(
        `GitHub API 错误: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // 格式化数据，只保留需要的信息
    const releaseData = {
      tag_name: data.tag_name,
      name: data.name || data.tag_name,
      published_at: data.published_at,
      body: data.body,
      assets: data.assets.map(asset => ({
        name: asset.name,
        browser_download_url: asset.browser_download_url,
        size: asset.size,
        content_type: asset.content_type
      }))
    };

    // 确保 public 目录存在
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // 保存到 JSON 文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(releaseData, null, 2));
    console.log(`✅ 成功获取版本信息: ${releaseData.tag_name}`);
    console.log(
      `   发布时间: ${new Date(releaseData.published_at).toLocaleString(
        "zh-CN"
      )}`
    );
    console.log(`   资源文件数: ${releaseData.assets.length}`);
    console.log(`   已保存到: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("❌ 获取版本信息失败:", error.message);
    // 创建错误占位文件，避免构建失败
    const errorData = {
      tag_name: "v1.0.0",
      published_at: new Date().toISOString(),
      assets: [],
      error: error.message
    };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(errorData, null, 2));
    console.log(`⚠️  已创建错误占位文件: ${OUTPUT_FILE}`);
    process.exit(0); // 不中断构建流程
  }
}

fetchLatestRelease();
