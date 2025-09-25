const Messages = require('../models/Messages');
const {kafka} = require('./kafkaClient')

let producer=null;

async function createProducer() {
  if(producer) return producer
    const _producer=kafka.producer();
    await _producer.connect()
    producer=_producer
    return producer;
}

async function produceMessage(message){
  const prod= await createProducer()
  await prod.send({
    messages: [{key: `message-${Date.now()}`,value: message}],
    topic: 'chat-message'
  })
  return true;
}

module.exports = {produceMessage}

