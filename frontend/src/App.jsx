import { RouterProvider,createBrowserRouter, Outlet, Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import Cookies from "js-cookie";
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import WelcomeArea from "./components/WelcomeArea"
import ChatArea from "./components/ChatArea"
import SignupPage from "./pages/SignupPage"

import { useEffect } from "react";
import useSocket from "./hooks/userSocket";
import { useSelector } from "react-redux";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import VerifyotpPage from "./pages/VerifyotpPage";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const LayoutComponent=()=>{
  return (
    <div className=''>
      
      <Outlet />
      
    </div>
  )
}


const ReqAuthComponent=()=>{
  //check auth

  const accessToken=Cookies.get("accessToken");

  return(
    
    <>
      {accessToken? <div className=''>
      <Outlet />
    </div>
    :
    <Navigate to="/" />}
    
    </>
    
  )
}

const LoginSignUpComponent=()=>{
  // localStorage.removeItem("userData");
  const accessToken=Cookies.get("accessToken");

  return (
    <>
      {!accessToken? <div className=''>
      <Outlet />
    </div>
    :
    <Navigate to="/app" />}
    
    </>
  )
}

const router=createBrowserRouter([
  {
    path:"/app",
    element:<ReqAuthComponent />,
    children:[
      {
        path: "",
        element:<MainPage />,
        children:[
          {
            path:"",
            element:<WelcomeArea />
          },
          {
            path:"chat/:id",
            element:<ChatArea />
          },
          
        ]
      },
      
      
    ]
  },
  {
    path:"/",
    element:<LoginSignUpComponent />,
    children:[
      {
        path: "/",
        element:<LoginPage />
      },
      {
        path: "/signup",
        element:<SignupPage />
      },
      {
        path:"/verify-otp",
        element:<VerifyotpPage />
      }
      
    ]
  }
])



function App() {



  

  return (
    <RouterProvider router={router} />
  )
}

export default App
