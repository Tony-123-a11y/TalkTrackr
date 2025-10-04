import mongoose from "mongoose";

 const userSchema= new mongoose.Schema({
    
    emailId:{
       type:String,
       required:true,
       unique:true,
      },
      password:{
         type:String,
         required: function(){
            return this.authProvider==='local'
         },
         minLength:8,
         select:false
      },
      authProvider:{
       type:String,
       default:'local',
       enum:['local','google']
      },
      fullName:{
         type:String,
         required:true,
      minLength:3,
     },
     profilePic:{
      type:String,
     },
     role:{
      type:String,
      enum:['user','admin'],
      default:'user'
     }
},{timestamps:true})

export const User= mongoose.model('User',userSchema)
