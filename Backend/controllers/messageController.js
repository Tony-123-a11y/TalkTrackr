import { Conversation } from "../models/conversationModel.js"
import { Message } from "../models/messageModel.js"

export const sendMessage=async(req,res)=>{
     try {
       const {text}=req.body
      const {id}=req.session.user
      const {friendId}=req.params

      const newMessage= await Message.create({
        text
      })
      const messageId= newMessage._id;
      const findConversation= await Conversation.findOne({
         members:{
            $all:[
                id,
                friendId
            ]
         }
      })
      if(findConversation){
         findConversation.messages.push(messageId)
         await findConversation.save();
         return res.status(201).json({msg:"message sent succesfully",findConversation})
      }

      const newConversation= await Conversation.create({
             members:[
                id,friendId
             ],
             messages:[
                messageId
             ]
      })
      res.status.json({msg:"Conversation created and message sent successfully",newConversation})
     } catch (error) {
       res.status(500).json({msg:"Internal Server Error",error:error.message})

     }

}

export const getAllMessages=async(req,res)=>{
  try {
     const {id}=req.session.user
    const {friendId}=req.params
    const conversation= await Conversation.findOne({
      members:{
           $all:[
            id,friendId
           ]
      }
    }).populate('messages')
 
    res.status(201).json({msg:'Messages Fetched Successfully',conversation})
  } catch (error) {
    res.status(500).json({msg:"Internal Server Error",error:error.message})
  }
}

export const getChatList =async(req,res)=>{
   try {
      const {id}=req.user
      const chatList= await Conversation.find({
         members:{
            $all:[
               id
            ]
         }
      }).populate('members')
      res.status(201).json({msg:'ChatList fetched',chatList})
   } catch (error) {
    res.status(500).json({msg:"Internal Server Error",error:error.message})
      
   }
}