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
export const createNewMeeting= async(roomCode,host)=>{
     return await apiClient.post('/meeting/createMeeting',{roomCode,host})
}

export const checkMeeting =async(roomCode)=>{
    return await apiClient.get(`/meeting/checkMeeting/${roomCode}`)
}

export const deleteMeeting =async(roomCode)=>{
        return await apiClient.delete(`/meeting/deleteMeeting/${roomCode}`)
}