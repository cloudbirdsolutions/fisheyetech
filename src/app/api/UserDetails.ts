// const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/auth/signin';


import { API_BASE_URL } from '../config';
import userResponse from './userResponse';

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/auth/signin';

export async function fetchUserDetails(userData:any) {
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

    localStorage.setItem('accessToken', data.access_token);
  return data;
  /*if(data) {
    const userresponsedata = await userResponse(data);
    return userresponsedata;
  }*/
} catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}
