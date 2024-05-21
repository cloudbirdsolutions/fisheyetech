

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/roles/update';

export async function editroleapi(roleData:any) {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(loginEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
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
