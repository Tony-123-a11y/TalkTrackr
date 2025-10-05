
import ConcentricCircles from '../../components/ConcentricCircles'
import BottomNav from '../../components/UI/BottomNav'
import Sidebar from '../../components/UI/Sidebar'
import { Outlet } from 'react-router-dom'
import {useMediaQuery} from 'react-responsive';

const Layout = () => {
   const isMobile= useMediaQuery({maxWidth:640})

  return (
    <div className='grid h-screen gap-12 max-xl:gap-6 max-lg:gap-4 max-md:gap-1  grid-cols-12 p-8  max-sm:p-0'>
    <ConcentricCircles/>  
    {
      isMobile ? <BottomNav/> :
      <div className="col-span-1  h-full ">
        <Sidebar />
      </div>
}
      <div className='bg-black/85 shadow-[0px_0px_10px_rgba(255,255,255,0.22)] backdrop-blur-xs z-100 col-span-11 h-full rounded-4xl max-sm:rounded-none overflow-hidden max-sm:col-span-12'>
        <Outlet />
      </div>

    </div>
  )
}

export default Layout
