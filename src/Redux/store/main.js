const inialSTate = {
    mainInfo:{},
}

const ADD = 'ADD'
const ASYNC_ADD = 'ASYNC_ADD'

export const mainReducer = (state=inialSTate, action)=>{
    switch (action.type){
        case ADD:
            return {...state, mainInfo: action.mainInfo}
        default:
            return state
    }
}

export const mainAction = (payload)=>({type:ADD, mainInfo: payload})
export const mainAsyncAction = () => ({type: ASYNC_ADD})
