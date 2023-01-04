import axios, { Axios } from "axios";
import React, { FC, memo, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { URi } from "../../Const/Const";
import { FetchOneUser } from "../../Page/Main/MainService";
import { mainAction } from "../../store/main";
import { IToken } from "../../types/IReduce";
import ModalWindow from "../ModalWindow/ModalWindow";
import './ModalForEdit.scss'

interface IProps{
    user:IToken | null
}

const ModalForEdit:FC<IProps> = memo(({user})=>{

    const dispatch = useDispatch()
    const params = useParams<any>()
    const  func =async ()=>{
        const res:any = await FetchOneUser(params.id || '0')
        dispatch(mainAction(res))
        console.log(user);
        
    }

    let formData = new FormData();
    const photoRef = useRef<any>(null)
    const editPhoto = async ()=>{
        console.log(photoRef?.current?.files);
        formData.append('email', user?.email || '') 
        formData.append('img', photoRef?.current?.files[0] || '')
    const response = await axios
    ({
        method: 'post',
        url: `http://localhost:5001/api/settinguser/create`,
        data: formData,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': `multipart/form-data;`,
        },
    })
    func()
    }

    return (
        <ModalWindow>
            <div className="ModalForEdit">
                <input accept=".jpg" ref={photoRef} type="file"/>
                <Button onClick={editPhoto}>Сохранить</Button>
            </div>
        </ModalWindow>   
    )
})

export default ModalForEdit