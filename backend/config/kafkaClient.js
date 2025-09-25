const {Kafka} = require('kafkajs')
const dotenv=require('dotenv')
dotenv.config()

exports.kafka=new Kafka({
    clientId:"chat-app",
    brokers: [process.env.KAFKA_BROKER_URL || "localhost:9092"],
    // ssl: false,
    // sasl: {
    //     mechanism: 'plain',
    //     username: process.env.KAFKA_USERNAME || 'user1',
    //     password: process.env.KAFKA_PASSWORD 
    // }
})