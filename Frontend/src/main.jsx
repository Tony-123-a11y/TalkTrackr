import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { SocketProvider } from './context/SocketContext.jsx'
import { PeerProvider } from './context/PeerContext.jsx'
import {Bounce, ToastContainer} from 'react-toastify'
import { store } from './Redux/Store.jsx'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <SocketProvider>
   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    <PeerProvider>
        <QueryClientProvider client={new QueryClient()}>
    <App />
    </QueryClientProvider>
    </PeerProvider>
     </SocketProvider>
     </Provider>
)
