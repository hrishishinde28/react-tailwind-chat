import { useEffect, useState,useContext,useRef } from 'react'
import {ChatContext} from '../context/ChatContext';
import { doc,onSnapshot } from 'firebase/firestore';
import {db} from "../firebase";
import Single from './Single.jsx';

const Messages = () => {
  const {data} = useContext(ChatContext);
  const [messages,setMessages] = useState([]);
  const bottomRef = useRef(null);
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    return ()=>{
      unsub()
    }
  },[data.chatId]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className='h-[80%] bg-[#212129] overflow-y-scroll'>
      {messages.map((m)=> (
        <Single mess={m} key={m.id}/>
  ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default Messages
