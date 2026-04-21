// 文件：api/yuanqi.js
// 用于在 Vercel 上安全代理请求腾讯元器（yuanqi）接口，前端不再携带 API Key
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const API_KEY = process.env.TENCENT_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'Server misconfiguration: TENCENT_API_KEY not set' });
  }

  try {
    const response = await fetch('https://yuanqi.tencent.com/openapi/v1/agent/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json().catch(() => null);
    const status = response.status || 200;
    return res.status(status).json(data);
  } catch (err) {
    console.error('云端代理请求失败：', err);
    return res.status(500).json({ error: '云端代理请求失败', details: String(err && err.message ? err.message : err) });
  }
}
