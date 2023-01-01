import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Counter from "../Counter";
import Login from "../Login/Login";
import Registration from "../Login/Registration";
import Main from "../Main/Main";
import Websoket from "../Websocket/Websoket";

const MyRouter = ()=>{
    return(
        <>
          <Routes>
            <Route path = "/im/:id" element={<Websoket/>} />
            <Route path = "*" element = {<h2>404</h2>} />
            <Route path = "/" element={<Counter/>} />
            <Route path = "/login" element={<Login/>} />
            <Route path = "/my/:id" element={<Main/>} />
            <Route path = "/registration" element = {<Registration/>}/>
            </Routes>
        </>
    )
}

export default MyRouter