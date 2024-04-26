

const loginEndpoint = process.env.NEXT_PUBLIC_API_HOST+'/departments/create';
// const loginEndpoint = 'http://51.79.147.139:3000'+'/departments/create';

export async function createdepartmentapi(departmentData:any) {
  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(departmentData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Create department');
      } catch (error) {
        throw new Error('Failed to login');
      }
    }

    const data = await response.json();  

    return data;
} catch (error) {
    console.error('Error fetching department details:', error);
    throw error;
  }
}
