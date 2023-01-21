import ModalWindow from "components/ModalWindow/ModalWindow"
import { domen, URi } from "Const/Const"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { asyncSubAction } from "store/sub"
import { IReduceState } from "types/IReduce"
import { allSub } from "./LeftBlockSevice"


const LaftBlockAllSub = ()=>{
    const params = useParams()
    const dispatch = useDispatch()
    const subs = useSelector((state:IReduceState)=>state.sub.sub)
    const fetchSub= async () => {
        await dispatch(asyncSubAction(params.id || 2))  
    }

    return(
        <ModalWindow callback={()=>fetchSub()} data-testid='toggle-btn' nameButton="Подписчики">
            {subs?.map((sub)=>(
                <div data-testid="subTest">
                    <img src={"https://"+domen+'/'+sub.user.img} />
                    <p>
                    {sub.user.name}
                    </p>
                </div>
            ))}
        </ModalWindow>
    )
}

export default LaftBlockAllSub