const ws = require('ws')

const wss = new ws.Server(
	{
		port: 5000
	},
	() => console.log('WS SERVER STARTED')
)

wss.on('connection', function connection(ws) {
	// ws.send('User Vlad connected')
	ws.on('message', function (message) {
		message = JSON.parse(message)
		switch (message.event) {
			case 'message':
				broadcastMessage(message)
				break

			case 'connection':
				broadcastMessage(message)
				break

			default:
				break
		}
	})
})

function broadcastMessage(message) {
	wss.clients.forEach(c => {
		c.send(JSON.stringify(message))
	})
}
