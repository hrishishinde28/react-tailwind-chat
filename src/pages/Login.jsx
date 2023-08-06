import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../firebase.js';


const Login = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/");
      console.log("AUTHURIZED");
    }catch(err){
      setErr(true);
    }
    // bg-gradient-to-r from-[rgb(40,43,54)] via-[rgb(40,43,54)] via-50%  to-[rgba(40,43,54)] to-100%
  }
  return (
    <div className=' bg-gradient-to-r from-[#121419] via-[#14151d] via-50%  to-[rgba(20,21,29,255)] to-100% flex h-screen items-center justify-between '>
        <div className=' ml-[10%] mt-[10%]'>
            <p className='text-[40px]  text-white'> Welcome Back 👋 </p>
            <p className='text-[#898a91] mb-5'> Enter the email to get started </p>
            <form onSubmit={handleSubmit}>
                <div class="relative mb-5" data-te-input-wrapper-init>
                  <input type="email" id="Input1" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#373744] rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#898a91] focus:outline-none focus:ring-0 focus:border-[#898a91] peer"/>
                  <label for="Input1" class="absolute text-sm text-gray-500 rounded-md dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#373744]  px-2 peer-focus:px-2 peer-focus:text-[#898a91] peer-focus:dark:text-[#898a91] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"> Email </label> 
                </div>
                <div class="relative mb-5" data-te-input-wrapper-init>
                  <input type="password" id="Input2" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#373744] rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#898a91] focus:outline-none focus:ring-0 focus:border-[#898a91] peer"/>
                  <label for="Input2" class="absolute text-sm text-gray-500 rounded-md dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#373744]  px-2 peer-focus:px-2 peer-focus:text-[#898a91] peer-focus:dark:text-[#898a91] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"> Password </label> 
                </div>
                <button className='bg-[#f9491b] w-[100%] px-5 py-3 mb-2 text-white'>Enter</button>
            </form>
            {err && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Somthing went wrong.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <button className="fill-current h-6 w-6 text-red-600" onClick={()=>setErr(false)}> X </button>
              </span>
            </div>}
            <p className='text-[#898a91]'>You don't have an account? <Link className='text-blue-200' to="/register">Register</Link></p>
        </div>
        {/* <img className=' cover h-screen' src={BG}/> */}
    </div>
  )
}

export default Login
