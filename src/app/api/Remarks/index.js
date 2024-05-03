import { API_BASE_URL } from "../config";

const remarksEndPoint = API_BASE_URL+'joballocation/get-user-departments';

export async function remarksDepartment(data) {

    const remarksDepartment = await fetch(remarksEndPoint, {
        method: 'GET',
        headers: {
          Accept : "application/json",
          'Content-Type': 'application/json',
          Authorization: "Bearer "  + data.access_token,
        }
    });
    const remarksDepartmentdata = await remarksDepartment.json(); 
    return remarksDepartmentdata;
    }
    
    export default remarksDepartment;