# 平行峡谷：全城阵营战 — Demo 项目

## 概述
这是面向城市级线下活动的沉浸式阵营占点 Demo。前端为静态 Single-Page App，配合 Serverless 云函数（Netlify / Vercel）作为安全代理接入第三方 AI（示例：元器）。本仓库用于演示玩法、阵营对抗与内置智能助手交互。

## 快速演示（面向评审）
- 在线演示（Demo）：https://haikou-kpl-bbzgagttg-tuchinithaneiker-6700s-projects.vercel.app/ 或 https://xiagu.netlify.app/
- 操作：打开演示页面后直接点击“加入狼队 / KSG”开始体验（无需本地安装或登录，纯演示视图）。

## 开发者指南（本地运行）
前提：本项目使用 `pnpm` 管理依赖。

安装依赖：
```powershell
pnpm install
```

本地启动开发服务器：
```powershell
pnpm dev
# 默认端口通常为 http://localhost:5173 （请查看终端输出）
```

构建：
```powershell
pnpm build
```

## Serverless 云函数
项目在 `api/`（或 `netlify/functions/`）下包含代理函数，用于安全转发到第三方 AI 服务。本地开发时可以：
- 使用 `netlify dev` 或 Vercel CLI 模拟函数；或
- 直接调用线上演示的后端以复现行为。

## 环境变量（示例）
- `YUANQI_API_KEY`：第三方 AI 服务密钥（示例名，具体请以函数代码中读取的变量名为准）。
- `PROXY_URL`：可选代理后端地址。

将这些变量添加到本地 `.env` 或在部署平台（Vercel / Netlify）控制台中设置。

## 部署
- Vercel：导入仓库并设置环境变量与 Functions（若使用）。
- Netlify：导入并在 Netlify 控制台中配置 Functions 与环境变量。

## 排查与常见问题
- 页面无法加载：确认 `pnpm dev` 正常启动并查看浏览器控制台错误。
- 云函数 403/500：检查环境变量、云函数日志与第三方服务配额/权限。
- 地图或静态资源缺失：确认 `public/` 目录中的资源路径正确。

## 更多信息
- 代码位置：`src/`（前端）
- 函数位置：`api/`、`netlify/functions/`
- 静态资源：`public/`

## 贡献与许可
欢迎 Issue/PR。当前仓库如无 LICENSE 文件，则默认保留所有权利；需开源请添加合适的 `LICENSE` 文件。

