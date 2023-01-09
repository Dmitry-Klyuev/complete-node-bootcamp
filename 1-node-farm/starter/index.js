const fs = require('fs') //для работы с файлами
const http = require('http') //для создания сервера
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify');

//////////////////////
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
const dataObj = JSON.parse(data)
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
//Распарсить если будем работать с данными на сервере
// const productData = JSON.parse(data)
// console.log(product)

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}))
console.log(slugs)

http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url, true)
    //overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')
        const outHtml = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(outHtml)
        //product
    } else if (pathname === '/product') {
        const product = dataObj[query.id]
        res.writeHead(200,{ 'Content-type': 'text/html'})
        const output = replaceTemplate(templateProduct, product)
        res.end(output)
        //api
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
        //not found
    } else {
        res.writeHead(404)
        res.end('Page not found')
    }
}).listen(3000, '127.0.0.1', () => {
    console.log('Server started on 3000 port')
})

