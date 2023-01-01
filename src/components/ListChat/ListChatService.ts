import axios from "axios";
import { useSelector } from "react-redux";
import { tokens, URi } from "../../Const/Const";
import { IReduceState, IToken } from "../../types/IReduce";

let tokensMain: any = tokens


export function fetchChat(){
    const response = axios.get(`${URi}/chat/getall?email=${tokensMain.email}`)
    return response
}