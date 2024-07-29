import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import chat from '../assets/chat.png'
import login from '../assets/login.png'
import network from '../assets/network.png'

const LoginContainer = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  const [showPassword,setShowPassword]=useState(false);


  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  const handleForgotPassword=()=>{

  }


  return (
    <div className='bg-[#f4f5f8] w-[90vw] h-[90vh] flex rounded-2xl shadow-sm'>

        {/* form */}
        <div className='flex-1 md:flex-[0.5] lg:flex-[0.4] m-4 bg-white rounded-2xl p-4 pt-12'>
            

            <form onSubmit={handleSubmit} className='flex flex-col space-y-8 mx-auto max-w-[400px]'>
                <h1 className='text-3xl font-semibold text-gray-800'>Sign in to your account</h1>

                {/* <div className={`${error?"opacity-100":"opacity-0"} text-red-700 bg-red-100 rounded py-4 px-2 capitalize`}>
                    <p>{error}</p>
                </div> */}
            
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