import axios from 'axios'
import { useEffect, useState } from 'react'

const LongPulling = () => {
	const [messages, setMessages] = useState([])
	const [value, setValue] = useState('')

	useEffect(() => {
		subscribe()
	}, [])

	const subscribe = async () => {
		try {
			const { data } = await axios.get('http://localhost:5000/message')
			setMessages(prev => [data, ...prev])
			await subscribe()
		} catch (error) {
			setTimeout(() => {
				subscribe()
			}, 500)
		}
	}

	const sendMessage = async () => {
		await axios.post('http://localhost:5000/message', {
			message: value,
			id: Date.now()
		})
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
						<div className='message' key={m.id}>
							{m.message}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default LongPulling
