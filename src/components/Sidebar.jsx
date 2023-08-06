import React from 'react'
import Navbar from './Navbar.jsx'
import Search from './Search.jsx'
import Chats from './Chats.jsx'

const Sidebar = () => {
  return (
    <div className='flex-[1] bg-[#25262f] h-screen'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar
