import axios from "axios"
const URi = "http://localhost:5001/api"

export const fetchNewsUnitTest =async  (id:string, limit:string)=>{
    const response = await axios.get(`${URi}/feed/getall?id=${id}&limit=${limit}`)
    return response
}

module.exports=fetchNewsUnitTest