const fs = require('fs');
const http = require('http');
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

// --------------------------SERVER------------
//step1: create a server
const server = http.createServer((req, res) => {
  //each time request hit server, this call back is called
  console.log(req);
  res.end('Hello from server')//send back a very simple response
})

//step2: listen to incoming request from client on localhost IP's specific port
//port: a subAddress of host
//default localhost IP address:127.0.0.1(local host is current computer)
server.listen(8000, '127.0.0.1', () => {
  //call run when start listening
  console.log('Listening to request on 8000');
})