import { useQuery,useMutation,gql } from '@apollo/client';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

const GET_MESSAGE = gql`
query GetMessage($senderId:ID,$reciverId:ID) {
    getMessage(senderId:$senderId,reciverId:$reciverId)
     {
      _id
      Sender
      Reciver
      MessageType
      TextMessage
     } 
  }
`;
const MessageBoard = (props)=>{
  const user = useSelector(state => state.user.user);
  const {id} = useParams();
 
  
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { senderId: user.id,reciverId:id},
  });
  
  if(loading)
  {
    return <h1>Loading</h1>
  }
  if(error)
  {
    return <h1>Error</h1>
  }

   return(
      <div>
        {data.getMessage.map((e)=>{
          // {e._id === user.id ? }
          return (
          // <h1 key={e._id}>{e.TextMessage}</h1>
          <div
          key={e._id}
          style={{
            backgroundColor: e.Sender === user.id ? 'red' : 'green',
            padding: '10px',
            margin: '5px'
          }}
        >
          {e.TextMessage}
        </div>
          )
        })}
      </div>
    )
}

export default MessageBoard