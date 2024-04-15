import React, { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, fetchEmployees } from '../../Store/UserProfileSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
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

function Profile2() {
  const navigate = useNavigate();
  const client = useApolloClient();
  const dispatch = useDispatch();
  var newdataa = null;
  const { loading, error, data, refetch } = useQuery(GET_Employee);

  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  useEffect(() => {
    dispatch(setUser(newdataa));
  });

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    client.clearStore(); // Clear the Apollo Client cache
    navigate('/login');
  };

  if (!loading && !error && data) {
    var binImage = atob(data.employee.data);
    var arr = new Uint8Array(binImage.length);
    for (var j = 0; j < binImage.length; j++) {
      arr[j] = binImage.charCodeAt(j);
    }
    var blobb = new Blob([arr], { type: 'image/png' });
    var urll = URL.createObjectURL(blobb);
    newdataa = { userName: data.employee.userName, occupation: data.employee.occupation, id: data.employee.id, data: urll };
  }

  return (
    <div className='border-2 md:col-span-2 rounded-lg h-full bg-cyan-700 text-white tracking-wider flex flex-col gap-16 content-start items-center'>
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>error</h1>
      ) : (
        <>
          <div className='mt-8' onClick={() => setShowForm(!showForm)}>
            <div className='relative'>
              <img className='rounded-full w-36 h-36 border-4 flex justify-center items-center border-red-darkest cursor-pointer' src={newdataa.data} alt='' />
              <EditIcon className='absolute top-0 right-0 cursor-pointer' />
            </div>
            <h1 className='pl-4'>{newdataa.userName}</h1>
            <h4 className='text-sm pl-2'>{newdataa.occupation}</h4>
          </div>
          {showForm && (
            <div className="absolute left-64 top-28 flex justify-center items-center h-screen w-[600px] border-4">
              <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Image
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="image"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image"
                    className="block w-48 h-48 border border-gray-400 rounded-lg cursor-pointer"
                  >
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                     <div> 
                     <img className='w-full h-full border-4 flex justify-center items-center border-red-darkest cursor-pointer transform hover:scale-150 transition duration-500' src={newdataa.data} alt='' />
                      <span className="text-gray-400 text-lg flex justify-center items-center h-full">
                        Select Image
                      </span>
                      <br/>
                     </div> 
                    )}
                  </label>
                </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                   Full Name
                 </label>
                 <input
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="fullName"
                   type="text"
                   placeholder="Full Name"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                   Email Address
                 </label>
                 <input
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="email"
                   type="email"
                   placeholder="Email Address"
                 />
               </div>
               <div className="mb-6">
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                   Password
                 </label>
                 <input
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="password"
                   type="password"
                   placeholder="Password"
                 />
               </div>
               <div className="flex items-center justify-between">
                 <button
                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button"
                 >
                   Send
                 </button>
                 <button
                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button"
                 >
                   Cancel
                 </button>
               </div>
             </form>
           </div>
          
          )}
          <div className='flex flex-col  justify-between  h-56'>
            <div className='border-b-2'>
              <DashboardIcon style={{ fontSize: 'medium' }} />{' '}
              <span className='cursor-pointer tracking-widest'>
                <Link to={'/homee/dashboard'}>Dashboard</Link>
              </span>
            </div>
            <div className='border-b-2'>
              <PeopleOutlineIcon style={{ fontSize: 'medium' }} />{' '}
              <span className='cursor-pointer tracking-widest'>
                <Link to={'/homee/empList'}>Employees</Link>
              </span>
            </div>
            {newdataa.userName === 'simon' ? (
              <div className='border-b-2'>
                <PersonAddIcon style={{ fontSize: 'medium' }} />
                <span className='cursor-pointer' onClick={()=>setShowForm(false)}>
                  <Link to='/homee/addEmployee'>Add Employee</Link>
                </span>
              </div>
            ) : null}
            <div className='border-b-2 '>
              <EmailIcon style={{ fontSize: 'medium' }} />{' '}
              <span className='cursor-pointer tracking-widest'>
                <Link to={`/homee/message/65e03d12102c7fe85bdec19e`}>Messages</Link>
              </span>
            </div>
            <div className='border-b-2 '>
              <LogoutIcon style={{ fontSize: 'medium' }} />{' '}
              <span className='cursor-pointer tracking-widest' onClick={handleLogout}>
                Logout
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile2;
