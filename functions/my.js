export async function onRequest(request) {
  // GitHub API URL
  const apiUrl = 'https://api.github.com/users/ymh0000123';

  try {
    // 发起 GET 请求到 GitHub API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub API');
    }

    // 提取需要的字段
    const userData = await response.json();
    const { name, location, bio, followers, following, public_repos } = userData;

    // 构建返回的 JSON 对象
    const responseBody = {
      name,
      location,
      bio,
      followers,
      following,
      public_repos
    };

    // 返回 JSON 格式的响应
    return new Response(JSON.stringify(responseBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    // 处理错误情况
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
