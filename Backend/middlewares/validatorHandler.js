import { validationResult } from "express-validator"

export const validationHandler= (req,res,next)=>{
      const errors= validationResult(req);
      if(errors.isEmpty()){
        return next();
      }
      const extractedError=[];
      errors.array({onlyFirstError:true}).forEach((error)=>{
       extractedError.push(error.msg)
      })

      return res.status(402).json({success:false,msg:extractedError[0]})
}