const {Server}=require('socket.io');
const jwt=require('jsonwebtoken');
const { decrypt } = require('./crypt');
const { insertMessage } = require('../v1/chat/chat.controller');

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
        
        socket.on('send_message',async(data)=>{
          await insertMessage(data);
          io.to(users[data.userid]).emit('receive_message',{message:data.message,sender_id:socketsObj[socket.id],'chat_id':data.chat_id});
        });


       
        socket.on('disconnect',()=>{
         console.log("user disconnected",socket.id);
         delete socketsObj[socket.id];
        });

        socket.on('join_group',async({chat_id,group_name,participants})=>{
            for(let i=0;i<participants.length;i++){
            let part_socket_id=users[participants[i]];
            if(part_socket_id){
                io.sockets.sockets.get(part_socket_id).join(group_name);
                // io.to(socket.id).emit('added_to_a_group',{message:"user added"});
                // can notify user later 
            }
           }  
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