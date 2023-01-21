import { URi } from "../../Const/Const";
import axios from "axios";

export async function fetchNews(id:any){
    
    if(id?.payload[0]?.id){
        const response = await axios.get(`${URi}/feed/getall?id=${id?.payload[0]?.id}&limit=${id?.payload[1]|| ''}`)
        return response.data.feed
    }
    const response = await axios.get(`${URi}/feed/getall?limit=${id?.payload[1] || id?.payload[0]}`)
    return response.data.feed
}

export async function fetchNewsUnit(id:string, limit:string){
    const response = await axios.get(`${URi}/feed/getall?id=${id}&limit=${limit}`)
    return response
}

const fetchNewsUnitTest =async  (id:string, limit:string)=>{
    const response = await axios.get(`${URi}/feed/getall?id=${id}&limit=${limit}`)
    return response
}

