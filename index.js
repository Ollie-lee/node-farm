const fs = require('fs');
//blocking sync
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt', textOut)

// console.log('file has been written');

//non-blocking, async
fs.readFile('./txt/stdart.txt', 'utf-8', (err, data1) => {
  if (err) {
    return console.log('ERROR');
  }
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3);

      //write all of data together
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('final file has been written');
      })
    })
  })
})
console.log('file has been written');
