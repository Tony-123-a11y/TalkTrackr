import React, { useState } from "react";
import { Video, Keyboard } from "lucide-react"; // icons
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import ConcentricCircles from "../components/ConcentricCircles";
import Navbar from "../components/UI/Navbar";
import AuthForm from "./Auth/AuthForm";

function Home() {
  const [authForm, setAuthForm] = useState(false);
const [whichForm, setWhichForm] = useState(null);

  return (
    <>
    {
       authForm   && <AuthForm setAuthForm={setAuthForm} whichForm={whichForm} setWhichForm={setWhichForm}/>
    }
    <Navbar setAuthForm={setAuthForm} setWhichForm={setWhichForm}/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative ">
      <div className="text-center max-w-3xl">
        {/* Heading */}
       <div className="relative z-50 ">
         <h1 className="text-5xl  font-medium text-gray-100 mb-4 leading-15 capitalize max-sm:text-3xl">
          Boost your productivity with AI powered meetings and notes 
        </h1>
        <p className="text-2xl text-gray-200 mb-8">
          Connect, collaborate, and celebrate from <br className="max-sm:hidden" />
          anywhere with Google Meet
        </p> 

        {/* Buttons */}
        <div className="flex items-center  justify-center gap-3 max-sm:flex-col">
        
          <Button className={'py-5 shadow-xl text-white'} size={'lg'}>
            <Video  size={25}/>
            New meeting
          </Button>

          <div className="flex items-center  rounded-full relative">
           
            <Input
              type="text"
              placeholder="Enter a code or link"
              variant={'outline'}
              className={'bg-white border-none py-5 shadow-xl'}
            />
            <Button variant={'icon'} className={' hover:bg-white/10 rounded-full ml-1 hover:backdrop-blur-sm '}>Join</Button>
          </div>
        </div>
       </div>

       
      </div>
      <ConcentricCircles/>
    </div>
  </>);
}

export default Home;
