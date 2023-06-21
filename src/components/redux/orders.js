

export const ReceivedOrders = (state = {
    receivedOrders: []
}, action) => {

    switch(action.type){
        
        case 'ADD_ORDER':
            var order = action.payload;
            return{...state, receivedOrders: state.receivedOrders.concat(order)};
        case 'REMOVE_ORDER':
            var order = action.payload;
            return {...state, receivedOrders: state.receivedOrders.filter(x => x.uniqueId !== order.uniqueId)}

        default:
            return state;
    }
}