

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/departments/create';
// const loginEndpoint = 'http://51.79.147.139:3000'+'/departments/create';

export async function createdepartmentapi(departmentData:any) {
  
    const response = await fetch(loginEndpoint, {
      method: 'POST',
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
