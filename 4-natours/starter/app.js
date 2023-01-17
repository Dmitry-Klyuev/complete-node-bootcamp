const express = require('express')
const fs = require('fs')
const crypto = require("crypto");
const {json} = require("express");
const morgan = require("morgan")

const app = express()
app.use(express.json())

const port = 3000;

//1) MIDDLEWARES
app.use((req, res, next) => {
    console.log('Hello from middleware')
    next()
})
//morgan - для логирования происходящего
app.use(morgan('dev'))

//2) ROUTES HANDLER
const getAllTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
}
const getTour = (req, res) => {
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
}
const createTour = (req, res) => {
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
}
const updateTour = (req, res) => {
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
}
const deleteTour = (req, res) => {
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
}
const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'Route is not completed'
    })
}
const getUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'Route is not completed'
    })
}
const createUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'Route is not completed'
    })
}
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'Route is not completed'
    })
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'Route is not completed'
    })
}


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'))


//3) ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/')
    .get(getAllTour)
    .post(createTour)
tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)
userRouter.route('/')
    .get(getAllUsers)
userRouter.route('/ :id')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//4) START SERVER
app.listen(port, () => {
    console.log(`Server running in ${port}...`)
})