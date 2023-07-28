const express = require('express')
const cors = require('cors')
const cars = require('./data/cars.data.js')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/cars', (req, res) => {
    res.json(cars)
})

app.get('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({message: 'Id is not specified'})
        return
    }
    const data = cars.find(car => car.id === +id);
    if (!data) {
        res.sendStatus(404)
        return
    }
    res.json(data)
})

app.post('/api/cars', (req, res) => {
    const data = req.body
    const newCar = {
        id: cars.length + 1,
        ...data
    }
    cars.push(newCar)
    res.status(201).json(newCar)
})

app.listen(3000, () => {
    console.log('Server started')
})