import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter'

dotenv.config()
const PORT = process.env.PORT || 3000
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb+srv://root:root@cluster0.jfu6fb4.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(express.json())
app.use('/api/account', authRouter)

const start = async () => {
	try {
		await mongoose.connect(DB_CONNECTION_STRING)
		app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
