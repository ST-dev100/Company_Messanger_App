import React from 'react'
import { useQuery,useMutation,gql,useSubscription } from '@apollo/client';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import { addPost} from '../../Store/DisplayMessageSlice';

const MESSAGE_ADDED = gql`
  subscription MessageAdded{
    messageAdded {
      _id
      Sender
      Reciver
      MessageType
      TextMessage
    }
  }
`;

const MessageBoard2 = (props) => {
const dispatch = useDispatch();

const { data, loading, error } = useSubscription(MESSAGE_ADDED,{
  onSubscriptionData:({ subscriptionData })=>{
    console.log("recived", subscriptionData);
  },
  onError:(err)=>{
    console.log("Error:", err.message);
  }
});

const user = useSelector(state => state.user.user);
// console.log(props.c)


  return (
    <>
      {props.c.map((item,index)=>(
        <div
        key={index}
        className={`p-4 ${item.Sender === user.id  ? 'bg-blue-500 rounded-lg text-left' : 'bg-white rounded-lg text-right'}`}
        >
          {item.TextMessage}
        </div>  
      )

      )}
    </>
  )
}

export default MessageBoard2
