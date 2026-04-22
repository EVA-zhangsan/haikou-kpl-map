部署到 Vercel（GitHub + Vercel）

前提：你已经有一个 GitHub 仓库，并且想把当前项目（含 `api/` 服务端函数）推上去。

1. 在本地初始化 git 并提交（在项目根，即含 package.json 的目录）：

```powershell
cd "d:\Desktop\服外\frontend\frontend"
# 初始化（如果尚未是 git 仓库）
git init
# 添加远端（替换为你的仓库 URL）
git remote add origin https://github.com/<your-user>/<your-repo>.git
# 创建分支并提交
git checkout -b main
git add .
git commit -m "chore: prepare for vercel deployment (add api proxy and demo changes)"
# 推送到远端
git push -u origin main
```

2. 在 GitHub 上确认代码已到 `main`（或你使用的分支）。

3. 在 Vercel 上部署：
   - 登录 https://vercel.com/ 并用 GitHub 授权。
   - 点击 "Add New" → "Project" → 选择你的仓库 → 点击 "Import"。
   - 在 "Environment Variables" 中添加：
     - Key: `TENCENT_API_KEY`
     - Value: （填入你在腾讯元器获得的 API Key）
   - 点击 "Deploy"。等待构建完成。

4. 验证：
   - 打开部署后的域名（例如 `your-project.vercel.app`），访问可以触发元器对话的页面，确认 AI 能正确返回结果。
   - 若报 500 或代理错误：
     - 到 Vercel 控制台 → Functions → 查看该函数（`/api/yuanqi`）的 Logs，抓取错误信息并发给我。

5. 常见问题排查：
   - 如果前端仍带 Authorization 或直接调用腾讯域名，说明可能没有部署到包含 `api/` 的分支，或浏览器还访问本地代理。
   - 如果函数返回 500 且日志显示 `TENCENT_API_KEY not set`，说明你在 Vercel 的环境变量未正确添加或拼写错误。

如需要，我可以：
- 帮你在本地运行 `git init` / `git commit`（我能在容器内执行，但无法替你把代码推到 GitHub，因为需要你的账号凭据）；
- 如果你贴出 Vercel 部署日志，我可以直接分析并给出补救措施。

---
文件：`api/yuanqi.js` 已添加到项目根（Serverless 路由），前端 demo 已改为调用 `/api/yuanqi`。
