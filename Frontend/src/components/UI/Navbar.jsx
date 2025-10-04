import { motion } from "framer-motion";
import logo from "../../assets/logo.png"
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
export default function Navbar({setAuthForm,setWhichForm}) {
  const {isAuthenticated,user}= useSelector((state)=>state.user)

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-5xl flex items-center z-80 justify-between px-4 py-2 rounded-4xl bg-white/10 backdrop-blur-sm shadow-lg border border-white/20"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay:1.3 }}
    >
      {/* Logo */}
      <div className="text-xl font-bold text-white">
        <img src={logo} className="w-20 left-2 h-20 object-cover absolute top-1/2 -translate-y-1/2"/>
      </div>

      {/* Buttons */}
      {
      isAuthenticated ? <Link className="w-10 h-10 flex items-center justify-center bg-white text-xl font-bold rounded-full" to="/profile">P</Link> :
      
      <div className="flex items-center gap-4">
        <button onClick={()=>{setAuthForm(true)
          setWhichForm('login')
        }} className="px-4 py-2 text-white cursor-pointer rounded-2xl border border-white/40 hover:bg-white/20 transition">
          Login
        </button>
        <button onClick={()=>{setAuthForm(true)
          setWhichForm('register')
        }} className="px-4 py-2 text-white font-semibold rounded-2xl bg-primary hover:bg-red-800 cursor-pointer transition">
          Sign Up
        </button>
      </div>
}
    </motion.nav>
      
  );
}
