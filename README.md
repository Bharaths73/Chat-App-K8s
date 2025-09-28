# 💬 MERN Chat App  

A real-time chat application built using MongoDB, Express.js, React.js, and Node.js (MERN Stack). This app supports direct messaging between users with real-time updates. 🚀  

## 🔥 Features  

✅ *User Authentication* – Secure login/signup with JWT.  
✅ *Real-time Messaging* – Send and receive messages instantly.  
✅ *Direct Messages (DMs)* – Private conversations between users.
✅ *Scalable Socket Communication* – Redis as a Socket.io adapter.
✅ *Reliable Messaging* – Kafka used before storing chats in DB.
✅ *Responsive UI* – Works on all devices. 
✅ *Dark Mode* – Because everyone loves it! 🌙 
✅ *Kubernetes Deployment* – Containers orchestrated with Minikube.

## 🛠 Tech Stack  

- *Frontend:* React.js ⚛, Redux Toolkit 🎛, Tailwind CSS 🎨  
- *Backend:* Node.js 🚀, Express.js 🏗, MongoDB 🍃  
- *Authentication:* JWT 🔐  
- *Real-time Messaging:* Socket.io 🔄
- Message Broker: Apache Kafka 🛰 – ensures reliable message delivery before DB persistence
- In-Memory Store & Socket Adapter: Redis 🔥 – scales Socket.io across multiple pods
- Container Orchestration: Kubernetes ☸️ – app deployed on Minikube
- Helm Charts: Bitnami 📦 – used for deploying Redis & Kafka

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Bharaths73/Chat-App
```


### 2️⃣ Install Dependencies  
*Backend*  
```bash
cd backend
npm install
```

*Frontend*  
```bash
cd frontend
npm install
```


### 3️⃣ Configure Environment Variables  
Create a .env file in the *server* directory:  
```bash
PORT=port
DATABASE_URL=mongo_url
JWT_SECRET=jwt_secret
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=secret
FOLDER_NAME=cloudinary_folder_name
CLIENT_URL=http://localhost:5173
KAFKA_BROKER=kafka-service:9092
REDIS_HOST=redis-service
REDIS_PORT=6379
```

### 4️⃣ Run the App  
Start the *backend* server:  
```bash
cd backend
npm run dev
```

Start the *frontend* client:  
```bash
cd frontend
npm run dev
```


The app will be available at *http://localhost:5173* 🎉  

5️⃣ Deploy to Kubernetes

- Use Bitnami Helm charts for Redis & Kafka.
- Deploy MongoDB with the MongoDB Kubernetes Operator.
- Apply YAML manifests for frontend, backend, and services.

## 🖼 Screenshots  

| ![Screenshot (2)](https://github.com/user-attachments/assets/e3974c81-e94f-41bd-8b8c-d6a9d9873049) | ![Screenshot (3)](https://github.com/user-attachments/assets/69c68b4f-d05f-4bbb-98dd-f4d91fd7bd83) | ![Screenshot (4)](https://github.com/user-attachments/assets/bbb38e8d-3d58-4084-a17e-28bd5e6ff702) | 
![Screenshot (5)](https://github.com/user-attachments/assets/3b79de45-3fe0-4a5e-af28-ffb28f9450b6) | ![Screenshot (6)](https://github.com/user-attachments/assets/dc49ba33-3b55-427c-9a6e-62491b44052a)

## 🏗 Future Improvements  

🔹 Group Chat Support  
🔹 Message Reactions ❤🔥😂  
🔹 Typing Indicators  
🔹 Push Notifications   

---

### 🌟 If you like this project, don’t forget to *star ⭐* the repository!
