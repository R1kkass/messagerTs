import Chat from "../../Page/Chat/Chat";
import Feed from "../../Page/Feed/Feed";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
const News = lazy(() => import('../../Page/News/News'));
const Login = lazy(() => import('../Login/Login'));
const Registration = lazy(() => import('../Login/Registration'));
const Websoket = lazy(() => import('../Websocket/Websoket'));

const MyRouter = ()=>{
    return(
        <>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            
              <Route path = "/im/:id" element={<Websoket/>} />
              <Route path = "*" element = {<h2>404</h2>} />
              <Route path = "/" element={<>Чё</>} />
              <Route path = "/login" element={<Login/>} />
              <Route path = "/my/:id" element={<Main/>} />
              <Route path = "/registration" element = {<Registration/>}/>
              <Route path = "/news" element = {<News/>}/>
              <Route path = "/chat" element = {<Chat/>}/>
          </Routes>
          </Suspense>
        </>
    )
}

export default MyRouter