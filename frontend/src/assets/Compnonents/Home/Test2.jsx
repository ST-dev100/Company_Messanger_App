import React,{useState,useEffect} from 'react'
import { gql } from '@apollo/client';
import streamToBlob from 'stream-to-blob';
// import { toStream } from 'apollo-link-stream';
import { useQuery,useMutation } from '@apollo/client';
import { removeDeleteMessagesList,fetchEmployees} from '../../Store/UserProfileSlice';
import { useSelector, useDispatch } from 'react-redux';


const GET_FILE = gql`
  query GetFile {
    getFiles
  }
`;

const ShowLargeFiles = ()=>{
    const dispatch = useDispatch();
    const post = useSelector((state) => state.user.ProfileUser.employee);
    const loading = useSelector((state) => state.user.ProfileUser.status);
    const error = useSelector((state) => state.user.ProfileUser.error);
    // const { loading, error, data } = useQuery(GET_FILE);
    useEffect(()=>{
      dispatch(fetchEmployees())
    },[dispatch])
    console.log(post)
  // return(
  //   <div>
  //   {loading ? (
  //     <h1>loading</h1>
  //   ):error?(
  //     <h1>error</h1>
  //   ):(
  //     <div><h1>Loaded</h1>
  //     <video autoPlay controls>
  //       <source src={data.getFiles.path}/>
  //     </video>
  //     </div>
      
  //     )}
  
  // </div>
  // )
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
 
  //   var binaryImage = atob(data.getFiles);
  //   var array = new Uint8Array(binaryImage.length);
  //   for (var i = 0; i < binaryImage.length; i++) {
  //     array[i] = binaryImage.charCodeAt(i);
  //   }  
  //   var blob = new Blob([array], {type: 'image/png'});
  //   const objUrl = URL.createObjectURL(blob);
 

   if(loading)
   {
    return <h1>laoding...</h1>
   }
  if(post){
  return (
    <div>
     
      <h1>
        {post.userName}
      </h1>
    </div>
  );
}
}

export default ShowLargeFiles