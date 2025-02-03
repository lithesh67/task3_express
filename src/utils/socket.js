const {Server}=require('socket.io');
const jwt=require('jsonwebtoken');
const { decrypt } = require('./crypt');

let io;
const users={};
const socketsObj={};

module.exports.initializeScoket=(httpServer)=>{
    io=new Server(httpServer,{
        cors:{ origin:'http://localhost:4200'}
    });
    io.on("connection",(socket)=>{
        try{
        const token=socket.handshake.auth?.token;
        if(token){
            const decoded=jwt.decode(token,process.env.SECRET_KEY_TOKEN);
            const decrypted_obj=JSON.parse(decrypt(decoded.enc)); 
            users[decrypted_obj.id]=socket.id;
            socketsObj[socket.id]=decrypted_obj.id;
            console.log(`${decrypted_obj.id} connected with ${socket.id}`);
        }
        else{
            socket.disconnect();
            return;
        }
       
        socket.on('disconnect',()=>{
         console.log("user disconnected",socket.id);
         delete socketsObj[socket.id];
       });
    }
    catch(err){
        console.log(err);
        
    }
    });
}

module.exports.getIO=()=>{
    if(io){
        return io;
    }
    else{
        throw new Error("Socket not initialised");
    }
}

module.exports.getSocketId=(userid)=>{
    return users[userid];
}