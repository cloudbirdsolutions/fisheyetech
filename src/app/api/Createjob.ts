import { API_BASE_URL } from "../config";

const loginEndpoint = API_BASE_URL+'/joballocation/create';
//const loginEndpoint = 'http://51.79.147.139:3000'+'/joballocation/create';

export async function createjobapi(userData:any) {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}
