import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/dashboard/Layout'
import ProtectedRoute from './pages/dashboard/ProtectedRoute'
import ProfileHome from './pages/dashboard/ProfileHome'
import Recording from './pages/dashboard/Recording'
import CurrentMeeting from './pages/dashboard/CurrentMeeting'
import Messages from './pages/dashboard/Messages'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      {/* Dashboard */}
      <Route
       path='/profile'
      element={<ProtectedRoute>
       <Layout/>
      </ProtectedRoute>}>
        <Route index  element={<ProfileHome/>}/>
        <Route path='recording' element={<Recording/>}/>
        <Route path='currentmeeting' element={<CurrentMeeting/>}/>
        <Route path='messages' element={<Messages/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
