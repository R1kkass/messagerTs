import React, { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import ListChat from "../ListChat/ListChat";
import VisibleWindow from "../VisibleWindow/VisibleWindow";

interface IUser{
    user:{
        photoURL: string,
        email:string,
        displayName:string,
    }
}

const MainYour:FC<IUser> = memo(({user})=>{

    const [visible, setVisible] = useState<boolean>(false)

        return(<div className="Main">
            <div className="Main__info">
                <div>
                    <img src={user?.photoURL} alt="" />
                    <p>{user?.email}</p>
                    <p>{user?.displayName}</p>
                    <p onClick={()=>setVisible(e=>!e)}>Создать чат</p>
                    <VisibleWindow visible={visible}/>
                </div>
            </div>
            <div className="Main__block">
                <ListChat/>
            </div>
        </div>
        )
})

export default MainYour