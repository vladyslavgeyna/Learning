const {MongoClient} = require('mongodb')

const client = new MongoClient('mongodb+srv://root:root@cluster0.6nc5szh.mongodb.net/?retryWrites=true&w=majority')

const start = async () => {
    try {
        await client.connect()
        console.log('Connected successfully')
        await client.db().createCollection('users')
        const users = client.db().collection('users')
        await users.insertOne({name: 'Vladyslav', age:19})
        const user = await users.findOne({name: 'Vladyslav'})
        console.log(user);
    } catch (e) {
        console.log(e);
    }
}

start()