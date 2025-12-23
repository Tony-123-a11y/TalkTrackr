import { NavLink, useLocation } from "react-router-dom";
import { BiMicrophone, BiSolidMicrophone } from "react-icons/bi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { IoVideocam, IoVideocamOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../services/apiService";
import { logout } from "../../Redux/UserSlice";
import { motion } from "framer-motion";


const BottomNav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const onLogout = async () => {
    try {
      await logOutUser();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      id: "home",
      icon: <GoHome size={28} />,
      activeIcon: <GoHomeFill size={28} />,
      path: "/profile",
    },
    // {
    //   id: "mic",
    //   icon: <BiMicrophone size={28} />,
    //   activeIcon: <BiSolidMicrophone size={28} />,
    //   path: "/profile/recording",
    // },
    {
      id: "video",
      icon: <IoVideocamOutline size={28} />,
      activeIcon: <IoVideocam size={28} />,
      path: `/profile/currentmeeting/${undefined}`,
    },
    // {
    //   id: "message",
    //   icon: <AiOutlineMessage size={28} />,
    //   activeIcon: <AiFillMessage size={28} />,
    //   path: "/profile/messages",
    // },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 gap-4  -translate-x-1/2 bg-black/60 backdrop-blur-sm shadow-[0px_0px_5px_rgba(255,255,255,0.1)] rounded-full flex items-center justify-between space-x-6 px-6 py-4 z-120 ">
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <NavLink
            key={item.id}
            to={item.path}
            className="relative flex items-center justify-center"
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -inset-2.5 bg-white/20 backdrop-blur-md rounded-full shadow-lg"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
              />
            )}
            <span
              className={
                isActive ? "text-primary relative z-10" : "text-gray-500 relative z-10"
              }
            >
              {isActive ? item.activeIcon : item.icon}
            </span>
          </NavLink>
        );
      })}

      {/* Logout button */}
      {/* <button
        title="logout"
        onClick={onLogout}
        className="bg-white w-10 h-10 rounded-full text-gray-500 flex items-center justify-center hover:bg-red-700 ring-1 cursor-pointer ring-gray-300 hover:text-white shadow-md transition-all relative z-10"
      >
        <IoMdLogOut size={23} />
      </button> */}
    </div>
  );
};

export default BottomNav;
