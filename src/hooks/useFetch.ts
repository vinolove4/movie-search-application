import {BASE_URL} from "../constant";
import {toast} from "react-toastify"

export const useFetch = () => {
    const fetchApi = async(params: string) => {
        const result = await fetch(`${BASE_URL}${params}`).then(res => res.json());
        if(result.Response === "False"){
            toast.error(result.Error || "Something went wrong", {position: "bottom-right"})
        }
        
        return result
    }

    return {
        fetchApi
    }
}