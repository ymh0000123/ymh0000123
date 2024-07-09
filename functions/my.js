export async function onRequest(request) {
  const apiUrl = 'https://api.github.com/users/ymh0000123';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Cloudflare Pages Function' // GitHub API requires User-Agent header
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `GitHub API request failed with status ${response.status}` }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const userData = await response.json();

    // Extracting specific fields
    const { name, location, bio, followers, following, public_repos } = userData;

    // Creating the response object
    const responseBody = JSON.stringify({
      name,
      location,
      bio,
      followers,
      following,
      public_repos
    });

    return new Response(responseBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
