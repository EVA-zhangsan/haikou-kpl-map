// 文件路径：api/yuanqi.js
// Vercel 专属的 Serverless 云端函数（防弹版）

export default async function handler(req, res) {
  // 只接受 POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const API_KEY = process.env.TENCENT_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'Vercel 后台未读取到 TENCENT_API_KEY，请检查环境变量设置！' });
  }

  try {
    // req.body 在 Vercel 中会被解析为对象，发送给上游需要字符串化
    const response = await fetch('https://yuanqi.tencent.com/openapi/v1/agent/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Source': 'openapi'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      return res.status(response.status).json({ error: `腾讯 API 拒绝了请求`, details: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Vercel 云端运行崩溃:', error);
    return res.status(500).json({ error: '云函数代码崩溃', details: error && error.message ? error.message : String(error) });
  }
}
