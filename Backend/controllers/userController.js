import {  googleClient } from '../index.js';
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs'



export const registerUser = async (req, res) => {
    try {
        const { emailId, password,fullName } = req.body
        const user = await User.findOne({ emailId }).select('-password')
        if (user) {
            return res.status(409).json({ msg: 'User already exists', user })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            emailId,
            fullName,
            password: hashedPassword,
        })
        res.status(201).json({ msg: 'User Registered Successfully', newUser })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: 'Internal Server Error', error: error.message })

    }
}

export const loginUser = async (req, res) => {
    try {
        const { emailId, password } = req.body
        const findUser = await User.findOne({ emailId })
         
        if (findUser) {
             if(findUser.authProvider==="google"){
              return res.status(409).json({msg:"Account Registered with Google"})
          }
            const decryptPassword = await bcrypt.compare(password, findUser.password)
            if (decryptPassword) {
                req.session.user = {
                    id: findUser._id,
                }

                res.status(201).json({ msg: 'user logged in sucessfully!',user: findUser })
            }
            else {
                res.status(409).json({ msg: 'Invalid Credentials!' })
            }
        }
        else {
            res.status(404).json({ msg: 'user not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error', error: error.message })

    }
}

export const googleAuth =async(req,res)=>{
    try {
        const {token}=req.body;
        const ticket= await googleClient.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID
        })
        const payload=  ticket.getPayload()
        const user= await User.findOne({emailId:payload.email})
        if(user){
            req.session.user={
                id:user._id
            }
            return res.status(201).json({ msg: 'User logged in with google ', user })
        }
        const newUser= await User.create({
            emailId:payload.email,
            fullName:payload.name,
            authProvider:'google'
        })
        req.session.user={
         id: newUser._id  
        } 
        res.status(201).json({msg:'User fetched  succesfully',user:newUser})
        
    } catch (error) {
        console.log(error.message)
    }
}

export const getUser= async(req,res)=>{
    try {
        const {id}=req.session.user
        const user= await User.findById(id).select('-password')
                res.status(201).json({ msg: 'user fetched  sucessfully!',user })
        } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error', error: error.message })
        
    }
    
}

 export const getMeetings=async (req, res) => {
  // only logged-in users can access
  res.json({ meetings: ["Meeting 1", "Meeting 2"] });
}

export const logoutUser= (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  }
)}