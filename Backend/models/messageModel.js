import mongoose from 'mongoose';

const messageSchema= new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Message= mongoose.model('Message',messageSchema);