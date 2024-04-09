import { useQuery, useSubscription, useMutation, gql } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPost } from '../../Store/DisplayMessageSlice';
import { Send, Attachment, Mic, Videocam } from '@mui/icons-material';
import { onandoffChecked,cancelAlert,increamentCount,dicreamentCount,DeleteMessagesList,removeDeleteMessagesList} from '../../Store/UserProfileSlice';
import {client} from '../../../App'
const MESSAGE_ADDED = gql`
  subscription MessageAdded {
    messageAdded {
      _id
      Sender
      Reciver
      MessageType
      TextMessage
      FileName
      PosteDate
    }
  }
`;

const GET_MESSAGE = gql`
  query GetMessage($senderId: ID, $reciverId: ID) {
    getMessage(senderId: $senderId, reciverId: $reciverId) {
      _id
      Sender
      Reciver
      MessageType
      TextMessage
      FileName
      PosteDate
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($type: String, $text: String, $senderId: ID, $reciverId: ID,$messageFile: Upload) {
    sendMessage(type: $type, text: $text, senderId: $senderId, reciverId: $reciverId,messageFile:$messageFile) {
      _id
      Sender
      Reciver
      MessageType
      TextMessage
      FileName
      PosteDate
    }
  }
`;
const DELETE_MESSAGE = gql`
mutation DeleteMessage($messageId: [ID]!) {
  deleteMessage(messageId: $messageId)
  {
    strings
  }
}
`;
const MessageBoard2 = (props) => {
  console.log("pops is",props.sender)
  const [deleteMessage] = useMutation(DELETE_MESSAGE,{
    update:(cache,{data})=>
    {
      const { getMessage } = cache.readQuery({
        query: GET_MESSAGE,
        variables: { senderId: user.id, reciverId: id },
    });
      console.log("data is",data.deleteMessage.strings)
      console.log(getMessage)
      console.log("cache is",cache)
      const updatedMessages = getMessage.filter(objS => {
        return !data.deleteMessage.strings.some(objC => objC === objS._id);
      });
      cache.writeQuery({
        query: GET_MESSAGE,
        variables: { senderId: user.id, reciverId: id },
        data: { getMessage: updatedMessages },
    });
    }
  });


  const [selectedMessages, setSelectedMessages] = useState([]);
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const showdeleteAlert = useSelector(state => state.user.showPopup);
  const checked = useSelector(state => state.user.checked);
  const deleteMessageLst = useSelector(state => state.user.deltedMessages);
  console.log("userr",user)
  
  const [showPopup, setShowPopup] = useState(false);
 
  const handleCheckboxChange = (e,sender,reciver,id) => {
    if (e.target.checked) {
      // console.log("sender",sender)
      // console.log("reciver",reciver)
      // console.log("messageId",id)
      dispatch(DeleteMessagesList({sender,reciver,id}))
      dispatch(increamentCount())
    } else {
      dispatch(removeDeleteMessagesList({sender,reciver,id}))
      dispatch(dicreamentCount())
    }
  };
  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };
  const handleDelete = () => {
    // Add delete functionality here
    const messageId=deleteMessageLst.map(e=>e.id)
    deleteMessage({ variables: { messageId } });
    dispatch(cancelAlert())
  };
  const { id } = useParams();
  
  const [sendMessage] = useMutation(SEND_MESSAGE) 
  //   {
  //   update(cache, { data: { sendMessage } }) {
  //     const { getMessage } = cache.readQuery({
  //       query: GET_MESSAGE,
  //       variables: { senderId: user.id, reciverId: id },
  //     });
  //     console.log("current cache",cache.data.data)
  //     // Merge the previous messages with the new message and update the cache
  //     const updatedMessages = [
  //       ...getMessage,
  //       sendMessage,
  //     ];
  
  //     cache.writeQuery({
  //       query: GET_MESSAGE,
  //       variables: { senderId: user.id, reciverId: id },
  //       data: { getMessage: updatedMessages },
  //     });
  //   },
  // });
  
  


  
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { senderId: user.id, reciverId: id },
  });
  const { data: subscriptionData } = useSubscription(MESSAGE_ADDED);

  const [ms, setMs] = useState(() => {
    if (!loading && !error && data) {
      return data.getMessage;
    }
    return null;
  });
  const updateCache = (newMessage) => {
    const cache = client.cache;
    const { getMessage } = cache.readQuery({
      query: GET_MESSAGE,
      variables: { senderId: user.id, reciverId: id },
    });

    // Update the cache with the new message
    const updatedMessages = [...getMessage, newMessage];

    cache.writeQuery({
      query: GET_MESSAGE,
      variables: { senderId: user.id, reciverId: id },
      data: { getMessage: updatedMessages },
    });
  };
  useEffect(() => {
    if (subscriptionData) {
      const newMessage = subscriptionData.messageAdded;
      updateCache(newMessage);
      setMs(prevMessages => {
        if (!prevMessages.find(message => message._id === newMessage._id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    }
  }, [subscriptionData]);

  const updateMessages = (newMessage) => {
    setMs(prevMessages => {
      if (!prevMessages.find(message => message._id === newMessage._id)) {
        return [...prevMessages, newMessage];
      }
      return prevMessages;
    });
  };

  useEffect(() => {
    if (!loading && !error && data) {
      setMs(data.getMessage);
    }
  }, [data, loading, error]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSend = () => {
    if (user) {
      sendMessage({ variables: { type: 'Text',text: text, reciverId: id, senderId: user.id } });
      setText(''); 
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split('/')[0];
   
    if (fileType === 'image') {
      console.log('The file is a photo');
      sendMessage({ variables: { type: 'Pic',reciverId: id, senderId: user.id,messageFile:file} });

    } else if (fileType === 'audio') {
      console.log('The file is an audio file');
    } else if (fileType === 'video') {
      sendMessage({ variables: { type: 'Video',reciverId: id, senderId: user.id,messageFile:file} });

      console.log('The file is a video file');
    } else {
      console.log('The file is a document');
    }
  };
  if(loading)
  {
    return <h1>Loading...</h1>
  }
  return (
    <>
    <div className="flex flex-col   w-full h-5/6 gap-2  overflow-y-auto">
    {ms && ms.length > 0 ? (
  <div className="flex flex-col w-full h-80 gap-2 overflow-y-auto" onClick={() => dispatch(onandoffChecked())}>
    {ms.map((item, index) => {
      const backgroundColor = item.Sender === user.id ? 'bg-blue-500' : 'bg-white';
      return (
        <div
          key={index}
          className={`p-4 ${backgroundColor} rounded-lg ${item.Sender === user.id ? 'text-left border-4' : 'text-right border-4'}`}
        >
          {checked && <input 
            type="checkbox"
            className="form-checkbox h-4 w-4 text-green-500 rounded-full checked:bg-red-700 mt-0 cursor-pointer" disabled={showdeleteAlert}
            onChange={(e) => handleCheckboxChange(e, item.Sender, item.Reciver, item._id)}
          />}
          {item.MessageType === "Text" && (
            <p>{item.TextMessage}</p>
          )}
          {item.MessageType === "Pic" && item.FileName && (
            <img src={`data:image/jpeg;base64,${item.FileName}`} alt="File" />
          )}
          {item.MessageType === 'Video' && item.FileName && (
            <video controls src={`data:video/mp4;base64,${item.FileName}`}/>
          )}
        </div>
      );
    })}
  </div>
) : (
  <div className="flex flex-col w-full h-80 gap-2 overflow-y-auto">empty</div>
)}

     
      <div className="flex items-center  border border-gray-300 gap-2 rounded-lg p-2 mt-0">
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="w-full border-none rounded-lg focus:outline-none px-2 h-10" 
          placeholder="Type a message" 
          disabled={showdeleteAlert}
        />
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded-full" onClick={showdeleteAlert ? null:handleSend}>
            <Send className='cursor-pointer'/>
          </button>
          <button className="bg-transparent hover:bg-gray-100 text-gray-600 p-2 rounded-full" onClick={handleClick}>
            <Attachment className='cursor-pointer'/>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }} 
          />
          <button className="bg-transparent hover:bg-gray-100 text-gray-600 p-2 rounded-full">
            <Mic className='cursor-pointer'/>
          </button>
          <button className="bg-transparent hover:bg-gray-100 text-gray-600 p-2 rounded-full">
            <Videocam className='cursor-pointer'/>
          </button>
        </div>
      </div>
      </div>
      {showdeleteAlert && <div 
      className="absolute top-20 h-48 w-[390px] border-4 flex flex-col flex-wrap: justify-between left-[1000px] bg-blue-500 mt-4 opacity-80 p-4"
    >
      <h1 className='text-white text-xl font-bold'>Are you sure you want to delete the Selected message</h1>
      <div>
        <button className="bg-white text-blue-500 px-4 py-2 mr-2" onClick={()=>dispatch(cancelAlert())}>Cancel</button>
        <button className="bg-red-500 text-white px-4 py-2" onClick={()=>handleDelete()}>Delete</button>
      </div>
      
    </div>}
    

    </>
  );
};

export default MessageBoard2;