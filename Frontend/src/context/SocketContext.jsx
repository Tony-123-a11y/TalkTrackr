import { createContext, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext= createContext()

export const SocketProvider=({children})=>{
   const socket= useMemo(()=>{
   return io(import.meta.env.VITE_URL)
   },[]);
  
   return(
    <SocketContext.Provider value={{socket}}>
           {children}
    </SocketContext.Provider>
   )
}