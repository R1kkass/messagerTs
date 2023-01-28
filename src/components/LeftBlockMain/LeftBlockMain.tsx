import React, { FC, memo, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainAsyncAction } from "../../Redux/store/main";
import { domen } from "../../Const/Const";
import { IReduceState } from "../../types/IReduce";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { checkSub, subscribeApi, unSub } from "./LeftBlockSevice";
import jwtDecode from "jwt-decode";
import LeftBlockCreateChat from "./LeftBlockCreateChat";
import LaftBlockAllSub from "./LeftBlockAllSub";

export interface IMessage{
    message: any
}

const LeftBlockMain:FC = memo(()=>{
    const users = useSelector((state:IReduceState) => state.mainInfo.mainInfo)
    const dispatch = useDispatch() 
    const params = useParams()
    const [bol, setBool] = useState<boolean>(false)
    const code:any =localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : localStorage.getItem('token')

    async function subCheck(){
        const code:any =localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : localStorage.getItem('token')
         const resp:any = await checkSub(params.id || '', code.id || '')
         setBool(resp?.message)
    }

    useLayoutEffect(()=>{
        dispatch(mainAsyncAction())
        subCheck()
    },[])

    async function sub(){
        subscribeApi(params.id || '', code.id || '')
        .then(()=>{
           subCheck()
        })
    }

    function unDSub(){
        unSub(params.id || '', code.id || '')
        .then(()=>{
            subCheck()
        })
    }
    
    return (
        
        <div className="Main__info">
              <div className="Info__fixed">
                    <div>
                        <img src={`http://${domen}/${users?.img}`} alt="" />
                        <p>{users?.email}</p>
                        {bol ? 
                         <Button onClick={unDSub}>Вы подписаны</Button>
                         :
                         <Button onClick={sub}>Подписаться</Button>
                         }
                        <LeftBlockCreateChat users={users.email}/>
                        <LaftBlockAllSub/>
                    </div>
                </div>
            </div>
    )
})

export default LeftBlockMain