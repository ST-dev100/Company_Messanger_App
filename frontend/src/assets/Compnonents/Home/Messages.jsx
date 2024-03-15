import React,{useState} from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';

const contacts = [
  { id: 1, username: 'john_doe', image: 'simon.JPG' },
  { id: 2, username: 'jane_smith', image: 'simon.JPG' },
  { id: 3, username: 'mark_johnson', image: 'simon.JPG' },
  
  { id: 2, username: 'jane_smith', image: 'simon.JPG' },
  { id: 3, username: 'mark_johnson', image: 'simon.JPG' },
  { id: 2, username: 'jane_smith', image: 'simon.JPG' },
  { id: 3, username: 'mark_johnson', image: 'simon.JPG' },
  
];

function Messages() {
  return (
    <>
        
          <div className='bg-white mt-1 ml-2 border-4 '>
              <div className='flex items-center h-16  p-2 bg-white rounded-md shadow-md'>
                  <input type="text" placeholder='Search...' className='flex-grow border-2 px-2 py-1 rounded-lg w-6 text-gray-700 focus:outline-none bg-white' />
                  <SearchIcon className='w-6 h-6 text-gray-700' />

              </div>
              <div className="w-full h-96 overflow-y-auto">
                  <ul className="divide-y divide-gray-300">
                      {contacts.map(contact => (
                          <li key={contact.id} className="flex items-center py-2">
                              <img src={contact.image} alt={contact.username} className="w-10 h-10 rounded-full" />
                              <span className="ml-2">{contact.username}</span>
                              <MoreHorizIcon className='ml-auto' />
                          </li>
                      ))}
                  </ul>
              </div>

          </div>
      <div className='bg-gray-300 h-screen  sm:col-span-5 col-span-5 lg:col-span-2'>
              <div className="flex items-center justify-between p-4 bg-white">
                  <div className="flex items-center">
                      <img
                          src="simon.JPG"
                          alt="Profile Picture"
                          className="w-10 h-10 rounded-full object-cover mr-2" />
                      <h1 className="text-lg font-medium">John Doe</h1>
                  </div>
                  <div className="flex items-center">
                      <NotificationsIcon className="mr-2" />
                      <MoreHorizIcon />
                  </div>
              </div>
              <div className="flex flex-col items-start mt-2">
                  <div className="flex items-center mb-2">
                      <img
                          src="simon.JPG"
                          alt="Sender Profile"
                          className="w-8 h-8 rounded-full mr-2 ml-2" />
                      <span className="text-sm font-medium">Sender Name</span>
                  </div>
                  <div className="bg-gray-200 rounded-lg p-2 mb-2 ml-2 max-w-xs">
                      <p className="text-sm">Sender Messageddddddddddddddddddd</p>
                  </div>

                  <div className="flex items-end justify-end mb-2">
                      <img
                          src="simon.JPG"
                          alt="Receiver Profile"
                          className="w-8 h-8 rounded-full ml-2" />
                      <span className="text-sm font-medium">Receiver Name</span>
                  </div>
                  <div className="bg-blue-500 text-white rounded-lg p-2 mb-2 max-w-xs self-end">
                      <p className="text-sm">Receiver Messageffffffffffffffffffffff</p>
                  </div>
              </div>

          </div>
          </>
     
   
  )
}

export default Messages
