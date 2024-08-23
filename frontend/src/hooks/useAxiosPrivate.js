import { useEffect } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../Features/authSlice";
import useSocket from '../hooks/userSocket';
import { io } from 'socket.io-client';
const ENDPOINT="http://localhost:5000"

const DECODE_URI="/auth/decode-token"

const useAxiosPrivate=()=>{
    const token=Cookies.get("accessToken");
    const dispatch=useDispatch();
    const auth=useSelector(state=>state.authKey);
    const navigate=useNavigate();
    const {socket,setSocket}=useSocket();

    useEffect(()=>{
        
    // console.log("hi");
    // console.log(auth);
    // console.log("token",token);

    const decodeTokenAndSetAuth=async()=>{
        if(Object.keys(auth).length === 0 && token){
            try {
                // console.log("trying");
                // console.log("token",token);
                const res=await axios.post(DECODE_URI,{token:token});
                // console.log(res.data);
                dispatch(setAuth(res.data));
                // if(!socket){
                //     setSocket(io(ENDPOINT));
                    
                // }
                // socket.emit("setup",auth);
            } catch (error) {
                if(error.response?.data?.error){
                    console.log(error.response?.data?.error);
                }
            }
        }
    }

    decodeTokenAndSetAuth();

        
    },[socket])

    return axios;
}

export default useAxiosPrivate;

