

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/departments/update';

export async function editdepartmentapi(departmentData:any) {
    const response = await fetch(loginEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
