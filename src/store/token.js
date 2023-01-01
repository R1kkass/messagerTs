
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

export const tokenAction = ()=>({type:"ASYNC_EDIT", token: localStorage.getItem('token')})