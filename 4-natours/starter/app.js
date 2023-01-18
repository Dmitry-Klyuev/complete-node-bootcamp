const express = require('express')
const morgan = require("morgan")
const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

const app = express()
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
//1) MIDDLEWARES
app.use((req, res, next) => {
    console.log('Hello from middleware')
    next()
})
//morgan - для логирования происходящего
app.use(morgan('dev'))

//3) ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app;
