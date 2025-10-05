
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from '../../components/UI/Loader'

const ProtectedRoute = ({children}) => {
  const {isAuthenticated,loading}= useSelector((state)=>state.user)
 if(loading){
   return <div className='h-screen bg-black'><Loader/></div>   
 }
     if(!isAuthenticated){
        return <Navigate to={'/'} replace/>
     }
  return children
}

export default ProtectedRoute
