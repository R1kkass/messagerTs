import jwtDecode from "jwt-decode"

const intialState = {
    token: localStorage.getItem('token')
}

export const tokenReducer = (state = intialState, action)=>{
    switch(action.type){
        case 'EDIT_TOKEN':
            return {...state, token: action.token}
        default:
            return state
    }
}

export const tokenAction = ()=>({type:"EDIT_TOKEN", token: jwtDecode(localStorage.getItem('token'))})