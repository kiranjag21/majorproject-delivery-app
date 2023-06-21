

export const Connection = (state = {
    connection: null
}, action) => {

    switch (action.type) {

        case 'ADD_CONNECTION':
            //console.log('in add con ', action.payload)
            return { ...state, connection: action.payload };

        case 'DISCONNECT':
            return { ...state, connection: null };

        default:
            return state;
    }
}