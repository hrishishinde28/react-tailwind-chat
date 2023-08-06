import { useContext, useState } from 'react'
import {doc,collection,query,where,getDoc,getDocs, setDoc, updateDoc,serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";
import { AuthContext } from '../context/AuthContext';
import {ChatContext} from '../context/ChatContext';


const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {dispatch} = useContext(ChatContext);


  const {currentUser} = useContext(AuthContext);

  const handleSearch= async() =>{
    const q = query(collection(db,"users"),where("displayName","==",username));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(err){setErr(true)}
  };

  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  }


  const handleSelect = async() =>{
    const combine = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const res = await getDoc(doc(db,"chats",combine));

    if(!res.exists()){
      await setDoc(doc(db,"chats",combine),{messages: [] });
      
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combine+".userInfo"]:{
          uid: user.uid,
          displayName:user.displayName,
          photoURL: user.photoURL,
        },
        [combine+".date"]:serverTimestamp()
      });

      await updateDoc(doc(db,"userChats",user.uid),{
        [combine+".userInfo"]:{
          uid: currentUser.uid,
          displayName:currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combine+".date"]:serverTimestamp()
      });
    }

    dispatch({type:"CHANGE_USER",payload:user})

    setUser(null);
    setUsername("");

  };

  return (
    <div className='w-[100%]'>
      <div class='max-w-md mx-auto'>
          <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-black overflow-hidden">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </div>

              <input
              class="peer h-full w-full outline-none text-sm text-white bg-black"
              type="text"
              onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}
              placeholder="Search Someone ..." /> 
          </div>
      </div>

      {err && <span>User not found!</span>}
      {user && <div className='flex w-[90%] p-[3%] mt-[3%] ml-[3%]  items-center rounded-md hover:bg-blue-500' onClick={handleSelect}>
        <img className=' w-16 h-16 rounded-[50%] ' src={user.photoURL} alt="im"/>
        <span className='ml-[5%] text-white text-[20px] '> {user.displayName} </span>
      </div>}
    </div>
  )
}

export default Search
