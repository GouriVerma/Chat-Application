import { RouterProvider,createBrowserRouter, Outlet } from "react-router-dom"
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"

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
    path:"/",
    element:<ReqAuthComponent />,
    children:[
      {
        path: "/",
        element:<MainPage />
      },
      
    ]
  },
  {
    path:"/",
    element:<LayoutComponent />,
    children:[
      {
        path: "/login",
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
