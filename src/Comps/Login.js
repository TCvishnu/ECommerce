import React from 'react';
import { useState } from 'react';
import './Styles.css';
import Eye from './icons/eye';
import ClosedEye from './icons/closeEye';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    const handlePassDisplay = () => {
        setShowPassword(prev => !prev);
    }

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
        <div className='w-8/12 sm:w-3/12 bg-white rounded-md shadow-form h-96
        flex flex-col justify-start items-center gap-4 max-h-screen overflow-y-auto py-8'>
            <header className='text-xl font-semibold'>Welcome Back</header>
            
            <div className='w-full flex flex-col items-center gap-4'>
                <input placeholder='Username' 
                onChange={(event)=>{setUsername(event.target.value)}}
                className='outline-none border rounded-md border-gray-400 p-4 h-10 w-9/12 text-sm'/>
                <div className='w-9/12 relative flex flex-row'>
                    <input  placeholder='Password' type={showPassword? "text":"password"}
                    onChange={(event)=>{setPassword(event.target.value)}}
                    className='w-full outline-none border rounded-md border-gray-400 p-4 h-10 text-sm'/>
                    {showPassword &&  <Eye styling="absolute top-2 right-2" onChangeDisplay={()=>{setShowPassword(false)}}/>
                    }   
                    {!showPassword && <ClosedEye styling="absolute top-2 right-2" onChangeDisplay={()=>{setShowPassword(true)}}/>}
                </div>    
            </div>
            {invalid && <p className='text-xs text-red-500'>*Invalid username and password</p>}
            <button className='text-xs text-gray-500 underline'>Forgot Password?</button>

            <button className='w-9/12 mt-8 bg-teal-700 text-white h-10 rounded-md text-sm min-h-10'
            onClick={validateLogin}>Log in</button>
        </div>
        
    </div>
  )
}
