import axios from "axios";
import { URi } from "Const/Const";
import { IMessage } from "./LeftBlockMain";

export async function subscribeApi(id: string, userId: string){
    const resp = await axios.post(`${URi}/sub/create`, {
        subscribeId: id,
        userId: userId
    },
    {
        headers:{
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    }
    )

    return resp
}

export async function checkSub(id: string, userId: string){
    console.log(id, userId);
    
    const resp = await axios.get(`${URi}/sub/getOne?subscribeId=${id}&userId=${userId}`,
        {headers:{
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }}
    )
    console.log(resp);
    
    return resp?.data
}

export async function unSub(id: string, userId: string){
    
    const resp = await axios.post(`${URi}/sub/delete`,
    {
        subscribeId: id,
        userId: userId
    },
        {headers:{
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }}
    )
    return resp?.data
}

export async function allSub(id: string){
    
    const resp = await axios.get(`${URi}/sub/getall?subscribeId=${id}`,

        {headers:{
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }}
    )
    return resp
}