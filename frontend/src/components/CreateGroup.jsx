import React,{useState,useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import {AnimatePresence, motion} from "framer-motion"
import { ArrowForward, ArrowRight, CheckBox } from '@mui/icons-material';

const SEARCH_URI="/user/search-users"
const CREATE_GROUP_URI="/chat/create-group"



const CreateGroup = ({searchQuery}) => {
  const axios=useAxiosPrivate();
  const lightTheme=useSelector((state)=>state.themeKey);
  const auth=useSelector((state)=>state.authKey);

  const navigate=useNavigate();

  const [users,setUsers]=useState([]);
  const [searchedUsers,setSearchedUsers]=useState([]);
  const [selectedUsers,setSelectedUsers]=useState([]);
  const [loading,setLoading]=useState(false);
  const [open,setOpen]=useState(false);
  const [groupTitle,setGroupTitle]=useState("");

    const token=Cookies.get("accessToken");
    const config={headers:{
        Authorization:`Bearer ${token}`
    }}
    


    useEffect(()=>{
        const fetchUsers=async()=>{
            
            try {
                setLoading(true);
                console.log(config);
                const res=await axios.get(SEARCH_URI,config);
                console.log(res.data);
                setUsers(res.data.filter(user=>user._id!=auth._id));
                setSearchedUsers(res.data.filter(user=>user._id!=auth._id));
            } catch (error) {
                console.log(error.response?.data);
            } finally{
                setLoading(false);
            }
        }
        fetchUsers();
    },[])

    useEffect(()=>{
        if(searchQuery==""){
            setSearchedUsers(users);
        }
        else{
          if(users.length>0){
            const temp=users.filter((user)=>user?.userName?.toLowerCase()?.startsWith(searchQuery?.toLowerCase()));
            setSearchedUsers(temp);
          }
            
            
        }
    },[searchQuery])

    
  const User=({user})=>{
    return (
      <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={()=>handleClick(user._id,user.userName)}
      key={user._id} className={`flex space-x-2 p-2 items-center rounded-2xl ${!lightTheme?'bg-transparent hover:bg-[#252323c5] active:bg-[#2d2c2cc5]':'hover:bg-gray-100 active:bg-gray-50'}`}>
          <div>
              {user.profilePicture? 
              <img className='rounded-full w-10 h-10 object-cover' src={user.profilePicture.url} /> : 
              <p className={`w-8 h-8 flex items-center justify-center  text-white text-3xl rounded-full font-semibold p-5 ${!lightTheme?'bg-[#5a5959]':'bg-[#d9d9d9]'}`}>{user.userName[0].toUpperCase()}</p>}
              
          </div>

          <div className={`${!lightTheme && 'text-white'}`}>
              {user.userName}
          </div>


      
      </div>
    )
  }


    const handleChange=async(e,user)=>{
        if(e.target.checked){
          setSelectedUsers([...selectedUsers,user]);
        }
        else{
          setSelectedUsers(selectedUsers.filter((sUser)=>sUser!=user));
        }
    }

    const handleCreateGroup=async()=>{
      if(groupTitle){
        try {
          setLoading(true);
          const res=await axios.post(CREATE_GROUP_URI,{name:groupTitle,users:selectedUsers.map(user=>user._id)},config);
          console.log(res.data);
          navigate(`/app/chat/${res.data._id}`,{state:{chatName:res.data.name,chat:res.data},replace:true});
        } catch (error) {
          console.log(error);
        } finally{
          setLoading(false)
        }
      }
    }



  return (
    <div className={`relative max-w-full m-2 rounded-2xl py-1 px-2 flex-1 overflow-y-scroll ${!lightTheme ? 'dark':'bg-white '}`} style={{scrollbarWidth:"none",boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
        
        <Backdrop open={loading}>
            <CircularProgress color='inherit' />
        </Backdrop>

        <AnimatePresence>

            {searchedUsers.map((user)=>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={user._id} className={`flex space-x-2 p-2 items-center rounded-2xl ${!lightTheme?'bg-transparent hover:bg-[#252323c5] active:bg-[#2d2c2cc5]':'hover:bg-gray-100 active:bg-gray-50'}`}>
                <div>
                    {user.profilePicture? 
                    <img className='rounded-full w-10 h-10 object-cover' src={user.profilePicture.url} /> : 
                    <p className={`w-8 h-8 flex items-center justify-center  text-white text-3xl rounded-full font-semibold p-5 ${!lightTheme?'bg-[#5a5959]':'bg-[#d9d9d9]'}`}>{user.userName[0].toUpperCase()}</p>}
                    
                </div>

                <div className='flex-1 flex items-center justify-between'>
                    <div>
                      {user?.userName}
                    </div>

                    <div>
                      <input id='customCheckbox' type="checkbox" className='appearance-none w-6 h-6 border-2 border-gray-300 rounded-full cursor-pointer transition duration-200 ease-in-out checked:bg-[#56a088] checked:border-[#56a088] relative' 
                      onChange={(e)=>handleChange(e,user)}
                      
                      />
                    </div>
                </div>


            
            </motion.div>)
            
            }



        </AnimatePresence>


      {/* arrow   */}

      <div className={`sticky w-12 h-12 left-96 bottom-12 p-2 flex items-center justify-center text-white rounded-full ${selectedUsers.length>=2 ? 'cursor-pointer bg-[#56a088] hover:bg-[#326353] active:bg-[#56a088] ':'bg-[#aab9b5]'} `}
      onClick={()=>selectedUsers.length>=2 && setOpen(true)}
      >
        <ArrowForward />
        {selectedUsers.length > 0 && (
          <div
            className={`absolute top-1 right-1 bg-gray-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center`}
            style={{ transform: 'translate(50%, -50%)' }}
          >
            {selectedUsers.length}
          </div>
        )}
      </div>



      {/* dialog box */}
      <Dialog open={open}
      fullWidth={true}
      maxWidth='xs'
      className={`${!lightTheme && ''}`}
      >
        <DialogTitle className={`${!lightTheme && 'dark'}`}>Create Group</DialogTitle>
        <DialogContent className={`${!lightTheme && 'dark'}`}>         
          <TextField type='text' variant='standard' label='Group Name' autoFocus required InputProps={{
            style: { color:  `${!lightTheme && 'white'}` },
          }}
          InputLabelProps={{
            style: { color:  `${!lightTheme && 'white'}` },
          }}
          value={groupTitle}
          onChange={(e)=>setGroupTitle(e.target.value)}
          />

          <div>
            {selectedUsers.map((user)=><User key={user._id} user={user} />)}
          </div>
        </DialogContent>

        <DialogActions className={`${!lightTheme && 'dark'}`}>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={()=>handleCreateGroup()}>Create</Button>
        </DialogActions>
      </Dialog>


    
    
    
    </div>)
}

export default CreateGroup