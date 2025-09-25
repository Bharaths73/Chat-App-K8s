const {kafka} = require("./kafkaClient")

async function  init() {
    const admin=kafka.admin();
    console.log('Admin connecting.....');
    await admin.connect()
    console.log('Admin connected.....');

    await admin.createTopics({
        topics:[{
            topic:'chat',
            numPartitions:2,
            replicationFactor:1
        }]
    })

    await admin.disconnect();
}
module.exports={init}

