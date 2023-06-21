

export const LiveOrders = (state = {

    liveOrders: []
}, action) => {

    switch (action.type) {

        case 'ADD_LIVE_ORDER':
            var order = action.payload;
            order.pickstatus = false;
            return { ...state, liveOrders: state.liveOrders.concat(order) };
        case 'REMOVE_LIVE_ORDER':
            var order = action.payload;
            return { ...state, liveOrders: state.liveOrders.filter(x => x.uniqueId !== order.uniqueId) }
        case 'ORDER_PICKUP_COMPLETE':
            var order = action.payload;
            var i = state.liveOrders.findIndex(obj => obj.uniqueId === order.uniqueId)
            console.log('from redux ',state.liveOrders[i])
            var newOb = state.liveOrders;
            newOb[i].pickstatus = true;
            return { ...state, liveOrders: newOb}

        default:
            return state;
    }
}