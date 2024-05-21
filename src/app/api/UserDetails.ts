// const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/auth/signin';


import { API_BASE_URL } from '../config';
import userResponse from './userResponse';

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/auth/signin';

export async function fetchUserDetails(userData:any) {
   const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).catch(error => {
      return error.json();
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return errorData;
      } catch (error) {
        return error;
      }
    } else {

    const data = await response.json();  

    localStorage.setItem('accessToken', data.accesstoken);
    return data;
    }
  /*if(data) {
    const userresponsedata = await userResponse(data);
    return userresponsedata;
  }*/
}
