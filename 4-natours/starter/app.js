const express = require('express')
const fs = require('fs')

const app = express()

const port = 3000;

// app.get('/', (req, res) => {
//     res.status(200).json({"token": "212321321", "name": 'Hello from backend!!!!'})
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'))

app.get('/api/v1/tours', (rej, res)=>{
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
})

app.listen(port, ()=>{
    console.log(`Server running in ${port}...`)
})