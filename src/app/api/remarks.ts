

export async function remarksDepartment(data:any) {
  const accessToken = localStorage.getItem('accessToken');
    const remarksDepartment = await fetch(process.env.NEXT_PUBLIC_API_HOST+'/joballocation/get-user-departments?userId=1', {
        method: 'GET',
        headers: {
          Accept : "application/json",
          'Content-Type': 'application/json',
          Authorization: "Bearer "  + accessToken,
        }
    });
    const remarksDepartmentdata = await remarksDepartment.json(); 
    return remarksDepartmentdata;
    }
    
    export default remarksDepartment;