import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:"authSlice",
    initialState:{},
    reducers:{
        setAuth:(state,action)=>{
            return {...state,...action.payload};
        }
    }
})

export const {setAuth}=authSlice.actions;
export default authSlice.reducer;