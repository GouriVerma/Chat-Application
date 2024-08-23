import React, { useEffect, useState } from 'react'
import { Backdrop, CircularProgress, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GroupAdd, PersonAdd, AddCircle, Nightlight, Search, LightMode, Chat } from '@mui/icons-material';
import ConversationItems from '../ConversationItems';
import GroupChat from '../GroupChat';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import OnlineUsers from '../OnlineUsers';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../Features/themeSlice';
import {AnimatePresence, motion} from "framer-motion"

import Cookies from "js-cookie";
import ExistingChat from '../ExistingChat';
import UsersList from '../UsersList';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CreateGroup from '../CreateGroup';
import MyAccount from './MyAccount';

const SEARCH_URI="http://localhost:5000/api/user/search-users"


const Sidebar = () => {
    const axios=useAxiosPrivate();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    console.log(location);

    

    const lightTheme=useSelector((state)=>state.themeKey); //themeKey named global state is returned and saved in lightTheme
    const [searchQuery,setSearchQuery]=useState("");
    const [loading,setLoading]=useState(false);
    const [section,setSection]=useState("");
    

    useEffect(()=>{
        if(location.search){
            setSection(location.search.split("?section=").at(-1));
        }
        else{
            setSection("");
        }
        
    },[location.search])
  

  return (
    <div className={` ${location.pathname.split('/chat').length>1 && 'hidden md:flex'} flex-1 md:flex-[0.3] flex flex-col `}>
        
        {/* backdrop */}
        <Backdrop open={loading} >
            <CircularProgress color="inherit" />
        </Backdrop>


        {/* header */}
        <div className={`rounded-2xl flex justify-between m-2 px-1 py-2 ${!lightTheme? '  dark':'bg-white '}`}style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
            <div>
                <IconButton >
                    <AccountCircleIcon onClick={()=>navigate(`${location.pathname}?section=my-account`)}
                    className={`${!lightTheme? '  text-white ':' '}`} />
                </IconButton>
            </div>
            <div>
                <IconButton onClick={()=>navigate(`${location.pathname}?section=users`)}>
                    <PersonAdd className={`${!lightTheme? '  text-white ':' '}`} />
                </IconButton>
                <IconButton onClick={()=>navigate(`${location.pathname}?section=create-group`)}>
                    <GroupAdd className={`${!lightTheme? '  text-white ':' '}`}/>
                </IconButton>
                <IconButton onClick={()=>navigate(`${location.pathname}`)}>
                    <Chat className={`${!lightTheme? '  text-white ':' '}`}/>
                </IconButton>
                <IconButton onClick={()=>dispatch(toggleTheme())}>
                    {lightTheme? <Nightlight className={`${!lightTheme? '  text-white ':' '}`}/>: <LightMode className={`${!lightTheme? '  text-white ':' '}`}/>}
                </IconButton>
            </div>
        </div>

        {/* search */}
        {section!="my-account" && 
        <div className={`m-2 relative ${!lightTheme? 'dark ':''} `}>
            
            <div className={` rounded-2xl py-1 px-2 flex items-center gap-2 ${!lightTheme? 'dark rounded-2xl':' bg-white'}`} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
                <IconButton>
                    <Search className={`${!lightTheme? '  text-white ':' '}`}/>
                </IconButton>
                <input spellCheck={false} type="text" value={searchQuery} placeholder='Search' className={`outline-none flex-1 bg-transparent ${!lightTheme? ' ':' '}`} onChange={(e)=>setSearchQuery(e.target.value)} />
            </div>
       
        </div>
        }

        {(section=="" || section=="groups" || section=="online-users") && 
            <ExistingChat searchQuery={searchQuery}/>
        }


        {section=="users" && 
            <UsersList searchQuery={searchQuery} />
        }


        {section=="create-group" &&
            <CreateGroup searchQuery={searchQuery} />
        }

        {section=="my-account" &&
            <MyAccount />
        }



       

        

        
       
    </div>
  )
}

export default Sidebar