import Messages from './Messages.jsx'
import Input from './Input.jsx'
import {useContext } from 'react'
import {ChatContext} from '../context/ChatContext';


const Chat = () => {
  const {data} = useContext(ChatContext);

  return (
    <div className='flex-[2] h-screen'>
      <div className='flex ml-[1%] h-[10%] items-center'>
          {data.user.photoURL && <img className='bg-white w-10 h-10 rounded-full inline' src={data.user.photoURL} alt='img' />}
          <span className="text-white ml-[1%]">{data.user?.displayName}</span>
      </div>
      <Messages/> 
      <Input/>
    </div>
  )
}

export default Chat
