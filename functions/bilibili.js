export default {
  async fetch(request) {
    try {
      // Bilibili API URL
      const url = 'https://api.bilibili.com/x/web-interface/card?mid=1783868793';

      // 发起请求到 Bilibili API
      const response = await fetch(url);
      
      // 检查请求是否成功
      if (!response.ok) {
        return new Response('Failed to fetch data from Bilibili API', { status: 500 });
      }

      // 解析响应的 JSON 数据
      const result = await response.json();
      
      // 提取需要的数据
      const { mid, name, sign, fans } = result.data.card;
      const filteredData = { mid, name, sign, fans };

      // 返回提取的数据
      return new Response(JSON.stringify(filteredData), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      // 处理错误
      return new Response('Error occurred: ' + error.message, { status: 500 });
    }
  },
};
