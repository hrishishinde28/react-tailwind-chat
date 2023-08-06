import React from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
  return (
      <div className='flex h-screen items-center justify-center bg-[#25262f]'>
        <Sidebar/>
        <Chat/>
      </div>
  )
}

export default Home
