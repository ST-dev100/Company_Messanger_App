import { useQuery,useMutation,gql,useSubscription } from '@apollo/client';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import { addPost} from '../../Store/DisplayMessageSlice';
import MessageBoard2 from './MessageBoard2';

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
  const dispatch = useDispatch();
  const newdataa = [];
  const user = useSelector(state => state.user.user);
  const message = useSelector(state => state.messages.posts);
  console.log("initial",message)
  const {id} = useParams();
 

//  const {dd,ll} = useSubscription(MESSAGE_ADDED,{
//   onSubscriptionData:(data)=>console.log("recived")
//  })
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    // pollInterval:500,
    variables: { senderId: user.id,reciverId:id},
  });

  useEffect(() => {
    if (!loading && !error) {
      dispatch(addPost(data.getMessage));
    }
  }, [data, loading, error, dispatch]);

  if(loading)
  {
    return <h1>Loading</h1>
  }
  if(error)
  {
    return <h1>Error</h1>
  }
  data.getMessage.map(e=>newdataa.push(e))
  // data.getMessage.forEach((message) => {
   
  // data.getMessage.map(msg=>dispatch(addPost(msg)))
   return (
    <div className="flex  flex-col w-full h-80 gap-2 border-4 overflow-y-auto">
      {message && message.map((item,index)=>(
        <div
        key={index}
        className={`p-4 ${item.Sender === user.id  ? 'bg-blue-500 rounded-lg text-left' : 'bg-white rounded-lg text-right'}`}
        >
          {item.TextMessage}
        </div>  
      )

      )}
    </div>

   )
  //  return(
  //     <div>
  //       {data.getMessage.map((e)=>{
  //         return (
  //         <div
  //         key={e._id}
  //         style={{
  //           backgroundColor: e.Sender === user.id ? 'red' : 'green',
  //           padding: '10px',
  //           margin: '5px'
  //         }}
  //       >
  //         {e.TextMessage}
  //       </div>
  //         )
  //       })}
  //     </div>
  //   )
}

export default MessageBoard