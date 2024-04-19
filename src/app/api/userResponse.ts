export async function userResponse(data:any) {

    const userresponse = await fetch(process.env.NEXT_PUBLIC_API_HOST+'/user/me', {
        method: 'GET',
        headers: {
          Accept : "application/json",
          'Content-Type': 'application/json',
          Authorization: "Bearer "  + data.access_token,
        }
    });
    const userresponsedata = await userresponse.json(); 
    return userresponsedata;
    }
    
    export default userResponse;