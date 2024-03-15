import { useQuery,useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import {useState,useEffect} from 'react';

const GET_USERS = gql`
  query getUsers {
    books {
      name
    }
  }
`;
const GET_Employess = gql`
  query getEmployees {
    employees {
      userName
      dataa
      id

    }
  }
`;
const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) 
  }
`;
const POST_MESSAGE = gql`
  mutation postMessage ($name:String!,$author:String!) {
    addUser(name:$name, author:$author)
  }
`;
const VIDEO_UPLOAD = gql`
  mutation UploadVideo($file2: Upload!) {
    uploadVideo(file2: $file2)
  }
`;

const Test = () => {
  const [f,setF] = useState('');
  const [ff,setFF] = useState('nnnn');
  const [daa,setDaa] = useState(null);
  const [newData,setNewData] = useState(null);
  let newMap = null;
    const { loading, error, data } = useQuery(GET_Employess);
    // const { loaded, err, da } = useQuery(GET_Employess);
    const [addUser] = useMutation(POST_MESSAGE)
    const [uploadPhoto] = useMutation(UPLOAD_PHOTO);
    const [uploadVideo] = useMutation(VIDEO_UPLOAD);

   
    if(!loading && !error && data)
    {
      console.log(data.employees)
      newMap = data.employees.map(e=>{
        var binaryImage = atob(e.dataa);
         var array = new Uint8Array(binaryImage.length);
         for (var i = 0; i < binaryImage.length; i++) {
           array[i] = binaryImage.charCodeAt(i);
         }  
         var blob = new Blob([array], {type: 'image/png'});
         var url = URL.createObjectURL(blob);
         return {userName:e.userName,dataa:url,id:e.id}
      })
      console.log(newMap)
      
    }
    
    async function updateData(eve)
    {
     
     
       await addUser({
        variables:{name:"jj",author:"jkjk"}
      })
    
    }
    const handleFileChange = async (e)=>{
      const file = e.target.files[0]
      const { data } = await uploadPhoto({
        variables: {
          file:file
        },
      });
      

      console.log(file)
      const reader = new FileReader();
  
      // Set the onload event handler
      reader.onload = function(event) {
        // Convert the file to an ArrayBuffer
        // const arrayBuffer = reader.result;
        const base64 = reader.result.split(",")[1];
        console.log(reader.result)
        setF(base64)
        // Use the arrayBuffer as needed (e.g. send it to a server)
        // console.log(arrayBuffer);
      };
      
      // Read the file as an ArrayBuffer
      // reader.readAsArrayBuffer(file);
      reader.readAsDataURL(file)
    }
    const handleFileChangee = async(e) => {
      const file = e.target.files[0]
      const formData = new FormData();
  formData.append('file', file);
      const { data,errors } = await uploadVideo({
        variables: {
          file2:file
        },
      });
      if(errors){
        console.log("the error is",errors)
      }else{
        console.log(data)
      }
      
    };
   
    return (
      <div>
        {loading ? (
          <h1>loading</h1>
        ):error?(
          <h1>error</h1>
        ):(
          <div>
          <ul>
          {data && newMap.map((d,i)=>(
            <li key={i}>{d.userName} {d.id}
            <img src={d.dataa}/>
            </li>
          ))}
          </ul>
          <button  className="border-4 bg-cyan-300"
        onClick={(e)=>updateData()}
        >send and show the magic</button><br/>
        
        <input type="file" onChange={handleFileChange}/>
        <br/>
        <br/>
        <input type="file"    onChange={handleFileChangee} />
          </div>
          )}
      
      </div>
    );
  }
export default Test