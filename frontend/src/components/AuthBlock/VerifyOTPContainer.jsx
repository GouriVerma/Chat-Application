import React,{useState,useEffect} from 'react'
import Alert from '@mui/material/Alert';
import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import network from '../../assets/network.png'
import {Link, useLocation, useNavigate} from "react-router-dom"
import axios from '../../api/axios';
import Cookies from "js-cookie";

const OTP_VERIFY_URI="/auth/verify-otp";
const OTP_RESEND_URI="/auth/resend-otp"

const VerifyOTPContainer = () => {

  
  const navigate=useNavigate();
  const location=useLocation();
  const user=location?.state?.user;
  console.log(user);

  const [Error,setError]=useState(null);
  const [success,setSuccess]=useState(null);
  const [loading,setLoading]=useState(false);
  const [alertOpen,setAlertOpen]=useState(false);
  const [otp,setOtp]=useState("");
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(otp.length!=4){
        setError("OTP should be of 4 characters");
        setAlertOpen(true);
        
    }

    else{
        try {
            setLoading(true);
            const res=await axios.post(OTP_VERIFY_URI,{userId:user._id,otp:otp});
            console.log(res.data);
             var expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
             Cookies.remove("accessToken");
             Cookies.set("accessToken",user.accessToken,{expires:expiryTime});
             navigate("/app",{replace:true});
             
        } catch (error) {
            console.log(error);
            if(error?.response?.data?.error){
                setError(error?.response?.data?.error);
            }
            else{
                setError("Please try again");
            }
        } finally{
            setLoading(false);
        }
    }
  }

  const handleResendOTP=async()=>{
    if(user.email && user._id){
        try {
            setLoading(true);
            const res=await axios.post(OTP_RESEND_URI,{userId:user._id,email:user.email});
            console.log(res.data);
            setSuccess("Message Sent Successfully");
            setAlertOpen(true);
        } catch (error) {
            console.log(error);
            if(error?.response?.data?.error){
                setError(error?.response?.data?.error);
            }
            else{
                setError("Some error occured");
            }
        } finally{
            setLoading(false);
        }
    }
    else{
        setError("Missing user details");
    }
    
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
                { Error?
                <Alert   
                    onClose={()=>{setAlertOpen(false); setError(null)}}  //adding on close gives a cross button to close for alert          
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {Error}
                </Alert>
                :
                <Alert   
                    onClose={()=>{setAlertOpen(false); setSuccess(null)}}  //adding on close gives a cross button to close for alert          
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {success}
                </Alert>
                }
            </Snackbar>

            <Backdrop open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            


            <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col space-y-8 mx-auto max-w-[400px]'>
                
                <h1 className='text-3xl font-semibold text-gray-800'>Enter OTP sent on your registered mail id</h1>
                {/* <Alert severity="error">{Error}</Alert> */}
            
                <div className='flex flex-col sm:text-lg space-y-2'>
                    {/* <label htmlFor="" className=''>OTP</label> */}
                    <input 
                    required 
                    type="text" 
                    className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base' 
                    placeholder='XXXX'
                    onChange={(e)=>setOtp(e.target.value)} 
                    value={otp}
                   
                    />
                </div>


                

                <button className='bg-[rgb(83,156,148)] text-white py-4 rounded sm:text-lg hover:bg-orange-500 font-semibold' type='submit'>Sign up</button>

                <div className='mx-auto'>
                    <p>Didn't get OTP? <span onClick={()=>handleResendOTP()} className='font-semibold cursor-pointer'>Resend OTP</span></p>
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

export default VerifyOTPContainer