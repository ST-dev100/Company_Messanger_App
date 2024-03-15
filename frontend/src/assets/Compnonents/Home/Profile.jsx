import React,{useState,useEffect} from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useQuery,useMutation,gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setUser} from '../../Store/UserProfileSlice';

import {Link,Outlet} from 'react-router-dom';

const GET_Employee = gql`
  query getEmployee {
    employee {
      userName
      occupation
      id
      data
    }
  }
`;

function Profile()
{
  const dispatch = useDispatch();
  var newdataa = null;
  useEffect(() => {
    dispatch(setUser(newdataa));
  });

    const { loading, error, data } = useQuery(GET_Employee);
    if(!loading && !error && data)
  {

    // console.log(data)
    var binImage = atob(data.employee.data)
    var arr = new Uint8Array(binImage.length)
    for (var j = 0; j < binImage.length; j++) {
      arr[j] = binImage.charCodeAt(j);
    }
    var blobb = new Blob([arr], {type: 'image/png'});
    var urll = URL.createObjectURL(blobb);
    newdataa = {userName:data.employee.userName,occupation:data.employee.occupation,id:data.employee.id,data:urll}  
  }
  return (
    <div className='border-2 rounded-lg h-full bg-cyan-700 text-white tracking-wider flex flex-col gap-16 content-start items-center'>
        {
            loading 
            ? (
                <h1>loading</h1>
            ):
            error?(
                <h1>error</h1>
            ):
            (
             <>
               <div className='mt-8'>
                 <img className='rounded-full w-36 h-36 border-4 flex justify-center items-center border-red-darkest' src={newdataa.data} alt=""  />
                 <h1 className='pl-4'>{newdataa.userName}</h1>
                 <h4 className='text-sm pl-2'>{newdataa.occupation}</h4>
               </div>
               <div className='flex flex-col  justify-between border-2 h-32'>
                  <div>
                    <DashboardIcon style={{fontSize:'medium'}}/> <span>Dashboard</span>
                  </div>
                  <div>
                    <PeopleOutlineIcon style={{fontSize:'medium'}}/> <span>Employees</span>
                  </div>
                  <div>
                    <EmailIcon style={{fontSize:'medium'}}/> <span>Messages</span>
                  </div>
      
               </div>
                </>
           )
        }

              
    
            </div>
  )
}

export default Profile