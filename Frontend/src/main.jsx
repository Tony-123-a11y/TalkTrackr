import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { PeerProvider } from './context/PeerContext.jsx'

createRoot(document.getElementById('root')).render(
    <SocketProvider>
    <PeerProvider>

    <App />
   
    </PeerProvider>
     </SocketProvider>
)
