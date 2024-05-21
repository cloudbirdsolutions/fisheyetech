

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/sheetMaster/delete';

export async function deleteentityapi(id:any) {
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
        return errorData;
      } catch (error) {
        throw new Error('Failed to Delete');
      }
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching department details:', error);
    throw error;
  }
}
