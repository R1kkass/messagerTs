import axios from "axios"
import { URi } from "../../Const/Const"
import { IUnitComment } from "./Comment"

interface IFecthComment{
    data:{
        comment: IUnitComment[]
    }
}

export const addComment = async ( feedId: number, userId: string, text: string)=>{
    const response = await axios.post(`${URi}/comment/create`, {
        text: text,
        userId: userId,
        feedId: feedId
    })

    return response
}

export const fetchComment = async ( id: number )=>{
    const response:IFecthComment = await axios.get(`${URi}/comment/getall?id=${id}`)

    return response.data?.comment
}