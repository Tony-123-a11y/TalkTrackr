import intro from '../../assets/intro.mp4'
import {motion} from 'motion/react'
import { IoClose } from "react-icons/io5"
import LoginForm from "../../components/UI/LoginForm"
import { useState } from 'react';
import RegisterForm from '../../components/UI/RegisterForm';
export default function AuthForm({setAuthForm,setWhichForm,whichForm}) {


  return (
    <div className="h-screen  z-100  w-full fixed left-1/2  -translate-x-1/2 top-1/2 -translate-y-1/2 backdrop-blur-sm  flex items-center justify-center p-4">
      <motion.div
      initial={{
        scale:0.8,
      }}
    
      animate={{
        scale:1
      }}
      className="relative flex  rounded-4xl  items-center justify-center w-full max-w-6xl h-full ">
        <button onClick={()=>setAuthForm(false)} className="cursor-pointer absolute  z-20 -right-15 top-3 text-white/70 text-4xl ">
            <IoClose />
        </button>
        
        <div className="w-3/5 h-full relative  rounded-l-4xl overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full  z-2 bg-gray-800/30 flex flex-col justify-center items-center text-center p-10  max-md:hidden">

  <h2 className="text-6xl font-semibold text-red-100 font-['inter'] leading-15 tracking-wide mb-10">
    Sign up to start <br /> meeting for free
  </h2>


  <div className="flex items-center justify-center gap-6  w-full max-w-md ">
  <div className="bg-white/40 backdrop-blur-md rounded-xl shadow p-4 flex-grow">
    <div className="flex items-center justify-center gap-4"> 
      <h2 className="text-4xl font-bold text-gray-800">2</h2>
      <div>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full mt-2">
          Daily renew
        </span>
        <h3 className="text-xl font-bold text-gray-600">Hours</h3>
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-2">
      for daily video calls 
    </p>
  </div>
  <div className="bg-white/40 backdrop-blur-md rounded-xl shadow p-4 flex-grow">
    <div className="flex items-center justify-center gap-4"> 
      <h2 className="text-4xl font-bold text-gray-800">1</h2>
      <div>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full mt-2">
          Daily renew
        </span>
        <h3 className="text-xl font-bold text-gray-600">Hour</h3>
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-2">
      for taking notes
    </p>
  </div>
</div>

</div>

         <video src={intro} muted autoPlay loop className="h-full object-cover"/> 
        </div>
        {
          whichForm === "login" ?  <LoginForm setWhichForm={setWhichForm}/> : <RegisterForm setWhichForm={setWhichForm}/>
        }
    
      </motion.div>
    </div>        

  )
}
