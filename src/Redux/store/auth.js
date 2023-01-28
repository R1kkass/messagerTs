import { initializeApp } from "firebase/app"
import * as firestore from 'firebase/firestore'
import * as auth from 'firebase/auth'

const initialState = {
    auth: auth,
    firestore: firestore,
    firebase: initializeApp({
        apiKey: "AIzaSyAVVAbmgUNiV3OXRC047hQRkgEPfxY4oUg",
        authDomain: "react-chat-7fdc3.firebaseapp.com",
        projectId: "react-chat-7fdc3",
        storageBucket: "react-chat-7fdc3.appspot.com",
        messagingSenderId: "765963838104",
        appId: "1:765963838104:web:991396921ce6951c65a6ed",
        measurementId: "G-1QQPFLJ4ZB"
      })
}

export const authReducer = (state=initialState, action)=>{
    switch (action.type){
        case "ADD_AUTH":
            return {...state, auth: action.auth}
        case "ADD_FIRESTORE":
            return {...state, firestore: action.firestore}
        case "ADD_FIREBASE":
            return {...state, firebase: action.firebase}
        default:
            return state
    }
}