import {useState,useContext } from 'react'
import {doc, updateDoc, Timestamp, serverTimestamp, arrayUnion} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {ChatContext} from '../context/ChatContext';
import {storage,db} from "../firebase";
import { v4 as uuid } from 'uuid';
import upload from '../icons8-upload-32.png';


const Input = () => {

  
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const handleKey = (e) =>{
    e.code === "Enter" && handleSend();
  }

  const handleSend = async() =>{
      if(img){
        const storageRef = ref(storage , uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on( 
          (error)=>{

          },() => {
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
              await updateDoc(doc(db,"chats",data.chatId),{
                messages: arrayUnion({
                  id: uuid(),
                  text : text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img : downloadURL,
                })
              });  
            });
          }
        );

      }else{
        await updateDoc(doc(db,"chats",data.chatId),{
          messages: arrayUnion({
            id: uuid(),
            text : text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          })
        });
      }

      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId+".lastMessage"]:{
          text:text
        },
        [data.chatId+".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId+".lastMessage"]:{
          text:text
        },
        [data.chatId+".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);

  }
  return (
    <div className=' flex space-x-4 w-full h-[10%] '>
        <div class="sm:flex items-center bg-[#25262f] w-full overflow-hidden px-2 py-1 justify-between">
					<input class="text-base text-gray-400 bg-[#25262f] w-[80%] flex-grow outline-none pl-2 " type="text" placeholder="Enter Text ..." onKeyDown={handleKey} value={text} onChange={e => setText(e.target.value)} />
					<div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
            <input className='bg-indigo-600  text-white px-6 text-lg outline font-semibold py-4 rounded-r-md hidden' type='file' id="file" onClick={e => setImg(e.target.files[0])} />
            <label htmlFor='file'>
              <img className='inline h-10 bg-[#25262f]' src={upload} alt='img' />
            </label>
						<button onClick={handleSend} class="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">Send</button>
					</div>
				</div>
    </div>

  )
}

export default Input
