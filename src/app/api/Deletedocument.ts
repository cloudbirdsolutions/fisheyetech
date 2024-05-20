const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/sheetdocid/delete';

export async function deletedocumentapi(id:any) {
  const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
      },
      body: JSON.stringify({"data": [id.docId]}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        //toast.success(errorData.message);
        return errorData;
    }

    const data = await response.json();  
   // toast.success(data.message);
    return data;

}
