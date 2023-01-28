import axios from "axios";
import jwtDecode from "jwt-decode";
import {  URi } from "../../Const/Const";



export async function fetchChat(){
    let tokensMain: any = jwtDecode(localStorage.getItem('token') || '')
    console.log(tokensMain);
    
    const response = await axios.get(`${URi}/chat/getall?email=${tokensMain.email}`)
    return response
}