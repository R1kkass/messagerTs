import axios from "axios";
import React, { FC, memo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FetchOneUser } from "../../Page/Main/MainService";
import { mainAction } from "../../store/main";
import { IReduceState, IToken } from "../../types/IReduce";
import ModalWindow from "../ModalWindow/ModalWindow";
import './ModalForEdit.scss'

interface IProps{
    user?:IToken | null,
    callback?: ()=>void
}

const ModalForEdit:FC<IProps> = memo(()=>{

    const dispatch = useDispatch()
    const user =useSelector((state: IReduceState)=>state.token.token)
    const func =async ()=>{
        console.log(user.id);
        
        const res:any = await FetchOneUser(user.id || '0')
        dispatch(mainAction(res))
        console.log(user);
    }

    const [err, setErr] = useState('')
    const [buttonDis, setButtonDis] = useState(false)

    let formData = new FormData();
    const photoRef = useRef<any>(null)
    const editPhoto = async ()=>{
        formData.append('email', user?.email || '') 
        formData.append('img', photoRef?.current?.files[0] || '')
        setButtonDis(true)
    axios
    ({
        method: 'post',
        url: `http://localhost:5001/api/settinguser/create`,
        data: formData,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': `multipart/form-data;`,
        },
    })
    .then(()=>{
        func()
        formData.delete('img')
        formData.delete('email')
        setButtonDis(false)
    })
    .catch(()=>{
        setErr('Ошибка')
    })

    }

    return (
        <ModalWindow nameButton="Изменить аватар">
            <div className="ModalForEdit">
                <input accept=".jpg" ref={photoRef} type="file"/>
                <Button disabled={buttonDis} onClick={editPhoto}>Сохранить</Button>
                {err}
            </div>
        </ModalWindow>   
    )
})

export default ModalForEdit