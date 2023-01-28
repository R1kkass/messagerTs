import jwtDecode from "jwt-decode"

const intialState = {
    token: localStorage.getItem('token'),
    date: Date.now()
}

export const tokenReducer = (state = intialState, action)=>{
    switch(action.type){
        case 'EDIT_TOKEN':
            return {...state, token: action.token, date: Date.now()}
        default:
            return state
    }
}

export const tokenAction = ()=>({type:"EDIT_TOKEN", token: jwtDecode(localStorage.getItem('token')), date: Date.now()})