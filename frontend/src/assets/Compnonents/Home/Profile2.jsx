import React,{useState,useEffect} from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useQuery,useMutation,gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setUser,fetchEmployees} from '../../Store/UserProfileSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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

function Profile2()
{
  const dispatch = useDispatch();
  var newdataa = null;
  useEffect(() => {
    dispatch(setUser(newdataa));
  },);

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
    // dispatch(fetchEmployees())
  }
  return (
    <div className='border-2 md:col-span-2 rounded-lg h-full bg-cyan-700 text-white tracking-wider flex flex-col gap-16 content-start items-center'>
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
               <div className='flex flex-col  justify-between  h-32'>
                  <div className='border-b-2'>
                    <DashboardIcon  style={{fontSize:'medium'}}/> <span className='cursor-pointer'>Dashboard</span>
                  </div>
                  <div className='border-b-2'>
                    <PeopleOutlineIcon style={{fontSize:'medium'}}/> <span className='cursor-pointer'>Employees</span>
                  </div>
                  <div className='border-b-2'>
                    <PersonAddIcon style={{fontSize:'medium'}}/>
                    <span className='cursor-pointer'> 
                     <Link to={'/homee/addEmployee'}> {" "}Add Employee</Link>
                    </span>
                  </div>
                  <div className='border-b-2'>
                    <EmailIcon style={{fontSize:'medium'}}/> <span className='cursor-pointer'><Link to={`/homee/message/65e03d12102c7fe85bdec19e`}>Messages</Link></span>
                  </div>
      
               </div>
                </>
           )
        }

              
    
            </div>
  )
}

export default Profile2