import React, { FC } from "react";
import { useSelector } from "react-redux";
import { domen } from "../../Const/Const";
import { IReduceState } from "../../types/IReduce";

interface IUser{
    img: string,
    email: string,
    displayName:string
    
}

const LeftBlockMain:FC<any> = ({user})=>{
    const users = useSelector((state:IReduceState) => state.token.token)

    return (
        <div className="Main__info">
                <div>
                    <img src={`http://${domen}/${users?.img}`} alt="" />
                    <p>{users?.email}</p>
                    <p>{users?.displayName}</p>

                </div>
            </div>
    )
}

export default LeftBlockMain