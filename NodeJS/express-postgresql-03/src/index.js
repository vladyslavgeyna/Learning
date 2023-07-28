const express = require('express')
const userRouter = require('./routes/userRouter')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/api/users', userRouter)


app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))