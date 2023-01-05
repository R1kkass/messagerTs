import axios, { Axios } from "axios";
import React, { FC, memo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { tokenAction } from "store/token";
import { URi } from "../../Const/Const";
import { FetchOneUser } from "../../Page/Main/MainService";
import { mainAction } from "../../store/main";
import { IReduceState, IToken } from "../../types/IReduce";
import ModalWindow from "../ModalWindow/ModalWindow";
import './ModalForEdit.scss'

interface IProps{
    user:IToken | null
}

const ModalForEdit:FC<IProps> = memo(()=>{

    const dispatch = useDispatch()
    const params = useParams<any>()
    const user =useSelector((state: IReduceState)=>state.token.token)
    const  func =async ()=>{
        console.log(user.id);
        
        const res:any = await FetchOneUser(user.id || '0')
        dispatch(mainAction(res))
        console.log(user);
        
    }

    const [visible, setVisble] = useState(true)
    const [err, setErr] = useState('')
    const [buttonDis, setButtonDis] = useState(false)

    let formData = new FormData();
    const photoRef = useRef<any>(null)
    const editPhoto = async ()=>{
        console.log(photoRef?.current?.files);
        formData.append('email', user?.email || '') 
        formData.append('img', photoRef?.current?.files[0] || '')
        setButtonDis(true)
    const response = axios
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
        <ModalWindow >
            <div className="ModalForEdit">
                <input accept=".jpg" ref={photoRef} type="file"/>
                <Button disabled={buttonDis} onClick={editPhoto}>Сохранить</Button>
                {err}
            </div>
        </ModalWindow>   
    )
})

export default ModalForEdit