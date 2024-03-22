import { useQuery, useSubscription, useMutation, gql } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPost } from '../../Store/DisplayMessageSlice';
import { Send, Attachment, Mic, Videocam } from '@mui/icons-material';

const MESSAGE_ADDED = gql`
  subscription MessageAdded {
    messageAdded {
      _id
      Sender
      Reciver
      MessageType
      TextMessage
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
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($type: String, $text: String!, $senderId: ID, $reciverId: ID) {
    sendMessage(type: $type, text: $text, senderId: $senderId, reciverId: $reciverId) {
      _id
      Sender
      Reciver
      MessageType
    }
  }
`;

const MessageBoard = () => {
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const { id } = useParams();
  
  const [sendMessage] = useMutation(SEND_MESSAGE);
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

  useEffect(() => {
    if (subscriptionData) {
      const newMessage = subscriptionData.messageAdded;
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
      sendMessage({ variables: { type: 'Text', text, reciverId: id, senderId: user.id } });
      setText(''); 
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <>
      <div className="flex flex-col w-full h-80 gap-2 border-4 overflow-y-auto">
        {ms && ms.map((item, index) => {
          const backgroundColor = item.Sender === user.id ? 'bg-blue-500' : 'bg-white';
          return (
            <div
              key={index}
              className={`p-4 ${backgroundColor} rounded-lg ${item.Sender === user.id ? 'text-left' : 'text-right'}`}
            >
              {item.TextMessage}
            </div>
          );
        })}
      </div>
      <div className="flex items-center border border-gray-300 gap-2 rounded-lg p-2 mt-0">
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="w-full border-none rounded-lg focus:outline-none px-2 h-10" 
          placeholder="Type a message" 
        />
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded-full" onClick={handleSend}>
            <Send />
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
            <Mic />
          </button>
          <button className="bg-transparent hover:bg-gray-100 text-gray-600 p-2 rounded-full">
            <Videocam />
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageBoard;
