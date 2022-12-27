const initialState = {
    counter: 0
}

export const counterReducer = (state=initialState, action)=>{
    switch (action.type){
        case "PLUS":
            return {...state, counter: state.counter + 1}
        case 'MINUS':
            return {...state, counter: state.counter - 1}   
        default:
            return state 
    }
}

