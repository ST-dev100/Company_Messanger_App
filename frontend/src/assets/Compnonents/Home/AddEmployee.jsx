import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_EMPLOYEE = gql`
  mutation addEmployee($employeePic:Upload,$fullName:String,$gender:String,$postion:String,$password:String, $email:String, $userName:String) {
    addEmployee(employeePic: $employeePic,fullName:$fullName,gender:$gender,postion:$postion,password:$password, email:$email, userName:$userName) 
  }
`;

const AddEmployee = () => {
    const [fullName, setFullName] = useState('');
    const [pic, setPic] = useState(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('');
    const [workPosition, setWorkPosition] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [addEmployee] = useMutation(ADD_EMPLOYEE,{
      update:(cache,data)=>{
        console.log(data)
      }
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleUpload = (e) => {
      const file = e.target.files[0];
      setPic(file);
      const reader = new FileReader();

      reader.onload = () => {
        setImageUrl(reader.result);
      };

      reader.readAsDataURL(file);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log({ fullName, password, gender, workPosition, pic, email, userName });
      const { data, errors } = await addEmployee({
        variables: {
          employeePic: pic,
          fullName,
          gender,
          postion: workPosition,
          password,
          email,
          userName
        },
      });
    };

    return (
      <div className="sm:col-span-5 lg:col-span-6 ml-4 grid grid-cols-5">
        <div className='col-span-2 flex flex-col gap-8'>
          <h1 className="text-xl font-bold mb-4 font-medium">Add Employee</h1>
          <div className="relative w-56 h-56 rounded-full overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl || 'https://via.placeholder.com/150'})` }}></div>
              <label htmlFor="photoUpload" className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center cursor-pointer">
                  {imageUrl ? null : <span className="text-9xl text-red-500 ">+</span>}
                  <input id="photoUpload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
          </div>
          <p className='ml-9 font-light tracking-wide'> Change Profile Picture</p>
        </div>
        <div className='col-span-3'>
          <div className="flex min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white w-full p-8 rounded-md shadow-lg">
              <h2 className="text-xl font-bold mb-4">Employee Form</h2>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">User Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-2 text-gray-500">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Gender</label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Work Position</label>
                <input
                  type="text"
                  value={workPosition}
                  onChange={(e) => setWorkPosition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default AddEmployee;
