const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

//blocking sync
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt', textOut)

// console.log('file has been written');

//non-blocking, async
// fs.readFile('./txt/stdart.txt', 'utf-8', (err, data1) => {
//   if (err) {
//     return console.log('ERROR');
//   }
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       //write all of data together
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('final file has been written');
//       })
//     })
//   })
// })
// console.log('file has been written');

///////////////////////////////////////////////////////////////////////////////////
// --------------------------SERVER------------
//step1: create a server

//top level code only get executed once
//so we use sync version, cuz it's easier to handle data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

//here the callback is executed when there is a new request
const server = http.createServer((req, res) => {
  //each time request hit server, this call back is called
  const pathName = req.url;
  const { pathname, query } = url.parse(pathName, true); //second: parse query string to obj
  // console.log(pathName);
  // console.log(pathname);
  // console.log(query);
  //overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    // will be an array, with the five final HTML's,=> then join each array element into a new string
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output); //send back a very simple response, this output is response body

    //product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id]; //retrieve one single data obj
    const output = replaceTemplate(tempProduct, product);
    res.end(output); // whole (HTML + CSS).html file
    //api page
  } else if (pathname === '/api') {
    //use script's context dir string
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data); // only receive string
  }

  //not found page
  else {
    //write response header before we send response
    //status code is made up by developer
    res.writeHead(404, {
      'Content-type': 'text/html',
      'made-up-header': 'hahaha',
    });
    res.end('<h1>404!</h1>');
  }
});

//step2: listen to incoming request from client on localhost IP's specific port
//port: a subAddress of host
//default localhost IP address:127.0.0.1(local host is current computer)
server.listen(8000, '127.0.0.1', () => {
  //call run when start listening
  console.log('Listening to request on 8000');
});
