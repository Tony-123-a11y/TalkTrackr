import { useContext } from "react"
import { PeerContext } from "../context/PeerContext"

export const usePeer=()=>{
    const context= useContext(PeerContext)
    return context
}