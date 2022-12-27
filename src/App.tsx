import Websoket from './Websoket';
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Counter from './Page/Counter';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from 'firebase/app'
import * as firestore from 'firebase/firestore'
import * as auth from 'firebase/auth'
import Login from './Page/Login/Login';
import Layout from './components/Layout/Layout';
import { initializeApp} from 'firebase/app';

function App() {
  


  return (
      <div className="App">
        <Layout />
        <BrowserRouter>
          <Routes>
            <Route path = "/:id" element={<Websoket/>} />
            <Route path = "/" element={<Counter/>} />
            <Route path = "/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
