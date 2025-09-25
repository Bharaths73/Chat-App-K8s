const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const {init}=require('./config/kafkaAdmin')
dotenv.config();
const database=require('./config/database');
const authRoutes=require('./routes/Auth');
const profileRoutes=require('./routes/Profile');
const contactsRoutes=require('./routes/Contacts')
const messageRoutes=require('./routes/Messages')
const fileUpload=require('express-fileupload');
const { cloudinaryConnection } = require('./config/cloudinary');
const { setupSocket, startMessageConsumer } = require('./socket');
const http=require('http')
const PORT=process.env.PORT || 3000;

database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin:"https://chat-app-frontend-at2y.onrender.com",
    origin:"*",
    credentials:true
}))

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnection();

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/contacts',contactsRoutes);
app.use('/api/v1/messages',messageRoutes);

app.use('/health',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Server is running"
    })
})

const server = http.createServer(app);

async function startServer() {
  try {
    // 1️⃣ Initialize Kafka topics
    await init();  
    console.log("Kafka topics initialized");

    // 2️⃣ Start Kafka consumer
    await startMessageConsumer();
    console.log("Kafka consumer started");

    // 3️⃣ Setup WebSocket after Kafka is ready
    setupSocket(server);
    console.log("Socket setup complete");

    // 4️⃣ Start HTTP server
    server.listen(PORT,'0.0.0.0',()=>{
    console.log('Server is running on port ',PORT);
})
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

