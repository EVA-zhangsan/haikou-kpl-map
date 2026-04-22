# 平行峡谷：全城阵营战 — Demo 项目

这是一个面向城市级线下活动的沉浸式阵营占点 Demo。项目以静态前端为主，配合 Serverless 云函数（Netlify/Vercel）安全代理第三方 AI（腾讯元器），用于演示占点、阵营对抗和内置智能助手交互。
# 平行峡谷：全城阵营战 — 使用说明（README）

欢迎使用本项目演示版。本文档以“使用/演示”为主，面向评委与非技术审阅者，说明如何快速运行、演示与排查常见问题。


快速上手（最短路径）
1. 打开演示页面（如果你已经将项目部署到 Netlify，请访问你自己的 `https://<your-site>.netlify.app/map_demo.html`）。
2. 直接点击“加入狼队 / KSG”，开始体验（现版本暂时不需要安装或登录）。

备注：如果你在本地测试，请参照下面的“本地运行”部分。

---


      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
