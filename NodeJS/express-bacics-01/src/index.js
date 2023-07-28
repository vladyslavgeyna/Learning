import express from 'express'
import mongoose from "mongoose"
import postRouter from "./routers/post.js";
import fileUpload from 'express-fileupload'

const PORT = 3000
const DB_URL = 'mongodb+srv://root:root@cluster0.c8dib99.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(express.json())
app.use(express.static('src/static'))
app.use(fileUpload({}))
app.use('/api', postRouter)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('Server started on port '.toUpperCase() + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
