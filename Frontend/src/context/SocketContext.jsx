import { createContext, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext= createContext()

export const SocketProvider=({children})=>{
   const socket= useMemo(()=>{
   return io('https://talktrackr-1.onrender.com')
   // return io('http://localhost:8000')
   },[]);
  
   return(
    <SocketContext.Provider value={{socket}}>
           {children}
    </SocketContext.Provider>
   )
}