import { createSlice } from "@reduxjs/toolkit";

export const sentMessageSlice=createSlice({
    name:"sentMessageSlice",
    initialState:true,
    reducers:{
        setSendMessage:(state,action)=>{
            return action.payload;
        }
    }
})

export const {setSendMessage}=sentMessageSlice.actions;
export default sentMessageSlice.reducer;