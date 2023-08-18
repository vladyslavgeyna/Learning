const express = require('express')
const cors = require('cors')
const Emitter = require('events')

const PORT = 5000

const emitter = new Emitter.EventEmitter()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
	res.writeHead(200, {
		Connection: 'keep-alive',
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache'
	})
	emitter.on('newMessage', message => {
		res.write(`data: ${JSON.stringify(message)} \n\n`)
	})
})

app.post('/message', (req, res) => {
	const message = req.body
	emitter.emit('newMessage', message)
	res.status(200)
})

app.listen(PORT, () => console.log('EVENT SOURCE SERVER STARTED ON PORT', PORT))
