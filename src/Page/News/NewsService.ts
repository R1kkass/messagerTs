import axios from "axios";
import { URi } from "../../Const/Const";

export async function fetchNews(id:any){
    console.log(id);
    
    if(id?.payload){
        const response = await axios.get(`${URi}/feed/getall?id=${id?.payload?.id}`)
        return response.data.feed
    }
    const response = await axios.get(`${URi}/feed/getall`)
    return response.data.feed
}

export async function fetchNewsUnit(id:string, limit:string){
    const response = await axios.get(`${URi}/feed/getall?id=${id}&limit=${limit}`)
    return response
}