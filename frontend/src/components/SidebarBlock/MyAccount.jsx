import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cookies from "js-cookie"

import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Email, Person, Phone } from '@mui/icons-material';
import { Backdrop, Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { AnimatePresence,motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import defaultPic from "../../images/1724230230656-66b20ec71a49919215383212-snehal - Copy - KUMAR SNEHAL.png"


const USERNAME_REGEX=/^[a-zA-Z0-9-_]{4,16}$/;

const USER_DETAILS_URI="/user"
const UPDATE_PHONE_URI="/user/phone"
const UPLOAD_PIC_URI="/user/profile-picture"

const MyAccount = () => {
  const axios=useAxiosPrivate();

  const lightTheme=useSelector((state)=>state.themeKey); 
  

  const [file,setFile]=useState(null);
  const [disabled,setDisabled]=useState(true);
  const [loading,setLoading]=useState(false);
  const [auth,setAuth]=useState({});
  const [phoneNo,setPhoneNo]=useState("");
  const [error,setError]=useState("");


  const token=Cookies.get("accessToken");
  const config={headers:{Authorization:`Bearer ${token}`}};

  const handleFileChange=async(e)=>{
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    const formData=new FormData();
    
    formData.append("file",e.target.files[0]);
    try {
      setLoading(true);
      
      const res=await axios.post(UPLOAD_PIC_URI,formData,config);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      console.log("Upload Failed");
    } finally{
      setLoading(false);
    }
    
    
    
  }

  useEffect(()=>{
    const fetchUserDetails=async()=>{
      try {
        setLoading(true);
        const res=await axios.get(USER_DETAILS_URI,config);
        console.log(res.data);
        setAuth(res.data);
        setPhoneNo(res.data.mobileNo);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }

    }
    fetchUserDetails();
  },[])

  const handleSavePhoneNo=async()=>{
    if(phoneNo.length!=10){
      setError("Invalid phone no");
    }
    else{
      try {
        setLoading(true);
        const res=await axios.put(UPDATE_PHONE_URI,{phoneNo},config);
        console.log(res.data);
        setAuth(res.data);
        setPhoneNo(res.data.mobileNo);
        setDisabled(true);
        setError("");
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }

    }
  }

  


  return (
    <div className={`flex flex-col gap-8 items-center max-w-full m-2 rounded-2xl py-4 px-2 flex-1 overflow-y-scroll ${!lightTheme ? 'dark':'bg-white '}`} style={{scrollbarWidth:"none",boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
      
      {/* backdrop */}
      <Backdrop open={loading} >
          <CircularProgress color="inherit" />
      </Backdrop>


      {/* profile pic */}
      <div className='relative'>
        <img src={file ? URL.createObjectURL(file) : (auth?.profilePicture ? auth.profilePicture.url : "https://adminlte.io/themes/AdminLTE/pages/examples/profile.html")} alt="" className='rounded-full w-24 h-24 object-cover' />
        <label htmlFor="profileImage"><CameraAltIcon className={`cursor-pointer p-1 absolute right-0 bottom-1 bg-[#129a6d] text-white rounded-full ${!disabled && 'cursor-pointer'}`} /></label>
        <input type="file" id='profileImage' className='hidden' onChange={handleFileChange} />
      </div>

      <div className='w-full flex flex-col gap-4'>
        {/* Name */}
        <div className=''>
          <div className='flex items-center gap-4'>
            <div>
              <Person className={`text-[#129a6d]`} />
            </div>
            <div>
              <p className={`text-xs text-gray-500`}>Username</p>
              <p className={`text-sm outline-none bg-transparent  ${!lightTheme ? 'text-white border-b-white' : 'border-b-black'}`}>{auth?.userName}</p>
            </div>
            
          </div>

          
            
        
        </div>

          {/* Email */}

        <div className='flex items-center gap-4'>
          <div>
            <Email className={`text-[#129a6d]`} />
          </div>
          <div>
            <p className={`text-xs text-gray-500`}>Email</p>
            <p className={`text-sm outline-none bg-transparent  ${!lightTheme ? 'text-white border-b-white' : 'border-b-black'}`}>{auth?.email}</p>
          </div>
          
        </div>



        {/* Phone no */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <Phone className={`text-[#129a6d]`} />
            </div>
            <div className='flex-1'>
              <p className={`text-xs text-gray-500`}>Phone
                <span className={`transition-opacity duration-100 text-xs text-red-400 italic ${error.length>0 ? "opacity-100" :"opacity-0"}`}>{" "+error}</span>

              </p>
              <input value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} type="text" className={`text-sm outline-none bg-transparent ${!disabled && 'border-b-[1px]'} ${!lightTheme ? 'text-white border-b-white' : 'border-b-black'}`} disabled={disabled} />
              
            </div>
            {!auth.mobileNo && <div onClick={()=>setDisabled(false)}> 
              <IconButton>
                <EditIcon className={`w-14 h-14 p-1 text-[#129a6d] rounded-full cursor-pointer`} />
              </IconButton>
            </div>}
          </div>

          
            {!disabled &&
            <motion.div
            initial={{ opacity: 0, scaleY:0, translateY:-20 }}
            animate={{ opacity: 1, scaleY:1, translateY:0 }}
           
             className='flex flex-row items-center justify-end gap-2 mt-2'>
              <button onClick={()=>{setDisabled(true);setError("");setPhoneNo(auth?.mobileNo)}} className='border-2 border-[#129a6d] text-[#129a6d] py-1 px-2 rounded-sm hover:bg-[#eef1f0] active:bg-[#dadada] '>Cancel</button>
              <button onClick={()=>handleSavePhoneNo()} className='bg-[#129a6d] text-white py-1 px-2 rounded-sm hover:bg-[#57b596] active:bg-[#418971]'>Save</button>
              
            </motion.div>
            }
        
        </div>

      
      </div>


    </div>
  )
}

export default MyAccount