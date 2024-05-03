

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/sheetMaster/update';

export async function editentityapi(userData:any) {
  try {
    const response = await fetch(loginEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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
    console.error('Error fetching user details:', error);
    throw error;
  }
}
