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
import { useSelector } from 'react-redux';
import MessageBoard from './MessageBoard';

const contacts = [
  { id: 1, username: 'john_doe', image: '/simon.JPG' },
  { id: 2, username: 'jane_smith', image: '/simon.JPG' },
  { id: 3, username: 'mark_johnson', image: '/simon.JPG' },
  
  { id: 2, username: 'jane_smith', image: '/simon.JPG' },
  { id: 3, username: 'mark_johnson', image: '/simon.JPG' },
  { id: 2, username: 'jane_smith', image: '/simon.JPG' },
  { id: 3, username: 'mark_johnson', image: '/simon.JPG' },
  
];
const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    getUserById(id: $id) {
      id
      userName
      dataa
    }
  }
`;
const SEND_MESSAGE = gql`
  mutation SendMessage($type:String,$text: String!,$senderId:ID,$reciverId:ID) {
    sendMessage(type:$type,text: $text,senderId:$senderId,reciverId:$reciverId) 
  }
`;


function PersonMessage() {
  const user = useSelector(state => state.user.user);
  const [text, setText] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const fileInputRef = useRef(null);
  // console.log(user)
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleSend = () => {
    if(user){
    sendMessage({ variables: { type:'Text',text,reciverId:id,senderId:user.id } })
    return 1
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Do something with the selected file
    console.log(file);
  };
  const {id} = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
  });
  let newMap = "/simon.JPG";

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
    <div className='bg-gray-300 h-screen  sm:col-span-5 col-span-5 lg:col-span-2'>
    <div className="flex items-center justify-between p-4 bg-white">
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
     <MoreHorizIcon />
   </div>
 </div>

 {user && <MessageBoard sender={user}/>}

        
 <div className="flex items-center border border-gray-300 gap-2 rounded-lg p-2 mt-32">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border-none focus:outline-none px-2" placeholder="Type a message"></textarea>
      <div className="flex items-center space-x-2">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded-full">
          <Send onClick={handleSend}/>
        </button>
        <button className="bg-transparent hover:bg-gray-100 text-gray-600 p-2 rounded-full" onClick={handleClick}>
          <Attachment />
        </button>
        <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
        <button className="bg-transparent hover:bg-gray-100 text-gray-600 p-2 rounded-full">
          <Mic/>
        </button>
        <button className="bg-transparent hover:bg-gray-100 text-gray-600 p-2 rounded-full">
          <Videocam/>
        </button>
   
      </div>
    </div>

    
   </div>
  )
}

export default PersonMessage
