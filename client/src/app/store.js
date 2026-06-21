import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../features/user/userSlice.js';
import connectionsReducer from '../features/connections/connectionsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import themeReducer from '../features/theme/themeSlice.js';


export const store = configureStore({
    reducer: {
        user: useReducer,
        connections: connectionsReducer,
        messages: messagesReducer,
        theme: themeReducer
    }
})