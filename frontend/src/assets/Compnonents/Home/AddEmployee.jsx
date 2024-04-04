import React, { useState } from 'react';

const AddEmployee = () => {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [workPosition, setWorkPosition] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, password, gender, workPosition });
  };


  return (
    <div className=" sm:col-span-5  lg:col-span-6   ml-4 grid grid-cols-5">
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
      <div className="flex  min-h-screen ">
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
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
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
