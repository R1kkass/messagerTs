import axios from "axios";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { tokens, URi } from "../../Const/Const";
import { IReduceState, IToken } from "../../types/IReduce";




export async function fetchChat(){
    let tokensMain: any = jwtDecode(localStorage.getItem('token') || '')
    
    const response = await axios.get(`${URi}/chat/getall?email=${tokensMain.email}`)
    return response
}