import axios from 'axios'
import getApi from "../helperClass/getApi.tsx";
import type {Source} from "../types/types.ts";
import {useEffect, useState} from "react";

const useFetch = (source: Source, pathVaiable?: string ) => {
    const api = getApi(source)
    const [data, setData] = useState<any>(undefined)
    useEffect(() => {
        console.log("api", api)
        axios.get(api, {
            params: pathVaiable && {location: pathVaiable}
        }).then(response => {
            console.log('??? response', response)
            setData(response.data)
        })
    }, [api, pathVaiable, source]);
    return data
}
export default useFetch