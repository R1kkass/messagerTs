import ModalWindow from "UI/ModalWindow/ModalWindow"
import { domen, URi } from "Const/Const"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { asyncSubAction, asyncSubsAction } from "Redux/store/sub"
import { IReduceState } from "types/IReduce"
import './Subs.scss'
import { FC } from "react"


const LaftBlockAllSub:FC<{bol?: boolean}> = ({bol}) => {
    const params = useParams()
    const dispatch = useDispatch()
    const subs = useSelector((state: IReduceState) => state.sub.sub)
    const ur = useSelector((state: IReduceState) => state.sub.ur)

    const fetchSub = async () => {
        await dispatch(asyncSubAction(params.id || 0))
    }

    const fetchUrSub = async () => {
        await dispatch(asyncSubsAction(params?.id || 0))
        console.log(ur);
        
    }

    if(bol){
        return(
            <ModalWindow callback={() => fetchUrSub()} data-testid='toggle-btn' nameButton="Подписки">
            {ur?.map((sub) => (
                <Link to={`/my/${sub['user.id']}`}>
                    <div data-testid="subTest" className="AllSubs">
                        <div>
                            <img src={"http://" + domen + '/' + sub['user.img']} />
                        </div>
                        <div>
                            {sub['user.name']}
                        </div>
                    </div>
                </Link>
            ))}
        </ModalWindow>
        )
    }

    return (
        <ModalWindow callback={() => fetchSub()} data-testid='toggle-btn' nameButton="Подписчики">
            {subs?.map((sub) => (
                <Link to={`/my/${sub.user.id}`}>
                    <div data-testid="subTest" className="AllSubs">
                        <div>
                            <img src={"http://" + domen + '/' + sub.user.img} />
                        </div>
                        <div>
                            {sub.user.name}
                        </div>
                    </div>
                </Link>
            ))}
        </ModalWindow>
    )
}

export default LaftBlockAllSub