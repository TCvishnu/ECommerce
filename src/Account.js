import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logout from './Comps/icons/logout';

export default function Account() {
    const location = useLocation();
    const [user, setUser] = useState(null);

    const fetchUserDetails = () => {
        fetch("https://dummyjson.com/users")
        .then(responose => responose.json())
        .then(json => {
            setUser(json.users[location.state.details.id - 1]);
            console.log(json.users[location.state.details.id - 1]);
        });
    }
    useEffect(()=>{
        fetchUserDetails();
    }, []);

  return (
    <div className='w-screen h-screen customColor flex flex-col items-center justify-center'>
        { user !== null && 
            <div className='w-10/12 sm:w-6/12 h-4/6 bg-white rounded-lg shadow flex flex-col gap-2 items-center justify-start'>
            <div className='w-40 h-40 rounded-full shadowImg flex flex-row items-center justify-center -mt-20'>
                <img src={user.image} alt="User" className='w-19/12 h-5/6'/>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
                <h4 className='font-semibold text-xl nameShadow'>{user.firstName} {user.lastName}</h4>
                <h4 className='text-xs font-semibold'>{user.address.address}, {user.address.city}</h4>
            </div>
                    

            <div className='w-full h-5/6 flex flex-row justify-start items-center'>
                <div className='w-1/2 h-full flex flex-col items-start justify-center gap-2 p-4 sm:p-20'>
                    <div>
                    <h3 className='text-sm font-semibold'>Email:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.email}</h4>
                    </div>
                    <div>
                    <h3 className='text-sm font-semibold'>Phone:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.phone}</h4>
                    </div>
                    <div>
                    <h3 className='text-sm font-semibold'>DOB:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.birthDate}</h4>
                    </div>
                    <div>
                    <h3 className='text-sm font-semibold'>University:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.university}</h4>
                    </div>
                </div>
                <div className='w-1 h-3/6 sm:h-4/6 bg-gray-600'>
                </div>
                <div className='w-1/2 h-full flex flex-col items-start justify-center gap-2 p-4 sm:p-20'>
                    <div>
                    <h3 className='text-sm font-semibold'>Company:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.company.name}</h4>
                    </div>
                    <div>
                    <h3 className='text-sm font-semibold'>Title:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.company.title}</h4>
                    </div>
                    <div>
                    <h3 className='text-sm font-semibold'>Departmen:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.company.department}</h4>
                    </div>
                    <div>
                    <h3 className='text-sm font-semibold'>Adress:</h3>
                    <h4 className='text-xs ml-2 font-medium'>{user.company.address.address}, {user.company.address.city}</h4>
                    </div>
                </div>
                

            </div>
            
        </div>
        }
        <Link to="/" className='fixed top-2 left-2' title="Logout">
            <Logout />
        </Link>
    </div>
  )
}
