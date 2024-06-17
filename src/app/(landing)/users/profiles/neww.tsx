import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { set } from "zod";
 const Datafetch  =()=>{
    const [data,setData] = useState(null);

    useEffect(()=>{
        const fetching= async ()=>{
            try{
                const response =await axios.get('https://api.example.com/data')
                setData(response.data)
            }catch(error){
                console.error('error',error)
            }
        }
        fetching()
    }, [])
    return(
        <>
        {data ? (<p>{JSON.stringify(data,null,2)}</p>:(<p>new</p>))}
        </>
    )
 }