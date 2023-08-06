import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import {ChatContext} from '../context/ChatContext';


const Single = ({mess}) => {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    if(currentUser.uid === mess.senderId) 
    {
      return(
        <div className="flex flex-row-reverse">
          <div className="inline mr-[2%] ml-[2%]">
            <img className="w-10 h-10 rounded-full inline"  src={mess.senderId === currentUser.uid 
              ? currentUser.photoURL
              : data.user.photoURL} alt="im"/>
          </div>
          <div className="bg-indigo-500 mt-5 mb-7 p-1.5 rounded-b-lg rounded-l-lg cover">
            {mess.img && <img className='h-[300px] w-[300px]' src={mess.img} alt="im"/>}
            {mess.text !== "" && <p className="text-white p-1"> {mess.text} </p>}
          </div>
        </div>
      );  
    }
    else{
      return(
        <div className="flex">
          <div className="inline ml-[2%] mr-[2%]">
            <img className="w-10 h-10 rounded-full inline"  src={mess.senderId === currentUser.uid 
              ? currentUser.photoURL
              : data.user.photoURL} alt="im"/>
          </div>
          <div className="bg-indigo-500 mt-5 mb-7 p-1 rounded-b-lg rounded-r-lg cover">
            {mess.img && <img className='h-[300px] w-[300px]' src={mess.img} alt="im"/>}
            {mess.text !== "" && <p className="text-white p-1"> {mess.text} </p>}
          </div>
        </div>
      );
    }
}

export default Single
