import axios from 'axios';
import { store } from '../Redux/Store';
import { logout } from '../Redux/UserSlice';
// const apiUrl= 'http://localhost:8000/api'
const apiUrl='https://talktrackr-1.onrender.com'

export const apiClient= axios.create({
    baseURL:apiUrl,
    withCredentials:true
})

apiClient.interceptors.request.use(
    (config)=>{
      
        if(config.data instanceof FormData){
            config.headers["Content-Type"]="multipart/form-data";
        }
        else{
            config.headers["Content-Type"]="application/json";
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
);

apiClient.interceptors.response.use(
    (response)=>{
        return response;
    },

    (error)=>{
        if(error.repsonse?.status==401){
            store.dispatch(logout())
        }
       return Promise.reject(error)
    }
)