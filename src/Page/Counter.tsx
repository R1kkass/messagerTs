import React,{FC} from "react";
import { useDispatch, useSelector } from "react-redux";

interface TCount {
    counter: {
        counter: string | number
    }
}


const Counter:FC = ()=>{
    const count = useSelector((state:TCount)=>state.counter.counter)
    const dispatch = useDispatch()

    return(
        <div>
            <button onClick={()=>dispatch({type:"MINUS"})}>-</button>
            <button onClick={()=>dispatch({type:"PLUS"})}>+</button>
            {count}
        </div>
    )
}

export default Counter