import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import {auth} from "../firebase";
import upload from '../icons7-upload-32.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className='flex items-center mt-1 bg-[#25262f] justify-between ml-[5%] p-1 h-[10%] text-white '>
      <div className='flex'>
        <img src={currentUser.photoURL} alt='user' className='bg-white w-10 h-10 rounded-full'/>
        <span className='text-white ml-3 mt-1 font-bold'> {currentUser.displayName} </span>
      </div>
      <button
        onClick={()=>signOut(auth)}
        type="button"
        className='w-12 h-12 mr-[5%]'
      >
        <img src={upload} alt='logout'/>
      </button>
    </div>
  )
}

export default Navbar
