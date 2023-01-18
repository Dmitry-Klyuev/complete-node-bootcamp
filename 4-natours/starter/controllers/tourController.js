const fs = require('fs');
const crypto = require('crypto');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'))

exports.getAllTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
}
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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