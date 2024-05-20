import { API_BASE_URL } from '@/app/config';

export const getAllSheets = async ()=>{
  const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/sheetmaster/get`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: "Bearer "  + accessToken,
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to all sheets: ' + response.statusText);
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to all sheets:', error);
    }
  }
export const getAllGroups = async ()=>{
    try {
        const response = await fetch(`${API_BASE_URL}/groupmaster/get`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to all sheets: ' + response.statusText);
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to all sheets:', error);
    }
  }
export const getAllParameters = async ()=>{
    try {
        const response = await fetch(`${API_BASE_URL}/parametermaster/get`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to all sheets: ' + response.statusText);
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to all sheets:', error);
    }
  }
export const getAllFields = async ()=>{
    try {
        const response = await fetch(`${API_BASE_URL}/fieldmaster/get`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to all sheets: ' + response.statusText);
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to all sheets:', error);
    }
  }
export const getAllReadings = async ()=>{
    try {
        const response = await fetch(`${API_BASE_URL}/readingmaster/get`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to all sheets: ' + response.statusText);
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to all sheets:', error);
    }
  }

interface MapProps {
    sheetId:number|null,groupId:number|null,paramterId:number|null,fieldId:number|null,readingId:number|null
}

export const saveMapping = async (props:MapProps)=>{

    try {
        const response = await fetch(`${API_BASE_URL}/sheetdependency/create-many`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        },
        body : JSON.stringify([{
            "sheetId": props.sheetId,
            "groupId": props.groupId,
            "parameterId": props.paramterId,
            "fieldId": props.fieldId,
            "readingId": props.readingId
        }])
      });
  
      if (!response.ok) {
        throw new Error('Failed to all sheets: ' + response.statusText);
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to all sheets:', error);
    }

}