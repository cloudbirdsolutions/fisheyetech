import {useState, useEffect, useCallback} from "react";
import {useAuth} from "@/app/hooks/useAuth";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export function useApi <T>(path:string, options?:AxiosRequestConfig) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<T[]>();
    const [baseEndpoint, setBaseEndpoint] = useState(process.env.NEXT_PUBLIC_API_HOST);
    const auth = useAuth();

    options = Object.assign({ headers: { Accept: "application/json", Authorization: "Bearer "  + auth } }, options);

    const fetchData = useCallback(async () =>{
        setIsLoading(true);
        try{
            const response : AxiosResponse = await axios(baseEndpoint+path,options)
            setData(response.data.data)
        }
        catch(error){
            setError(true);
        }

        setIsLoading(false)
    },[path,options])

    return {isLoading, error, data, fetchData};

}