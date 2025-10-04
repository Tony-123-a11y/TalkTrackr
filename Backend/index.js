import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import twilio from 'twilio'
import cors from 'cors'
import { runSocket } from './socket.js'
import { userRouter } from './routers/userRouter.js'
import  {connectToDB}  from './Database/db.js'
import session from "express-session";
import MongoStore from "connect-mongo";
import { OAuth2Client } from 'google-auth-library'
import { meetingRouter } from './routers/meetingRouter.js'
dotenv.config()
export const googleClient= new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const port=process.env.PORT 
const app= express()
const server= http.createServer(app)
 const io= new Server(server,{
  cors:true
})
runSocket(io)
app.use(express.json())
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}))
connectToDB()
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",  // 🔑 secret key for signing cookies
  resave: false,                 // don’t save if nothing changed
  saveUninitialized: false,      // don’t save empty sessions
  store: MongoStore.create({     // use MongoDB to persist sessions
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60 // session expires after 1 day
  }),
  cookie: {
    httpOnly: true,              // prevents JS access to cookie
    secure: process.env.NODE_ENV === "production", // https only in prod
    maxAge: 24 * 60 * 60 * 1000  // cookie expires in 1 day
  }
}));
app.get('/',(req,res)=>{
    res.json({msg:'welcome'})
})

app.use('/api/users',userRouter)
app.use('/api/meeting',meetingRouter)


//twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


app.get('/ice-servers',async(req,res)=>{
  try {
    const token = await client.tokens.create();
     res.json({msg:'token fetched successfully',token})
  } catch (error) {
    console.log(error)
  }
})

server.listen(port,()=>{
  console.log(`Server is running at http://localhost:${port}`)
})
