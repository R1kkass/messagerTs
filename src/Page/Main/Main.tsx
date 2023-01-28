import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Main.scss'
import { Link, useLocation, useParams } from "react-router-dom";
import { FetchOneUser } from "./MainService";
import { IReduceState } from "../../types/IReduce";
import { mainAction } from "../../Redux/store/main";
import News from "../News/News";

export interface IUser{
    img: string,
    name: string,
    email: string,
    displayName: string
}
export interface ITokenTake{
    email:string
}


const Main = memo(()=>{
    const location = useLocation()
    const dispatch = useDispatch()
    const params: any = useParams()
    const token:ITokenTake = useSelector((state:IReduceState)=>state.token.token)
    const userss = useSelector((state:IReduceState)=> state.mainInfo.mainInfo)
    const  func =async ()=>{
        const res:any = await FetchOneUser(params.id)
        dispatch(mainAction(res))
    }

    useEffect(()=>{
        func()
    },[location])

    
    if(token?.email===userss?.email){
        return(
            <News params={params} />
        )
    }

    if(localStorage.getItem('token')){
    return(
        <News params={params} />
    )
    }

    return(
        <div className="UnAuthorization">
            <div>
                <h2>Вы не авторизованы</h2>
                <Link to="/login">Авторизация</Link>
            </div>
        </div>
    )
})

export default Main