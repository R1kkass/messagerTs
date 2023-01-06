import { domen } from "Const/Const";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IReduceState } from "types/IReduce";

export interface IListChat{
    listChat:{
        data:{
            user:{
                secondUser: string,
                userCreator: string
            }
        }
    }
    
}

interface IListUser{
    email: string
}

const WebSocketUserTop:FC<any> = ()=>{
    const listChat:any = useSelector((state:IReduceState)=>state.chat.chats)
    const user:IListUser = useSelector((state:IReduceState)=>state.token.token)
    
    const params = useParams()
    const list:any = useMemo(()=>{
        return listChat?.data?.user?.filter((i:any)=>{
            return params?.id == i?.idRoom
        })
    },[listChat])
    console.log(list);

    return(

        <>
               
        <div className="Websocket__chatTop">
            <div>
                {list ?
                list[0]?.secondUser !== user?.email  ? 
                <>
                    <img src={`http://${domen}/${list[0]?.secondUser}.jpg`} alt=""/>
                    {list[0]?.secondUser}  
                </>
                : 
                <>
                    <img src={`http://${domen}/${list[0]?.userCreator}.jpg`} alt=""/>
                    {list[0]?.userCreator}
                </>
                : 
                ''  
                }
            </div>
          </div>
        </>
    )
}

export default WebSocketUserTop