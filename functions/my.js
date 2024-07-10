export async function onRequest(context) {
  const GITHUB_API_URL = 'https://api.github.com/users/ymh0000123';

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        'User-Agent': 'CloudflarePagesFunction',
      },
    });

    // 检查响应状态
    if (!response.ok) {
      const errorMessage = `GitHub API responded with status: ${response.status}`;
      console.error(errorMessage);
      return new Response(JSON.stringify({ error: errorMessage }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: response.status,
      });
    }

    const data = await response.json();
    
    const { name, location, bio, followers, following, public_repos } = data;

    return new Response(JSON.stringify({ name, location, bio, followers, following, public_repos }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Failed to fetch data from GitHub', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data from GitHub' }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500,
    });
  }
}
