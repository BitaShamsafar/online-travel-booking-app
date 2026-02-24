import axios from 'axios'
import getApi from "../helperClass/getApi.tsx";
import type {Source} from "../types/types.ts";
import {useEffect, useMemo, useState} from "react";

const useFetch = (source: Source, pathVaiable?: string  ) => {
    const api = getApi(source)
    const param = useMemo(() => {
        if(source === 'hotelSearch'){
            return ({
                params: {location: pathVaiable}
            })
        }
        return undefined
    }, [pathVaiable, source])
    const finalAPI = source === 'hotel' ? api + pathVaiable : api
    const [data, setData] = useState<any>(undefined)
    useEffect(() => {
        axios.get(finalAPI, param).then(response => {
            console.log('??? response', response)
            setData(response.data)
        })
    }, [api, finalAPI, param, pathVaiable, source]);
    return data
}
export default useFetch