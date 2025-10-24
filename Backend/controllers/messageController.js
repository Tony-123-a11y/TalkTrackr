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
      const {chatId}=req.params
    const conversation= await Conversation.findById(chatId).populate('messages members')
 
    res.status(201).json({msg:'Messages Fetched Successfully',conversation})
  } catch (error) {
    res.status(500).json({msg:"Internal Server Error",error:error.message})
  }
}

export const getChatList =async(req,res)=>{

   try {
      const {id}=req.session.user
  
      const chatList= await Conversation.find({
         members:{
            $all:[
               id
            ]
         }
      }).populate('members messages')

      const members=chatList.map((chat)=>{

         return {
            chatId:chat._id,
            member:chat.members.find((member)=>member._id.toString()!==id),
            lastMessage:chat.messages[chat.messages.length-1]
         } 
      })
            
      res.status(201).json({msg:'ChatList fetched',members})
   
   } catch (error) {
    res.status(500).json({msg:"Internal Server Error",error:error.message})
      
   }
}