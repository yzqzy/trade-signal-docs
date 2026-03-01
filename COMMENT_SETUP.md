# 视频教程页评论（Utterances）

评论存在 **GitHub Issues**，无需开启 Discussions。

## 开启步骤

1. **安装 [Utterances App](https://github.com/apps/utterances)**，选择本仓库并授权。
2. **配置**：在 `.env.local` 中设置 `NEXT_PUBLIC_UTTERANCES_REPO=owner/repo`（与 `.env.example` 一致）。
3. 可选：在仓库 **Issues → Labels** 新建标签 `comment`，便于区分评论类 Issue。

## 关闭或隐藏评论

- 在仓库 **Issues** 中找到对应 Issue（标题为 `/signal-client/videos`，标签 `comment`），点击 **Close issue**。
- 若希望页面不再显示评论：从视频页移除 `<UtterancesComments />`，或更换 repo/label。
