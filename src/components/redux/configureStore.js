
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Connection } from './pusherConnection';
import { ReceivedOrders } from './orders';
import { LiveOrders } from './liveorders';
import { Auth } from './auth';
export const configureStore = () => {
    const store = createStore(
        combineReducers({
            connection: Connection,
            receivedOrders: ReceivedOrders,
            liveOrders: LiveOrders,
            auth: Auth
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}