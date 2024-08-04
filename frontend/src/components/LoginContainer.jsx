import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import network from '../assets/network.png'

import Alert from '@mui/material/Alert';
import { Backdrop, CircularProgress, Snackbar } from '@mui/material';


const LOGIN_URL="http://localhost:5000/api/auth/login";

const LoginContainer = () => {
  
  const navigate=useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [Error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [alertOpen,setAlertOpen]=useState(false);


  const handleSubmit=async (e)=>{
    e.preventDefault();


    try {
        setLoading(true);

        const config={
            headers:{
                "Content-type":"application/json",
            }
        }
        const res=await axios.post(LOGIN_URL,{email,password},config);
        console.log(res.data);
        navigate("/app",{replace:true});
        //localStorage.setItem("userData",JSON.stringify(res.data));

        var expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.remove("accessToken");
        Cookies.set("accessToken",res.data.accessToken,{expires:expiryTime});
        
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
            setError("Client side error");
        }
        console.log(error);
        console.log(Error);
        setAlertOpen(true);
        
    }
    finally{
        setLoading(false);
    }

  }

  const handleForgotPassword=()=>{

  }


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

            <Backdrop open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            


            <form onSubmit={handleSubmit} className='flex flex-col space-y-8 mx-auto max-w-[400px]'>
                
                <h1 className='text-3xl font-semibold text-gray-800'>Sign in to your account</h1>
                {/* <Alert severity="error">{Error}</Alert> */}
            
                <div className='flex flex-col sm:text-lg space-y-2'>
                    <label htmlFor="" className=''>Email Address</label>
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
                    <label htmlFor="" className=''>Password</label>
                    <input
                    required 
                    type={`${showPassword?"text":"password"}`}
                    className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base ' 
                    placeholder='Password'
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password} />

                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='showPassword' className='text-slate-800 focus:ring-0 rounded-sm cursor-pointer' value={showPassword} onChange={(e)=>setShowPassword(e.target.checked)} />
                            <label htmlFor="showPassword" className=' text-gray-800 text-base cursor-pointer'>Show Password</label>
                        </div>
                        <p onClick={handleForgotPassword} className='cursor-pointer font-semibold text-gray-800 text-base'>Forgot Password?</p>
                    </div>
                
                </div>

                <button className='bg-[rgb(83,156,148)] text-white py-4 rounded sm:text-lg hover:bg-orange-500 font-semibold' type='submit'>Sign in</button>

                <div className='mx-auto'>
                    <p>Don't have an account? <Link to="/signup" className='font-semibold'>Sign Up</Link></p>
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

export default LoginContainer