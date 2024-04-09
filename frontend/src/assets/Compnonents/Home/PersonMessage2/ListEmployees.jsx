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
import { useSelector,useDispatch} from 'react-redux';
import {Link,Outlet} from 'react-router-dom';

const GET_Employess = gql`
  query getEmployees {
    employees {
      userName
      dataa
      id
    }
  }
`;



function ListEmployees() {
  let newMap = null;
  let post =1 
   const { loading, error, data } = useQuery(GET_Employess);
   
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
  }
  return (
  <div className='bg-white h-96 mt-1 ml-2 col-span-2 '>
    <div className='flex items-center h-16  p-2 bg-white rounded-md shadow-md'>
        <input type="text" placeholder='Search...' className='flex-grow border-2 px-2 py-1 rounded-lg w-6 text-gray-700 focus:outline-none bg-white'/>
        <SearchIcon className='w-6 h-6 text-gray-700 cursor-pointer'/>
      </div>
      <div className="w-full h-full  border-4 overflow-y-auto">
        {loading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>error</h1>
        ) : (
          <ul className="divide-y divide-gray-300">
            {data &&
              newMap.map((d, i) =>
                d.id !== post ? (
                  <li key={i} className="flex items-center py-2">
                    <img src={d.dataa} alt={d.usernName} className="w-10 h-10 rounded-full" />
                    <Link to={`/homee/message/${d.id}`}>
                      <span className="ml-2">{d.userName}</span>
                    </Link>
                    <MoreHorizIcon className="ml-auto cursor-pointer" />
                  </li>
                ) : null
              )}
          </ul>
        )}
    </div>
</div>
)
}

export default ListEmployees
