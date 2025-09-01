import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'


dotenv.config()

const port=process.env.PORT 
const app= express()
const server= http.createServer(app)
const io= new Server(server,{
  cors:true
})
app.use(express.json())
//Socket configuration
const emailToSocketMapping= new Map()
const socketToEmailMapping= new Map()
io.on('connection',(socket)=>{
    socket.on('join-room',(data)=>{
       const {roomId,emailId}=data
       console.log(roomId,emailId)
       emailToSocketMapping.set(emailId,socket.id)
       socketToEmailMapping.set(socket.id,emailId)
       socket.join(roomId)
       socket.emit('joined-room',roomId)
       socket.broadcast.to(roomId).emit('user-joined',{emailId})
    })

    socket.on('call-user',(data)=>{
      const {emailId,offer}=data
      const socketId= emailToSocketMapping.get(emailId)
      const from = socketToEmailMapping.get(socket.id)
      socket.to(socketId).emit('incoming-call',{from,offer})
    })

    socket.on('call-accepted',(data)=>{
       const {from,ans}=data
       const socketId= emailToSocketMapping.get(from)
       socket.to(socketId).emit('call-accepted',{ans})
    })

    socket.on('send-candidate',(candidate)=>{
       socket.broadcast.emit('receive-candidate',candidate)
    })
})
app.get('/',(req,res)=>{
    res.json({msg:'welcome'})
})

server.listen(port,()=>{
  console.log(`Server is running at http://localhost:${port}`)
})
