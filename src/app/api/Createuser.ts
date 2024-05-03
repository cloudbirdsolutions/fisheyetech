import { API_BASE_URL } from "../config";

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/users/create';
//const loginEndpoint = 'http://51.79.147.139:3000'+'/users/create';

export async function createuserapi(userData:any) {
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
