import React, { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainAsyncAction } from "../../store/main";
import { domen } from "../../Const/Const";
import { IReduceState } from "../../types/IReduce";

const LeftBlockMain:FC = memo(()=>{
    const users = useSelector((state:IReduceState) => state.mainInfo.mainInfo)
    const dispatch = useDispatch() 

    useEffect(()=>{
        dispatch(mainAsyncAction())
    },[])
    
    return (
        
        <div className="Main__info">
              <div className="Info__fixed">
                    <div>
                        <img src={`http://${domen}/${users?.img}`} alt="" />
                        <p>{users?.email}</p>
                    </div>
                </div>
            </div>
    )
})

export default LeftBlockMain