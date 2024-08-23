import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice";
import authSliceReducer from "./authSlice";
import latestMessagesSliceReducer from "./latestMessagesSlice";
import sentMessageReducer from "./sendMessageSlice";
// import socketSliceReducer from "./socketSlice";

export const store=configureStore({
    reducer:{
        themeKey:themeSliceReducer,
        authKey:authSliceReducer,
        latestMessageKey:latestMessagesSliceReducer,
        sentMessageKey:sentMessageReducer
        
    }
});