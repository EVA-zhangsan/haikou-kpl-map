// 文件路径：netlify/functions/yuanqi.js
// Netlify 专属的 Serverless 云端函数

exports.handler = async function(event, context) {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const API_KEY = process.env.TENCENT_API_KEY;
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfiguration: TENCENT_API_KEY not set' }) };
  }

  try {
    const response = await fetch('https://yuanqi.tencent.com/openapi/v1/agent/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      // Netlify 的 event.body 已经是字符串了，直接传给腾讯即可
      body: event.body
    });

    const data = await response.json().catch(() => null);
    const status = response.status || 200;
    return { statusCode: status, body: JSON.stringify(data) };
  } catch (err) {
    console.error('Netlify proxy request failed:', err);
    return { statusCode: 500, body: JSON.stringify({ error: '云端代理请求失败', details: String(err && err.message ? err.message : err) }) };
  }
}
