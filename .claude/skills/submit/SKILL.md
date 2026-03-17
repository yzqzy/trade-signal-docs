# submit

提交当前工作目录的更改。

## Instructions

1. 运行 `git status` 查看未暂存的更改
2. 运行 `git diff` 查看具体的更改内容
3. 分析更改内容，使用中文生成合适的 commit message
4. 使用 `git add` 暂存相关文件
5. 使用 `git commit -m "<message>"` 提交，格式如下：
   - feat: 新功能
   - fix: 修复 bug
   - perf: 性能优化
   - refactor: 重构
   - style: 代码样式调整
   - docs: 文档更新
   - test: 测试相关
   - chore: 构建/工具链更新
6. 尝试获取 git config user.email，如果获取成功则添加 Co-Authored-By: Claude <email>（其中 Claude 是固定值，email 动态获取），否则跳过此步骤
7. 运行 `git status` 确认提交成功

## Notes

- commit message 使用中文
- 只提交与当前任务相关的文件，避免提交无关更改
- commit message 应该简洁描述本次更改的目的和内容
- 遵循 conventional commits 规范
- 永远不会执行破坏性操作如 git push --force
- Co-Authored-By 部分需要动态获取 git config user.email，获取不到则不添加
