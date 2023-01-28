import { URi } from "../../Const/Const";
import axios from "axios";

export async function fetchNews(id:any){
    console.log(id?.payload[0]?.id);
    
    if(id?.payload[0]?.id){
        const response = await axios.get(`${URi}/feed/getall?id=${id?.payload[0]?.id}&limit=${id?.payload[1] || ''}`)
        return response.data
    }
    const response = await axios.get(`${URi}/feed/getall?limit=${id?.payload[1] || id?.payload[0]}`)
    return response.data
}

export async function fetchNewsUnit(id:string, limit:string){
    const response = await axios.get(`${URi}/feed/getall?id=${id}&limit=${limit}`)
    return response
}


