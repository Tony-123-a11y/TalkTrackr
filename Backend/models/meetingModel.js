import mongoose from 'mongoose'

const meetingSchema= new mongoose.Schema({
    host:{
        type:String,
        required:true,
    },
    roomCode:{
     type:String,
     required:true
    },
   createdAt:{
    type:Date,
    default:Date.now,
    expires: 60*60*3,
   }
},{timestamps:true})

export const Meeting= mongoose.model('Meeting',meetingSchema);