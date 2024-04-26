

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/roles/create';
// const loginEndpoint = 'http://51.79.147.139:3000'+'/roles/create';

export async function createroleapi(roleData:any) {
  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Create role');
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
