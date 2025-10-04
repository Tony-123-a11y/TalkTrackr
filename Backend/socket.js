
export function runSocket (io){
//Socket configuration
const emailToSocketMapping= new Map()
const socketToEmailMapping= new Map()
io.on('connection',(socket)=>{
    console.log('hello connection')
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

    socket.on('leave-meeting',()=>{
       socket.broadcast.emit('end-meeting')
    })

    socket.on('track-added',({type})=>{
      socket.broadcast.emit('track-type',type)
    })
    
    socket.on('track-removed',({stopTrackType})=>{
       socket.broadcast.emit('track-type-removed',stopTrackType)
    })
})
}

