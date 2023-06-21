export const addOrder = (order) => ({
    type: 'ADD_ORDER',
    payload: order
});
export const removeOrder = (order) => ({
    type: 'REMOVE_ORDER',
    payload: order
});
export const addLiveOrder = (order) => ({
    type: 'ADD_LIVE_ORDER',
    payload: order
});
export const removeLiveOrder = (order) => ({
    type: 'REMOVE_LIVE_ORDER',
    payload: order
});
export const orderPickup = (order) => ({
    type: 'ORDER_PICKUP_COMPLETE',
    payload: order
});
export const setConnection = (con) => ({

    type: 'ADD_CONNECTION',
    payload: con
});
export const addUser = (id) => ({
    type: 'ADD_USER',
    payload: id
});
export const removeUser = () => ({
    type: 'REMOVE_USER'
});
export const disconnect = () => ({
    type: 'DISCONNECT',
    payload: null
});