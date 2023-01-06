import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { domen } from "../../Const/Const";
import { IReduceState } from "../../types/IReduce";

const LeftBlockMain:FC = memo(()=>{
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
})

export default LeftBlockMain