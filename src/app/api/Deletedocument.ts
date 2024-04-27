

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/sheetdocid/delete';

export async function deletedocumentapi(id:any) {
  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"data": [id.docId]}),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Delete document');
      } catch (error) {
        throw new Error('Failed to Delete');
      }
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching document details:', error);
    throw error;
  }
}
