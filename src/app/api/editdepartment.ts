

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/departments/update';

export async function editdepartmentapi(departmentData:any) {
  const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(loginEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "  + accessToken,
      },
      body: JSON.stringify(departmentData),
    });

    if (!response.ok) {
     
        const errorData = await response.json();
        return errorData;
    }

    const data = await response.json();  

    return data;
}
