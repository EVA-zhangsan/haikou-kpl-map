// 文件路径：netlify/functions/yuanqi.js
// 防弹版 Netlify Serverless 函数：处理 Base64、环境变量与返回详细错误

exports.handler = async function(event, context) {
  // 1. 拦截非 POST 请求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // 2. 检查密钥是否成功读取
  const API_KEY = process.env.TENCENT_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Netlify 后台未读取到 TENCENT_API_KEY，请检查环境变量并重新部署！' })
    };
  }

  try {
    // 3. 处理 Netlify 特有的 Base64 编码问题
    let requestBody = event.body;
    if (event.isBase64Encoded) {
      requestBody = Buffer.from(event.body, 'base64').toString('utf-8');
    }

    // 4. 向腾讯发起请求
    const response = await fetch('https://yuanqi.tencent.com/openapi/v1/agent/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Source': 'openapi'
      },
      body: requestBody
    });

    // 5. 捕获腾讯端的详细报错
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `腾讯 API 拒绝了请求，状态码: ${response.status}`, details: errorText })
      };
    }

    const data = await response.json();

    // 6. 成功返回给前端
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
    };
  } catch (error) {
    // 7. 捕获 Node.js 运行时的致命错误
    console.error('Serverless 运行崩溃:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '云函数代码崩溃', details: error && error.message ? error.message : String(error) })
    };
  }
}

