const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({
    path: './.env'
})
const DB = process.env.DATABAS.replace('<PASSWORD>', process.env.DATABSE_PASS)
const app = require('./app')

mongoose.set('strictQuery', false);
mongoose.connect(DB, {
    useNewUrlParser: true,
})
    .then(()=> console.log('DB connected'))

const tourSchema = new mongoose.Schema({ //Описываем схему нашей модули
    name: {
        type: String, // Тип поля
        require: [true, 'A Tour must have a name'], // обязательно для заполнения, в массиве пишем что выводим при ошибке
        unique: true //Поле name должно быть уникальным
    },
    price: {
        type: String,
        require: [true, 'A Tour must have a price']
    },
    rating: {
        type: Number,
        default: 4.5 // Значение по умолчанию
    }
})

const Tour = mongoose.model('Tour', tourSchema) //Создаем модель на основе схемы

const port = process.env.port;

app.listen(port, () => {
    console.log(`Server running in ${port}...`)
})