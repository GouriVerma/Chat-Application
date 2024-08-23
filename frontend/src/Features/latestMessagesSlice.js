import { createSlice } from "@reduxjs/toolkit";

const latestMessageSlice=createSlice({
    name:"latestMessageSlice",
    initialState:[],
    reducers:{
        addMessageToLatestMessage:(state,action)=>{
            state.push(action.payload);
            return state;
        },
        deleteMessageFromLatestMessage:(state,action)=>{
            console.log("state ",state);
            return state.filter((message)=>message?.chat?._id!=action.payload); //payload is chatId here
        }
    }
})


export const {addMessageToLatestMessage,deleteMessageFromLatestMessage}=latestMessageSlice.actions;
export default latestMessageSlice.reducer;
