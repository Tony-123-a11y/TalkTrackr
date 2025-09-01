import React from "react";
import { Video, Keyboard } from "lucide-react"; // icons
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-2xl">
        {/* Heading */}
        <h1 className="text-5xl  font-semibold text-gray-900 mb-4 max-sm:text-3xl">
          AI powered meeting recordings and notes <br /> for everyone
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect, collaborate, and celebrate from <br className="max-sm:hidden" />
          anywhere with Google Meet
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 max-sm:flex-col">
          {/* New Meeting Button */}
          <Button>
            <Video  size={20}/>
            New meeting
          </Button>

          {/* Input + Join */}
          <div className="flex items-center  rounded-full relative">
           
            <Input
              type="text"
              placeholder="Enter a code or link"
              variant={'outline'}
            />
            <Button variant={'icon'} className={'hover:text-primary'}>Join</Button>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default Home;
