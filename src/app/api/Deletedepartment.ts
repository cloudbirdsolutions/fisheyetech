

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/departments/delete';

export async function deletedepartmentapi(id:any) {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
      },
      body: JSON.stringify({"data": [id]}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return errorData;
    }

    const data = await response.json();  

    return data;
}
