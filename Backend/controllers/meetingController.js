import { Meeting } from "../models/meetingModel.js";

export const createMeeting =async(req,res)=>{
try {
    console.log(req.body)
        const {roomCode,host} =req.body;
    const meeting= await Meeting.create({
        roomCode,
        host
    })

    res.status(201).json({msg:"meeting created successfully",meeting})
} catch (error) {
    res.status(500).json({msg:"Internal Server Error",error:error.message})
}
    
}

export const checkMeeting=async(req,res)=>{
 try {
       const {roomCode}= req.params;
    const meeting= await Meeting.findOne({roomCode})
    if(!meeting){
        return res.status(404).json({msg:"meeting doesnt exist"})
    }
    return res.status(201).json({msg:"meeting found ",meeting})
 } catch (error) {
      res.staus(500).json({msg:"Internal Server Error",error:error.message})

    
 }
}


export const deleteMeeting =async(req,res)=>{
     try {
        const {roomCode}=req.params;
      const meeting= await Meeting.findOne({roomCode})
    if(!meeting){
        return res.status(404).json({msg:"meeting doesnt exist"})
    }
    await Meeting.deleteOne({roomCode})
    return res.status(201).json({msg:'Meeting deleted successfully'})

     } catch (error) {
    res.staus(500).json({msg:"Internal Server Error",error:error.message})
        
     }
}

