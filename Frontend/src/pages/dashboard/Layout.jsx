
import  Sidebar  from '../../components/UI/Sidebar'
import { Outlet } from 'react-router-dom'


const Layout = () => {

  return (
    <div className='grid h-screen  grid-cols-12 p-8 '>
     <div className="col-span-1 h-full">
       <Sidebar/>
     </div>
      <div className='bg-gray-50 col-span-11 h-full rounded-4xl shadow-sm overflow-hidden'>
<Outlet/> 
      </div>
      
    </div>
  )
}

export default Layout
