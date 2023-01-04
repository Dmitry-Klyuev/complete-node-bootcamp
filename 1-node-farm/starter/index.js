const fs = require('fs') //для работы с файлами
const http = require('http') //для создания сервера

///////////////////////
//FILE
//Blocking code

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `Some text ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('file written')

//non blocking async
// console.log('start')
// fs.readFile('./txt/start.txt', 'utf-8',  (err, data1)=>{
//     if (err) return console.log('ERROR')
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//     })
// })
// console.log('end')

////////////////////////
//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
//Распарсить если будем работать с данными на сервере
// const productData = JSON.parse(data)
// console.log(product)

http.createServer((rej, res) => {
    const route = rej.url
    if (route === '/' || route === '/overview') {
        res.end('This is page of overview')
    } else if (route === '/product') {
        res.end('This is page of product')
    } else if (route === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
    } else {
        res.writeHead(404)
        res.end('Page not found')
    }
}).listen(3000, '127.0.0.1', () => {
    console.log('Server started on 3000 port')
})

