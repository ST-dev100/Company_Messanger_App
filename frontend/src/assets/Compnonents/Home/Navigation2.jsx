import React,{useState} from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link,Outlet} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useQuery,useMutation,gql } from '@apollo/client';
import Profile2 from './Profile2';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


const GET_Employess = gql`
  query getEmployees {
    employees {
      userName
      dataa
      id
    }
  }
`;


function Navigation2() {
  // const post = useSelector((state) => state.user.ProfileUser.employee);
  let post =1
  let newMap = null;
  let {id} = useParams()
  console.log(post)
  console.log(id)
  const { loading, error, data } = useQuery(GET_Employess);
  if(!loading && !error && data)
  {
    // console.log(data.employees)
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
        <div className='grid grid-cols-1 m-2 gap-2'>
          <div className='bg-white rounded-lg   h-full grid grid-cols-8'>
          
            <Profile2/>
            
            <Outlet/>
            
          </div>
         
         
        </div>
      )
}

export default Navigation2
