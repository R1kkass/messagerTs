import { domen } from "Const/Const";
import React, { FC, memo, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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

interface IList{
    secondUser: string,
    userCreator: string,
    id: string
}

const WebSocketUserTop:FC = memo(()=>{
    const listChat:any = useSelector((state:IReduceState)=>state.chat.chats)
    const user:IListUser = useSelector((state:IReduceState)=>state.token.token)
    
    const params = useParams()
    const list:IList[] = useMemo(()=>{
        return listChat?.data?.user?.filter((i:any)=>{
            return params?.id == i?.idRoom
        })
    },[listChat])

    return(

        <>
               
        <div className="Websocket__chatTop">
            <div>
                {list ?
                list[0]?.secondUser !== user?.email  ? 
                <>
                    <Link to={`/my/${list[0].secondUser}`}>
                        <img src={`http://${domen}/${list[0]?.secondUser}.jpg`} alt=""/>
                        {list[0]?.secondUser}  
                    </Link>
                </>
                : 
                <>
                    <Link to={`/my/${list[0].userCreator}`}>
                        <img src={`http://${domen}/${list[0]?.userCreator}.jpg`} alt=""/>
                        {list[0]?.userCreator}
                    </Link>
                </>
                : 
                ''  
                }
            </div>
          </div>
        </>
    )
})

export default WebSocketUserTop