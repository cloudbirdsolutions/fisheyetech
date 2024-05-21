

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/roles/delete';

export async function deleteroleapi(id:any) {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
      },
      body: JSON.stringify({"data": [id]}),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Delete role');
      } catch (error) {
        throw new Error('Failed to Delete');
      }
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching role details:', error);
    throw error;
  }
}
