import React,{useState} from 'react'
import { gql } from '@apollo/client';
import streamToBlob from 'stream-to-blob';
// import { toStream } from 'apollo-link-stream';
import { useQuery,useMutation } from '@apollo/client';


const GET_FILE = gql`
  query GetFile {
    getFiles
  }
`;

const ShowLargeFiles = ()=>{
    const { loading, error, data } = useQuery(GET_FILE);
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
    var binaryImage = atob(data.getFiles);
    var array = new Uint8Array(binaryImage.length);
    for (var i = 0; i < binaryImage.length; i++) {
      array[i] = binaryImage.charCodeAt(i);
    }  
    var blob = new Blob([array], {type: 'image/png'});
    const objUrl = URL.createObjectURL(blob);
 



  return (
    <div>
      {/* <video controls src={objUrl} /> */}
      <img src={objUrl} alt="hi"/>
    </div>
  );
}

export default ShowLargeFiles