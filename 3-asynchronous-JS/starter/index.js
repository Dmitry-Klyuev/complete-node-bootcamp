const fs = require('fs')
const superagent = require('superagent')

//функция для чтения имени собаки из файла
const readFilePromise = file => {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) rej('Do not read file')
            res(data)
        })
    })
}
//Функция записи ссылки рандомной картинки в файл
const writeFilePromise = (file, data) => {
    return new Promise((res, rej) => {
        fs.writeFile(file, data, err => {
            if (err) rej('Do not write on this file')
            res(data)
        })
    })
}
//Избавились от ада колбэков и переписали все на Promise
// readFilePromise(`${__dirname}/dog.txt`)
//     .then(res => {
//         console.log(res)
//         return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`)
//     })
//     .then(res => {
//         console.log('Promise 2 ' + res.body.message)
//         return writeFilePromise(`dog-img.txt`, res.body.message)
//     })
//     .then(() => {
//         console.log('Random dog image saved to file')
//     })
//     .catch(err => {
//         console.log(err)
//     })

//Делаем на Async Await
const getDogPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`)
        console.log(data)
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message)
        await writeFilePromise(`dog-img.txt`, res.body.message)
        console.log('Random dog image saved to file')
    } catch (e) {
        console.log(e)
    }
}
getDogPic()