import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

const LoginPage = ()=>{
    const navigate = useNavigate()
    const [loginUser] = useMutation(LOGIN_USER);
    const [userName,setUsername] = useState('');
    const [pass,setPass] = useState('');
    const changeUsername = (e)=>{
        setUsername(e.target.value)
    }
    const changePassword = (e)=>{
        setPass(e.target.value)
    }
    async function handleForm(e)
    { 
        e.preventDefault()
        try {
            const { data } = await loginUser({
              variables: {
                username:userName,
                password:pass
              }
            });
            if (data.loginUser) {
              document.cookie = `token=${data.loginUser}`;
               // redirect to homepage
              //  sessionStorage.setItem('token', data.loginUser);
               navigate('/homee/message/65e03d12102c7fe85bdec19e');
            } else {
              // show error message
            }
            // window.location.href = '/messages/65e03d12102c7fe85bdec19e';
            
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/login2.jpg')"}}>
        <div className="w-full max-w-md p-8  rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-900">Simon Company</h2>
          <form className="space-y-4" onSubmit={handleForm}>
            <div className="relative opacity-80 ">
              <PersonIcon className="absolute top-4 left-4 text-gray-400" />
              <input type="text" className="w-full py-2 pl-12 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Username" value={userName}
              onChange={changeUsername} required/>
            </div>
            <div className="relative opacity-80 ">
              <LockIcon className="absolute top-4 left-4 text-gray-400" />
              <input type="password" className="w-full py-2 pl-12 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Password"value={pass} 
              onChange={changePassword} required/>
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" type='submit'>Login</button>
            <a href="#" className="text-sm text-blue-500 block text-center">Forgot password?</a>
          </form>
        </div>
      </div>
    )
}

export default LoginPage