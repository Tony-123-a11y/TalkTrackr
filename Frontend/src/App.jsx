import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/dashboard/Layout'
import ProtectedRoute from './pages/dashboard/ProtectedRoute'
import ProfileHome from './pages/dashboard/ProfileHome'
import Recording from './pages/dashboard/Recording'
import CurrentMeeting from './pages/dashboard/CurrentMeeting'
import ChatLayout from './pages/dashboard/ChatLayout'
import {useDispatch, useSelector} from 'react-redux'
import { fetchUser } from './Redux/UserSlice'
import ChatWindow from './pages/dashboard/ChatWindow'
import EmptyState from './pages/dashboard/EmptyState'



function App() {
  const {user}=useSelector((state)=>state.user)
  console.log(user)
  const dispatch= useDispatch()
  useEffect(() => {
    if(!user){
     dispatch(fetchUser())
    }
  }, [user])
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      {/* Dashboard */}
      <Route
       path='/profile'
      element={<ProtectedRoute>
       <Layout/>
      </ProtectedRoute>}>
        <Route index  element={<ProfileHome/>}/>
        <Route path='recording' element={<Recording/>}/>
        <Route path='currentmeeting/:roomCode' element={<CurrentMeeting/>}/>
        <Route path='messages' element={<ChatLayout/>}>
        <Route index element={<EmptyState/>}/>
        <Route path='currentchat/:chatId/:friendId/:friendName/:friendProfilePic' element={<ChatWindow/>}/>'
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
