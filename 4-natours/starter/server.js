const dotenv = require('dotenv')
dotenv.config({
    path: './.env'
})

const app = require('./app')


const port = process.env.port;

app.listen(port, () => {
    console.log(`Server running in ${port}...`)
})