

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/joballocation/create';
//const loginEndpoint = 'http://51.79.147.139:3000'+'/joballocation/create';

export async function createjobapi(userData:any) {
  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Create user');
      } catch (error) {
        throw new Error('Failed to login');
      }
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}
