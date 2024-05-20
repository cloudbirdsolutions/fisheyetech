import { API_BASE_URL } from "../config";

const remarksEndPoint = process.env.NEXT_PUBLIC_API_HOST+'joballocation/get-user-departments';

export async function remarksDepartment(data) {
  const accessToken = localStorage.getItem('accessToken');

    const remarksDepartment = await fetch(remarksEndPoint, {
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