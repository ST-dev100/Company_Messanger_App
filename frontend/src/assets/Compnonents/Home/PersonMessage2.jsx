import React,{useState,useEffect,useRef} from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useParams} from 'react-router-dom'
import { useQuery,useMutation,gql } from '@apollo/client';
import { Send, Attachment, Mic, Videocam } from '@mui/icons-material';
import { useSelector,useDispatch} from 'react-redux';
import MessageBoard from './MessageBoard';
import MessageBoard2 from './MessageBoard2';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {deleteAlert,clearCancel} from '../../Store/UserProfileSlice';
import ListEmployees from './PersonMessage2/ListEmployees';


const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    getUserById(id: $id) {
      id
      userName
      dataa
    }
  }
`;



function PersonMessage2() {
  let newMapp = null;
  const user = useSelector(state => state.user.user);
  const checked = useSelector(state => state.user.checked);
  const showdeleteAlert = useSelector(state => state.user.showPopup);
  const count = useSelector(state => state.user.count);
  const deleteMessage = useSelector(state => state.user.deltedMessages);

  //deltedMessages

  const dispatch = useDispatch();
  const {id} = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
  });
  let newMap = "/simon.JPG";
    
  const showDeleteAlert = ()=>{
    
    dispatch(deleteAlert())
   }
   
  if(!loading && !error && data)
  {
    // console.log(data.getUserById)

    try{
      
      var binaryImage = atob(data.getUserById.dataa);
      var array = new Uint8Array(binaryImage.length);
         for (var i = 0; i < binaryImage.length; i++) {
           array[i] = binaryImage.charCodeAt(i);
         }  
         var blob = new Blob([array], {type: 'image/png'});
         var url = URL.createObjectURL(blob);
         newMap = url;
    }
    catch(err)
    {
      console.log(err)
    }
    
    
  }
  return (
    <>
    
        <div className='bg-white-300 h-screen  sm:col-span-5  lg:col-span-6 grid grid-cols-5'>
            <ListEmployees/>
            <div className="col-span-3">
            {checked && 
              <div className='grid grid-cols-4 p-4 bg-white'>
                <div>
                  <ClearIcon className='cursor-pointer' onClick={()=>dispatch(clearCancel())}/>
                  {deleteMessage.length > 0 && <span className='text-xl p-4 mt-1'>{deleteMessage.length}</span>}
                </div>
                <div>
                  <DeleteIcon className='cursor-pointer' onClick={count<=0 ? null : showDeleteAlert}/>
                </div>
              </div>}
            {!checked && <div className="flex items-center justify-between p-4 bg-white">
            {loading ? (
                        <h1>loading</h1>
                      ):error?(
                        <h1>error</h1>
                      ):(
                        
                        <div className="flex items-center">
                        {data &&
                        <img
                          src={newMap}
                          alt="Profile Picture"
                          className="w-10 h-10 rounded-full object-cover mr-2"
                        />}
                        <h1 className="text-lg font-medium">{data.getUserById.userName}</h1>
                      </div>  

                      )}
                    <div className="flex items-center">
                      <NotificationsIcon className="mr-2" />
                      <MoreHorizIcon className='cursor-pointer'/>
                    </div>
                  </div>
                  }
                  {user && <MessageBoard2 sender={user}/>}
              </div>    
         </div>
   </>
  )
}

export default PersonMessage2
