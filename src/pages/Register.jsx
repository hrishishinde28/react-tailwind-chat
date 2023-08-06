import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,db } from '../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';
import upload from '../icons8-upload-32.png';

const Register = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storage = getStorage();
      const storageRef = ref(storage , displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await setDoc(doc(db,"users",res.user.uid),{
              uid: res.user.uid,
              displayName,
              email,
              photoURL : downloadURL,
            });
            await setDoc(doc(db,"userChats",res.user.uid),{});
            navigate("/");
            await updateProfile(res.user,{
              displayName,
              photoURL : downloadURL,
            });
          });
        }
      );
    }catch(err){
      setErr(true);
    }

    
    }
  return (
    <div className=' bg-gradient-to-r from-[#121419] via-[#14151d] via-50%  to-[rgba(20,21,29,255)] to-100% flex h-screen items-center justify-between '>
        <div className='ml-[10%] mt-[5%]'>
            <p className='text-[40px]  text-white'> Welcome Enjoy 👋 </p>
            <p className='text-[#898a91] mb-5'> Make the account </p>
            <form onSubmit={handleSubmit}>
                <div className="relative mb-5" data-te-input-wrapper-init>
                  <input type="text" id="Input0" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#373744] rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#898a91] focus:outline-none focus:ring-0 focus:border-[#898a91] peer"/>
                  <label for="Input0" class="absolute text-sm text-gray-500 rounded-md dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#373744]  px-2 peer-focus:px-2 peer-focus:text-[#898a91] peer-focus:dark:text-[#898a91] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"> Display Name </label> 
                </div>
                <div className="relative mb-5" data-te-input-wrapper-init>
                  <input type="email" id="Input1" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#373744] rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#898a91] focus:outline-none focus:ring-0 focus:border-[#898a91] peer"/>
                  <label for="Input1" class="absolute text-sm text-gray-500 rounded-md dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#373744]  px-2 peer-focus:px-2 peer-focus:text-[#898a91] peer-focus:dark:text-[#898a91] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"> Email </label> 
                </div>
                <div className="relative mb-5" data-te-input-wrapper-init>
                  <input type="password" id="Input2" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#373744] rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#898a91] focus:outline-none focus:ring-0 focus:border-[#898a91] peer"/>
                  <label for="Input2" class="absolute text-sm text-gray-500 rounded-md dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#373744]  px-2 peer-focus:px-2 peer-focus:text-[#898a91] peer-focus:dark:text-[#898a91] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"> Password </label> 
                </div>
                <input className='hidden' type="file" id="file" />
                <label className='block text-[#898a91] text-[20px] mb-5 cursor-pointer' htmlFor='file'>
                    <img className='inline w-11' src={upload} alt="logo" />
                    Choose profile image
                </label>
                <button className='bg-[#f9491b] w-[100%] px-5 py-3 mb-2 text-white'>Sign up</button>
            </form>
             {err && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Somthing went wrong.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <button className="fill-current h-6 w-6 text-red-600" onClick={()=>setErr(false)}> X </button>
              </span>
            </div>}
            <p className='text-[#898a91]'>You do have an account? <Link className='text-blue-200' to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register
