const express = require('express')
const cors = require('cors')
const Emitter = require('events')

const PORT = 5000

const emitter = new Emitter.EventEmitter()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/message', (req, res) => {
	emitter.once('newMessage', message => {
		res.json(message)
	})
})

app.post('/message', (req, res) => {
	const message = req.body
	emitter.emit('newMessage', message)
	res.status(200)
})

app.listen(PORT, () => console.log('LONG PULLING SERVER STARTED ON PORT', PORT))
