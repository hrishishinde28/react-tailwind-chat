import { useEffect, useState,useContext } from 'react'
import {doc,onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import { AuthContext } from '../context/AuthContext';
import {ChatContext} from '../context/ChatContext';


const Chats = () => {

  const [chats,setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() =>{
    const getChats = () =>{
      const unsub  = onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
          setChats(doc.data())
      });
      return ()=>{
        unsub();
      };
    };

    currentUser.uid && getChats()
  },[currentUser.uid]);

  const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER",payload:u})
  }

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=> b[1].date-a[1].date).map((chat) => (
      <div className='flex w-[90%] p-[3%] mt-[3%] ml-[3%]  items-center rounded-md hover:bg-blue-500' key={chat[0]} onClick={() =>handleSelect(chat[1].userInfo)}>
        <img className='w-16 h-16 rounded-[50%] ' src={chat[1].userInfo.photoURL} alt="im"/>
        <div className='ml-[5%]'>
          <span className='text-white text-[20px] '> {chat[1].userInfo.displayName} </span>
          <p className='text-[#c2c3ca]'> {chat[1].lastMessage?.text} </p>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Chats
