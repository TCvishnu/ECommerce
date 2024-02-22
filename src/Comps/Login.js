import React from 'react';
import { useState } from 'react';
import './Styles.css';
import Eye from './icons/eye';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    const validateLogin = () => {
        fetch("https://dummyjson.com/users?skip=0&limit=100")
        .then(response => response.json())
        .then(json => {
            let jsonArr = json.users;
            jsonArr.forEach(user => {
                if (user.username === username && user.password === password){
                    navigate("/products", { state: {
                        loggeduser: username,
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        id:user.id}});  
                }
            });
            setInvalid(true);
        }
        );
    }
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-e8'>
        <div className='w-10/12 h-3/6 sm:w-3/12 sm:h-4/6 bg-white rounded-md shadow-form
        flex flex-col justify-center items-center gap-4'>
            <header className='text-2xl font-semibold'>Welcome Back</header>
            
            <div className='w-full h-28 flex flex-col items-center gap-4'>
                <input placeholder='Username' 
                onChange={(event)=>{setUsername(event.target.value)}}
                className='outline-none border-small rounded-3xl border-gray-400 pl-4 h-10 w-9/12'/>
            <div className='w-9/12 h-8 relative flex flex-row'>
                <input  placeholder='Password' type={showPassword? "text":"password"}
                onChange={(event)=>{setPassword(event.target.value)}}
                className='w-full outline-none border-small rounded-3xl border-gray-400 pl-4 h-10'/>
                <button onClick={()=>{setShowPassword(prev => !prev)}}>
                    <Eye classstyle="absolute top-2 right-2"/>
                </button>   
            </div>
            
            </div>
            {invalid && <p className='text-xs text-red-500'>*Invalid username and password</p>}
            <button className='text-xs text-gray-600 underline'>Forgot Password?</button>

            <button className='w-9/12 bg-teal-700 text-white h-10 rounded-3xl'
            onClick={validateLogin}>Log in</button>
        </div>
        
    </div>
  )
}
