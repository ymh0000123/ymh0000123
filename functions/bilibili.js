export async function onRequest(context) {
    // 定义目标URL
    const targetUrl = 'https://api.bilibili.com/x/web-interface/card?mid=1783868793';

    try {
        // 发送请求到目标URL
        const response = await fetch(targetUrl);

        // 检查请求是否成功
        if (!response.ok) {
            return new Response('Error fetching data', { status: response.status });
        }

        // 解析响应为JSON
        const data = await response.json();

        // 提取所需的字段
        const result = {
            mid: data.data.card.mid,
            name: data.data.card.name,
            sign: data.data.card.sign,
            fans: data.data.card.fans
        };

        // 返回提取后的数据，格式为JSON
        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // 错误处理
        return new Response('Error processing request', { status: 500 });
    }
}
