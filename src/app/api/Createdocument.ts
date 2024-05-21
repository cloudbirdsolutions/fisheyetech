

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/sheetdocid/create';
// const loginEndpoint = 'http://51.79.147.139:3000'+'/documents/create';

export async function createdocumentapi(sheetId: string, userId: number, transitionId: number) {
  const accessToken = localStorage.getItem('accessToken');

  try {

    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
      },
      body: JSON.stringify({ "sheetId": parseInt(sheetId), "userId": userId, "transitionId": transitionId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details: ' + response.statusText);
    }

    const data = await response.json();
    
    return data
  } catch (error) {
    console.error('Error fetching user details:', error);
  }

} 
