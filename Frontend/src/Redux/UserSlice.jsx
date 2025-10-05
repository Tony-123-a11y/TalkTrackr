import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../services/interceptor";

export const fetchUser= createAsyncThunk('fetch',async(_,{rejectWithValue})=>{
    try {
         const res= await apiClient.get('/users/fetchUser')
     return res.data.user
    } catch (error) {
       return rejectWithValue(error.response?.data || 'Unauthorized')
    }
    
})
const initialState={
    user:null, 
    isAuthenticated:false,
    loading:true
}
const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
           state.user= action.payload
           state.isAuthenticated=true
        },
        logout:(state,action)=>{
            state.user=null
            state.isAuthenticated=false
        }
    },
    extraReducers:(builder)=>{
      builder.addCase(fetchUser.fulfilled,(state,action)=>{
        state.user= action.payload
        state.isAuthenticated=true
        state.loading=false
      })        
      builder.addCase(fetchUser.rejected,(state,action)=>{
        state.user= null
        state.isAuthenticated=false
        state.loading=false
      })        
    }
})

export const {login,logout}=userSlice.actions;
export default userSlice.reducer;