import React, { useCallback, useState } from "react";
import { Video, Keyboard, Phone } from "lucide-react"; // icons
import Button from "../components/UI/Button";
import ConcentricCircles from "../components/ConcentricCircles";
import Navbar from "../components/UI/Navbar";
import AuthForm from "./Auth/AuthForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [authForm, setAuthForm] = useState(false);
const [whichForm, setWhichForm] = useState(null);
const {isAuthenticated}= useSelector((state)=>state.user)
const navigate= useNavigate()
  return (
    <>
    {
       authForm   && <AuthForm setAuthForm={setAuthForm} whichForm={whichForm} setWhichForm={setWhichForm}/>
    }
    <Navbar setAuthForm={setAuthForm} setWhichForm={setWhichForm}/>
    <div className="min-h-screen selection:bg-primary flex flex-col items-center justify-center  px-4 relative ">
      <div className="text-center max-sm:text-left max-w-3xl">
        {/* Heading */}
       <div className="relative z-50 ">
         <h1 className="text-5xl  font-semibold  text-gray-100 mb-4 leading-15 capitalize max-md:text-4xl max-md:leading-10 max-sm:text-3xl max-sm:leading-8">
          Boost your productivity with AI powered calls and notes 
        </h1>
        <p className="text-2xl text-gray-200 mb-8 max-md:text-xl">
          Connect, collaborate, and celebrate from <br className="max-sm:hidden" />
          anywhere with Google Meet
        </p> 

        {/* Buttons */}
        <div className="flex items-center max-sm:justify-start justify-center gap-3">
        
          <Button
           onClick={()=>{
            if(isAuthenticated){
               navigate('/profile')
            }
            setAuthForm(true)
          }
        } 
          className={'py-5 shadow-xl  text-white'} size={'lg'}>
            <Video  size={25}/>
            New Call
          </Button>
<span className="font-semibold max-sm:text-sm">OR</span>
           <Button
           onClick={()=>{
            if(isAuthenticated){
               navigate('/profile')
            }
            setAuthForm(true)
          }
        } 
          className={'py-5 shadow-xl bg-black/30 backdrop-blur-sm hover:bg-black/20 text-white'} size={'lg'}>
            <Phone  size={25}/>
            Join Call
          </Button>


          
        </div>
       </div>

       
      </div>
      <ConcentricCircles/>
    </div>
  </>);
}

export default Home;
