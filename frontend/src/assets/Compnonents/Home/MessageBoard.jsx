import { useQuery,useMutation,gql } from '@apollo/client';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

const GET_MESSAGE = gql`
query GetMessage($senderId:ID,$reciverId:ID) {
    getMessage(senderId:$senderId,reciverId:$reciverId) 
  }
`;
const MessageBoard = (props)=>{
  const user = useSelector(state => state.user.user);
  const {id} = useParams();
 
  
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { senderId: user.id,reciverId:id},
  });
  console.log(props)
    return(<h1>Message Board</h1>)
}

export default MessageBoard