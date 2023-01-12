import axios from "axios";
import { URi } from "Const/Const";

export async function feedFetch(formData:any){
    const response = await axios({
        method: 'post',
        url:`http://localhost:5001/api/feed/create`,
        data: formData.formData,
        headers:{
            Authorization: `bearer ${localStorage.getItem('token') || ''}`
        }
    })
    return response
}