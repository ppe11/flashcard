
export async function getPetfinderToken(): Promise<string> {
    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.PETFINDER_KEY,
        client_secret: process.env.PETFINDER_SECRET,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.access_token;
  }