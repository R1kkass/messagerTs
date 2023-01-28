import jwtDecode from "jwt-decode";
import Feed from "../../Page/Feed/Feed";
import { memo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mainAsyncAction } from "../../Redux/store/main";
import { domen } from "../../Const/Const";
import { IToken } from "../../types/IReduce";
import ModalForEdit from "../ModalForEdit/ModalForEdit";
import VisibleWindow from "../../UI/VisibleWindow/VisibleWindow";
import LaftBlockAllSub from "components/LeftBlockMain/LeftBlockAllSub";

const MainYourComponent = memo(()=>{
    const [visible,setVisible] = useState(false)
    const user:IToken | null = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : null
    
    const dispatch = useDispatch()

    const users = ()=>{
        dispatch(mainAsyncAction())
    }
    
    return(
        <div className="Main__info">
                <div className="Info__fixed">
                    <div>
                        <img src={`http://${domen}/${user?.img}`} alt="" />
                        <p>{user?.name}</p>
                        <Button onClick={()=>setVisible(e=>!e)}>Создать чат</Button>
                        <VisibleWindow visible={visible}/>
                        <ModalForEdit callback={users}/>
                        <Feed />
                        <LaftBlockAllSub />
                        <LaftBlockAllSub bol={true}/>
                    </div>
                </div>
            </div>
    )
})

export default MainYourComponent