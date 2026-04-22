# 平行峡谷：全城阵营战 — Demo 项目

这是一个城市级阵营占点演示（静态前端 + 可选 Serverless 代理）。本 README 面向快速运行与部署，包含本地开发和在 Netlify/Vercel 上部署的最小步骤。

快速上手
- 打开 `public/map_demo.html` 或根目录下的 `map_demo.html`（若已部署到 Netlify：`https://<your-site>.netlify.app/map_demo.html`）。
- 点击“加入狼队 / KSG”开始演示（无需登录）。

本地运行（开发）
1. 进入项目目录：

```powershell
cd "d:\\Desktop\\服外\\frontend\\frontend"
```
2. 安装依赖（使用 pnpm 推荐）：

```powershell
pnpm install
pnpm dev
```
3. 打开浏览器访问 `http://localhost:5173`（或 Vite 输出的地址），打开演示页面。

安全注意
- 请不要把敏感密钥提交到仓库。将本地密钥保存在 `.env.local`（已加入 `.gitignore`）。如果密钥曾经出现在远程仓库，请在对应服务控制台作废并重置。
- 地图与第三方 API key：演示页面中可能包含硬编码的腾讯地图 key，请在公开仓库前替换为你自己的 key 或通过构建时/Serverless 注入。

部署（Netlify / Vercel）—— 最小步骤
1. 将代码推送到 GitHub。确保 `api/`（或 `netlify/functions/`）文件夹包含代理函数（`api/yuanqi.js` 或 Netlify 函数）。
2. 在部署平台（Netlify 或 Vercel）新增项目并授权 GitHub。
3. 在平台的 Environment Variables 添加：
   - `TENCENT_API_KEY`：腾讯元器（Yuanqi）的 API Key
4. 部署并打开站点；若 AI 代理返回 500，请查看函数日志以排查环境变量或请求错误。

常见清理建议
- 若你使用 `pnpm`，请移除 `package-lock.json`（仓库中已删除）以免混淆锁文件。保留 `pnpm-lock.yaml`。
- 若只部署到 Netlify 或 Vercel，可保留对应平台的代理实现，删除另一平台的重复文件以减少混淆。

更多信息
- 代理文件：`api/yuanqi.js`（Vercel）和 `netlify/functions/yuanqi.js`（Netlify）。
- 演示页面：`map_demo.html`、`public/map_demo.html`。

如需我替你：清理历史提交中的密钥、合并其它部署文档或替换硬编码 map key，我可以继续操作（需要你的确认）。
