import React,{useEffect, useRef, useState} from 'react'
import {motion,AnimatePresence} from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import ConversationItems from './ConversationItems';
import GroupChat from './GroupChat';

import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import OnlineUsers from './OnlineUsers';
import {setSendMessage} from "../Features/sendMessageSlice"

const ALL_CHATS_URI="/chat";
const GROUP_CHATS_URI="/chat/groups";



const ExistingChat = ({searchQuery}) => {
    const axios=useAxiosPrivate();

    const lightTheme=useSelector((state)=>state.themeKey);
    const auth=useSelector((state)=>state.authKey);
    const sentMessage=useSelector((state)=>state.sentMessageKey);
    const latestMessage=useSelector((state)=>state.latestMessageKey);
    const prevListLength = useRef(latestMessage.length);

    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();

    
    const [activeTab,setActiveTab]=useState("allChats");
    const [conversations,setConversations]=useState([]);
    const [groupConversations,setGroupConversations]=useState([]);
    const [searchedConvo,setSearchedConvo]=useState([]);
    const [searchedGroupConvo,setSearchedGroupConvo]=useState([]);
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
  



    useEffect(()=>{
        const fetchChatsAndGroups=async()=>{
            const token=Cookies.get("accessToken");
            const config={headers:{Authorization:`Bearer ${token}`}};
            console.log("fetching");
            try {
                console.log(sentMessage);
                console.log(latestMessage?.length,prevListLength?.current);
                // !sentMessage && setLoading(true);
                const chatRes=await axios.get(ALL_CHATS_URI,config);
                const groupRes=await axios.get(GROUP_CHATS_URI,config);
                console.log(chatRes.data);
                console.log(groupRes.data);
                setConversations(chatRes.data);
                setSearchedConvo(chatRes.data);
                setGroupConversations(groupRes.data);
                setSearchedGroupConvo(groupRes.data);

            } catch (error) {
                console.log(error);
            } finally{
               setLoading(false);
            }
        }
        (sentMessage || latestMessage?.length>prevListLength?.current || location.search=="" ) && fetchChatsAndGroups();
        // fetchChatsAndGroups();
        prevListLength.current=latestMessage?.length;
        dispatch(setSendMessage(false));
    },[location,latestMessage,sentMessage])

    useEffect(()=>{
        if(searchQuery==""){
            setSearchedConvo(conversations);
            setSearchedGroupConvo(groupConversations);
        }
        else{
            const filterConvo=conversations.filter((convo)=>{
                let chatName=convo.name;
                if(!convo.isGroupChat){
                    convo.users.map((user)=>{
                        if(user._id!=auth._id){
                            chatName=user.userName;
                        }
                    })
                }
                return chatName.toLowerCase().startsWith(searchQuery.toLowerCase());
            })
            const groupConvo=groupConversations.filter((convo)=>
                convo.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
            setSearchedConvo(filterConvo);
            setSearchedGroupConvo(groupConvo);
        }   
    },[searchQuery])



  return (
 
    <div className={` m-2 rounded-2xl py-1 px-2 flex-1 overflow-y-scroll ${!lightTheme ? 'dark':'bg-white '}`} style={{scrollbarWidth:"none",boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>

        <Backdrop open={loading}>
            <CircularProgress color='inherit' />
        </Backdrop>

        {/* links */}
        <div className='flex text-xs gap-4 p-1.5 ml-1'>
            <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
                <div>
                    <p className={` font-semibold cursor-pointer ${section=="" ? 'text-[#2d5f4f]':'text-gray-400'}`}
                    onClick={()=>navigate(`${location.pathname}`)}>All Chats</p>
                </div>
            </motion.div>

            <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
                <div>
                    <p className={`font-semibold cursor-pointer ${section=="groups" ? 'text-[#2d5f4f]':'text-gray-400'}`}
                    onClick={()=>navigate(`${location.pathname}?section=groups`)}>Groups</p>
                </div>
            </motion.div>

            <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
                <div>
                    <p className={`font-semibold cursor-pointer ${section=="online-users" ? 'text-[#2d5f4f]':'text-gray-400'}`}
                    onClick={()=>navigate(`${location.pathname}?section=online-users`)}>Online</p>
                </div>
            </motion.div>
        </div>

        {/* all chats */}
        <AnimatePresence>
            { section=="" &&
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            
            
        >
                
            { searchedConvo.map((conversation)=>
                conversation.isGroupChat? <GroupChat key={conversation._id} props={conversation}/> : <ConversationItems key={conversation._id} props={conversation} />
            )}
                
            </motion.div>
            }
        </AnimatePresence>

        
        {/* groups */}
        <AnimatePresence>
            { section=="groups" &&
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            
            >
            
                { searchedGroupConvo.map((conversation)=><GroupChat key={conversation._id} props={conversation}/>) }
                

            </motion.div>
            }
        </AnimatePresence>

        {/* online users */}
        <AnimatePresence>
            { section=="online-users" &&
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            
            >
            
                <OnlineUsers />
                

            </motion.div>
            }
        </AnimatePresence>

    </div>
  )
}

export default ExistingChat