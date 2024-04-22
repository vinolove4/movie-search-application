import { useEffect, useRef } from "react";
import {Timer} from "../types"

export const useDebounce = () => {

    let intervalRef = useRef<Timer>()

    useEffect(()=>{
        return ()=>{
            if(!intervalRef.current) return
            clearTimeout(intervalRef.current)
        }
    }, [])

    const debounce = (callback: ()=>any, time: number) => {
        if(intervalRef.current){
            clearTimeout(intervalRef.current)
        }

        intervalRef.current = setTimeout(()=>{
            callback()
        }, time)
    }

    return {debounce}
}