import { Backdrop, CircularProgress } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
const SEARCH_URI="/user/search-users"
const ACCESS_CHAT_URI="/chat"
import {AnimatePresence, motion} from "framer-motion"
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const UsersList = ({searchQuery}) => {
  const axios=useAxiosPrivate();
  const lightTheme=useSelector((state)=>state.themeKey);
  const auth=useSelector((state)=>state.authKey);

  const navigate=useNavigate();

  const [users,setUsers]=useState([]);
  const [searchedUsers,setSearchedUsers]=useState([]);
  const [loading,setLoading]=useState(false);

    const token=Cookies.get("accessToken");
    const config={headers:{
        Authorization:`Bearer ${token}`
    }}


    useEffect(()=>{
        const fetchUsers=async()=>{
            
            try {
                setLoading(true);
                console.log(config);
                const res=await axios.get(SEARCH_URI,config);
                console.log(res.data);
                setUsers(res.data.filter(user=>user._id!=auth._id));
                setSearchedUsers(res.data.filter(user=>user._id!=auth._id));
            } catch (error) {
                console.log(error.response?.data);
            } finally{
                setLoading(false);
            }
        }
        fetchUsers();
    },[])

    useEffect(()=>{
        if(searchQuery==""){
            setSearchedUsers(users);
        }
        else{
            const temp=users.filter((user)=>user.userName.toLowerCase().startsWith(searchQuery.toLowerCase()));
            setSearchedUsers(temp);
            
        }
    },[searchQuery])


    const handleClick=async(userId,userName,profilePicture)=>{
        try {
            setLoading(true);
            const res=await axios.post(ACCESS_CHAT_URI,{userId},config);
            console.log(res.data);
            navigate(`/app/chat/${res.data._id}`,{state:{chatName:userName,profilePicture},replace:true});
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }



  return (
    <div className={`max-w-full m-2 rounded-2xl py-1 px-2 flex-1 overflow-y-scroll ${!lightTheme ? 'dark':'bg-white '}`} style={{scrollbarWidth:"none",boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
        
        <Backdrop open={loading}>
            <CircularProgress color='inherit' />
        </Backdrop>

        <AnimatePresence>

            {searchedUsers.map((user)=>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={()=>handleClick(user._id,user.userName,user.profilePicture)}
            key={user._id} className={`cursor-pointer flex space-x-2 p-2 items-center rounded-2xl ${!lightTheme?'bg-transparent hover:bg-[#252323c5] active:bg-[#2d2c2cc5]':'hover:bg-gray-100 active:bg-gray-50'}`}>
                <div>
                    {user.profilePicture? 
                    <img className='rounded-full w-10 h-10 object-cover' src={user.profilePicture.url} /> : 
                    <p className={`w-8 h-8 flex items-center justify-center  text-white text-3xl rounded-full font-semibold p-5 ${!lightTheme?'bg-[#5a5959]':'bg-[#d9d9d9]'}`}>{user.userName[0].toUpperCase()}</p>}
                    
                </div>

                <div>
                    {user.userName}
                </div>


            
            </motion.div>)
            
            }



        </AnimatePresence>



    
    
    
    </div>
  )
}

export default UsersList