

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/users/delete';

export async function deleteuserapi(id:any) {
  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"data": [id]}),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Delete user');
      } catch (error) {
        throw new Error('Failed to Delete');
      }
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}
