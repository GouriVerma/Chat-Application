import { RouterProvider,createBrowserRouter, Outlet, Routes, Route } from "react-router-dom"
import './App.css'
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import WelcomeArea from "./components/WelcomeArea"
import ChatArea from "./components/ChatArea"
import CreateGroups from "./components/CreateGroups"
import OnlineUsers from "./components/OnlineUsers"
import SignupPage from "./pages/SignupPage"
import AllChats from "./components/AllChats"
import Groups from "./components/Groups"
import Sidebar from "./components/Sidebar"


const LayoutComponent=()=>{
  return (
    <div className=''>
      
      <Outlet />
      
    </div>
  )
}

// const ReqAuthComponent=()=>{
//   return (
//     <div className=''>
//       <Navbar />
//       <Outlet />
//       <Footer />
//     </div>
//   )
// }

const ReqAuthComponent=()=>{
  //check auth

  // const {auth}=useAuth();
  // const location=useLocation();
  return(
    
    <div className=''>
      <Outlet />
    </div>
    // :
    // <Navigate to="/login" replace={true} state={{from:location}} />
    
  )
}

// const LoginSignUpComponent=()=>{
//   return (
//     <Outlet />
//   )
// }

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
    element:<LayoutComponent />,
    children:[
      {
        path: "/",
        element:<LoginPage />
      },
      {
        path: "/signup",
        element:<LoginPage />
      },
      
    ]
  }
])



function App() {


  return (
    <RouterProvider router={router} />
  )
}

export default App
