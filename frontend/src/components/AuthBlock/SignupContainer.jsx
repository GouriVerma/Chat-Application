import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import network from '../../assets/network.png'
import {motion,AnimatePresence} from "framer-motion"

import Alert from '@mui/material/Alert';
import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const SIGNUP_URL="http://localhost:5000/api/auth/signup";
const SEARCH_URI="http://localhost:5000/api/user/search-users"

const USERNAME_REGEX=/^[a-zA-Z0-9-_]{4,16}$/;
const PWD_REGEX=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/;

const SignupContainer = () => {
  
  const navigate=useNavigate();

  const [userName,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [Error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [alertOpen,setAlertOpen]=useState(false);
  const [isValidUsername,setIsValidUsername]=useState(false);
  const [isValidPwd,setIsValidPwd]=useState(false);
  const [allUsers,setAllUsers]=useState([]);


  const handleSubmit=async (e)=>{
    e.preventDefault();


    try {
        setLoading(true);

        const config={
            headers:{
                "Content-type":"application/json",
            }
        }
        const res=await axios.post(SIGNUP_URL,{email,password,userName},config);
        console.log(res.data);
        navigate("/verify-otp",{replace:true,state:{user:res.data}});
        

        // var expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
        // Cookies.remove("accessToken");
        // Cookies.set("accessToken",res.data.accessToken,{expires:expiryTime});
        
    } catch (error) {
        if(error?.response){
            if(error.response.data?.error){
                setError(error.response.data.error);
            }
            else{
                if(error.response.status===500){
                    setError("Issue on server side");
                }
                else if(error.response.status===404){
                    setError("Not found");
                }
                else{
                    setError("Server isn't responding");
                }
            }
        }
        else{
            setError("Some error occured");
        }
        console.log(error);
        console.log(Error);
        setAlertOpen(true);
        
    }
    finally{
        setLoading(false);
    }

  }

    useEffect(()=>{

        //users load
        const fetchUsers=async()=>{
            const token=Cookies.get("accessToken");
            // const config={headers:{
            //     Authorization:`Bearer ${token}`
            // }}
            try {
                setLoading(true);
                const res=await axios.get(SEARCH_URI);
                console.log(res.data);
                setAllUsers(res.data);
            } catch (error) {
                console.log(error.response?.data);
            } finally{
                setLoading(false);
            }
        }
        fetchUsers();
    },[])

    useEffect(()=>{
        var result=USERNAME_REGEX.test(userName);
        if(allUsers.length>0){
            
            result=result && !allUsers.some(user=>user.userName==userName);
        }
       // console.log(result);
        setIsValidUsername(result);
    },[userName])

    useEffect(()=>{
        const result=PWD_REGEX.test(password);
       // console.log(result);
        setIsValidPwd(result);
    },[password])



  

  return (
    <div className='bg-[#f4f5f8] w-[90vw] h-[90vh] flex rounded-2xl shadow-sm'>

        {/* form */}
        <div className='flex-1 md:flex-[0.5] lg:flex-[0.4] m-4 bg-white rounded-2xl p-4 pt-12'>
            
            {/* for alert */}
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={()=>{setAlertOpen(false); setError(null)}}
                anchorOrigin={{ vertical:'top', horizontal:'right' }}                
            >
                <Alert   
                    onClose={()=>{setAlertOpen(false); setError(null)}}  //adding on close gives a cross button to close for alert          
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {Error}
                </Alert>
            </Snackbar>

            {/* for loading */}
            <Backdrop open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            


            <form onSubmit={handleSubmit} className='flex flex-col space-y-8 mx-auto max-w-[400px]'>
                
                <h1 className='text-3xl font-semibold text-gray-800'>Sign up to new account</h1>
                
                <div className='flex flex-col sm:text-lg space-y-2'>
                    <label htmlFor="" className=''>Username
                        <span>
                            <AnimatePresence>
                                {userName!="" && isValidUsername && 
                                    <motion.span initial={{opacity:0}} animate={{opacity:1}} >
                                        <CheckCircleIcon color='success' />
                                    </motion.span>
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {userName!="" && !isValidUsername && 
                                    <motion.span initial={{opacity:0}} animate={{opacity:1}} >
                                        <CancelIcon sx={{color:'darkred'}} /> 
                                        {USERNAME_REGEX.test(userName) ? <span className='text-sm ml-1 text-gray-400 italic'>username already exists</span>
                                        : <span className='text-sm ml-1 text-gray-400 italic'>Minimum 4 length, No special character except underscore</span>}
                                    </motion.span>
                                }
                            </AnimatePresence>
                            
                        </span>
                    </label>
                    <input 
                    required 
                    type="text" 
                    className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base' 
                    placeholder='Username'
                    onChange={(e)=>setUserName(e.target.value)} 
                    value={userName}
                    autoComplete='off'
                    />
                </div>


                <div className='flex flex-col sm:text-lg space-y-2'>
                    <label htmlFor="" className=''>Email Address
                        
                    </label>
                    <input 
                    required 
                    type="email" 
                    className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base' 
                    placeholder='Email Address'
                    onChange={(e)=>setEmail(e.target.value)} 
                    value={email}
                    autoComplete='on'
                    />
                    
                </div>

                


                <div className='flex flex-col sm:text-lg space-y-2'>
                    <label htmlFor="" className=''>Password
                        <span className='inline-flex'>
                            <AnimatePresence>
                                {password!="" && isValidPwd && 
                                    <motion.span initial={{opacity:0}} animate={{opacity:1}} >
                                        <CheckCircleIcon color='success'/>
                                    </motion.span>
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {password!="" && !isValidPwd && 
                                    <motion.span initial={{opacity:0}} animate={{opacity:1}} >
                                        <CancelIcon sx={{color:'darkred'}} />
                                        <span className='text-sm ml-1 text-gray-400 italic'>Length 8-23, atleast one a-z, atleast one A-Z, atleast one 0-9, atleast one special character</span>

                                    </motion.span>
                                }
                            </AnimatePresence>
                            
                        </span>
                    </label>
                    <input
                    required 
                    type={`${showPassword?"text":"password"}`}
                    className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base ' 
                    placeholder='Password'
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password}
                    autoComplete='off' />

                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='showPassword' className='text-slate-800 focus:ring-0 rounded-sm cursor-pointer' value={showPassword} onChange={(e)=>setShowPassword(e.target.checked)} />
                            <label htmlFor="showPassword" className=' text-gray-800 text-base cursor-pointer'>Show Password</label>
                        </div>
                    </div>
                
                </div>

                <button className='bg-[rgb(83,156,148)] text-white py-4 rounded sm:text-lg hover:bg-orange-500 font-semibold' type='submit'>Sign up</button>

                <div className='mx-auto'>
                    <p>Already have an account? <Link to="/" className='font-semibold'>Sign in</Link></p>
                </div>
          </form>
        </div>


        

        {/* image */}
        <div className='hidden md:flex md:flex-[0.5] lg:flex-[0.6] m-4'>
            <img src={network} alt="" className='mx-auto my-auto max-w-[90%]' />
        </div>
    </div>
  )
}

export default SignupContainer