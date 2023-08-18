import React, { useRef, useState } from 'react'

const WebSock = () => {
	const [messages, setMessages] = useState([])
	const [value, setValue] = useState('')
	const socket = useRef()
	const [isConnected, setIsConnected] = useState(false)
	const [username, setUsername] = useState('')

	const sendMessage = async () => {
		const message = {
			username,
			message: value,
			id: Date.now(),
			event: 'message'
		}
		socket.current.send(JSON.stringify(message))
		setValue('')
	}

	function connect() {
		socket.current = new WebSocket('ws://localhost:5000')

		socket.current.onopen = () => {
			setIsConnected(true)
			const message = {
				event: 'connection',
				username,
				id: Date.now()
			}
			alert('Connected')
			socket.current.send(JSON.stringify(message))
		}

		socket.current.onmessage = event => {
			const message = JSON.parse(event.data)
			setMessages(prev => [message, ...prev])
		}

		socket.current.onclose = () => {
			alert('Socket close')
		}

		socket.current.onerror = () => {
			alert('Socket error')
		}
	}

	if (!isConnected) {
		return (
			<div className='center'>
				<div className='form'>
					<input
						value={username}
						onChange={e => setUsername(e.target.value)}
						type='text'
						placeholder='Enter your name'
					/>
					<button onClick={connect}>Sign in</button>
				</div>
			</div>
		)
	}

	return (
		<div className='center'>
			<div>
				<div className='form'>
					<input
						value={value}
						onChange={e => setValue(e.target.value)}
						type='text'
					/>
					<button onClick={sendMessage}>Send</button>
				</div>
				<div className='messages'>
					{messages.map(m => (
						<div key={m.id}>
							{m.event === 'connection' ? (
								<div className='connection_message'>
									User {m.username} connected
								</div>
							) : (
								<div className='message'>
									{m.username}. {m.message}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default WebSock
