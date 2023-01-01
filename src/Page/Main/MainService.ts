import axios from "axios";
import jwtDecode from "jwt-decode";
import { URi } from "../../Const/Const";

interface IToken{
    email?: string,
}

const tok = localStorage.getItem('token') 
const token: IToken  = tok ?  jwtDecode(localStorage.getItem('token') || '') : {}

interface IUser{
    data:{
        user: {

        }
    }
}

export async function FetchOneUser(id:string){
    
    const response:IUser = await axios.post(`http://localhost:5001/api/user/getone`,{
        id: id,
    })
    const a  = response.data.user
    return a
}