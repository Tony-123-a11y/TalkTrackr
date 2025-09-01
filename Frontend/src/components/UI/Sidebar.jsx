import {  NavLink } from "react-router-dom";
import { BiMicrophone, BiSolidMicrophone } from "react-icons/bi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { IoVideocam, IoVideocamOutline } from "react-icons/io5";

const Sidebar = () => {

  

  const items = [
    { id: "home", icon: <GoHome size={28} /> ,activeIcon:<GoHomeFill  size={28}/> , path:'/profile'},
    { id: "mic", icon: <BiMicrophone size={28} />  ,activeIcon:<BiSolidMicrophone size={28}/>, path:'/profile/recording'},
    { id: "video", icon: <IoVideocamOutline  size={28} /> ,activeIcon:<IoVideocam size={28}/> , path:'/profile/currentmeeting'},
    { id: "message", icon: <AiOutlineMessage size={28} /> ,activeIcon:<AiFillMessage size={28}/>, path:'/profile/messages'},
  ];

  return (
    <div className=" w-18 shadow-sm rounded-full  h-full bg-gray-50 flex flex-col items-center justify-center space-y-8">
     {/* <img src={'TalckTrackr.png'}/> */}
      {items.map((item) => (
        <NavLink
        key={item.id} 
     to={item.path}
     end={'/profile'}
  className={({ isActive }) => isActive ? "text-crimson" : "text-gray-500"}
>
   {({ isActive }) =>
    isActive ? <span className="animate-sideBarIcon block text-primary">{item.activeIcon}</span> : item.icon
  }
</NavLink>

      ))}
    </div>
  );
};

export default Sidebar;
