require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const accountRouter = require('./routes/userRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/account', accountRouter)

app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, () => console.log('Server started on port:', PORT))
	} catch (error) {
		console.log(error)
	}
}

start()
