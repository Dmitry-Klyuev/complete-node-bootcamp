const express = require('express')
const fs = require('fs')
const crypto = require("crypto");
const {json} = require("express");

const app = express()
app.use(express.json())

const port = 3000;

// app.get('/', (req, res) => {
//     res.status(200).json({"token": "212321321", "name": 'Hello from backend!!!!'})
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
})

app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1
    console.log(id)
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: 'error',
            message: 'invalid id'
        })
    }
    res.status(200).json({
        status: "success",
        result: tour.length,
        data: {
            tour
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);
    const newId = crypto.randomBytes(16).toString("hex");
    const newTour = {...{id: newId}, ...req.body}
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})

app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: 'error',
            message: 'invalid id',
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: 'something updated...'
        }
    })
})

app.delete('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    if (!tour){
        return res.status(404).json({
            status: 'error',
            message: 'invalid id'
        })
    }
    const sortTours = tours.filter(el => el.id !== id)
    fs.writeFile(`${__dirname}/dev-data/tours-simple`, JSON.stringify(sortTours), 'utf-8', err =>{
        res.status(200).json({
            status: 'success',
            data: {
                sortTours
            }
        })
    })
})


app.listen(port, () => {
    console.log(`Server running in ${port}...`)
})