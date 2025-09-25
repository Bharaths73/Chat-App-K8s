require('dotenv').config();
const { createClient } = require('redis');

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

module.exports={pubClient,subClient}