

export const Auth = (state = {
    userId: null
}, action) => {

    switch(action.type){
        
        case 'ADD_USER':
            return{...state, userId: action.payload};
        case 'REMOVE_USER':
            return {...state, userId: null}

        default:
            return state;
    }
}