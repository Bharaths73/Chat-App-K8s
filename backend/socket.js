const {Server}=require('socket.io');
const {pub,sub}=require('./config/redisConfig')
const Messages = require('./models/Messages');
const { createAdapter } = require('@socket.io/redis-adapter');
const {kafka} = require('./config/kafkaClient')
const {produceMessage} = require('./config/kafkaProducer');
const {pubClient,subClient} = require('./config/redisConfig')
require('dotenv').config();

exports.startMessageConsumer=async()=>{
    const consumer=kafka.consumer({groupId: "default"})
    await consumer.connect()
    await consumer.subscribe({topic: "chat-message",fromBeginning:true})

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({message, pause})=>{
            console.log("New message recieved");
            if(!message.value) return
            try {
                const msgData = JSON.parse(message.value.toString());
                console.log("Kafka Message data is ",msgData);
                const createdMessage=await Messages.create(msgData)
            } catch (error) {
                console.log("Something is wrong");
                pause()
                setTimeout(()=>{consumer.resume([{'topic':'chat-message'}])},60*1000)
            }
        }
    })
}

exports.setupSocket=async(server)=>{
    const io=new Server(server,{
        cors:{
            // origin:"https://chat-app-frontend-at2y.onrender.com",
            origin:"*",
            methods:["GET", "POST","PUT","DELETE"],
            credentials:true,
        }
    })

    await pubClient.connect();
    await subClient.connect();

    io.adapter(createAdapter(pubClient, subClient));

    io.on('connection',(socket)=>{
        console.log('User connected');
        const userId=socket.handshake.query.userId;
        if(userId){
            socket.join(userId);
        }
        else{
            console.log('No user id found');
        }
        socket.on('sendMessage',async(message)=>{
            console.log("Message received at socket ",message);
            await produceMessage(JSON.stringify(message))

            const recipientId = message.recipient._id;
            const senderId = message.sender._id;
            io.to(recipientId).emit('receiveMessage', message);
            io.to(senderId).emit('receiveMessage', message);
        })
        socket.on('disconnect',()=>{
            console.log('User disconnected');})
    })
}

