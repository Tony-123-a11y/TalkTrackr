import { apiClient } from "./interceptor"

export const loginUser= async(emailId,password)=>{
        return await apiClient.post('/users/login',{emailId,password}) 
}
export const registerUser= async(emailId,password,fullName)=>{
        return await apiClient.post('/users/register',{emailId,password,fullName}) 
}

export const logOutUser= async()=>{
        return await apiClient.post('/users/logout')
}