

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/roles/create';
// const loginEndpoint = 'http://51.79.147.139:3000'+'/roles/create';

export async function createroleapi(roleData:any) {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return errorData;
      } catch (error) {
        throw new Error('Failed to login');
      }
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching role details:', error);
    throw error;
  }
}
