const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'number.json');

// Get the number from the number.json file
const getNumber = (req, res) => {
  fs.readFile(p, (err, data) => {
    let number = Object.values(JSON.parse(data));
    try{
      if ( number.length === 0){
        res.statusCode = 404;
        res.end(JSON.stringify({message: 'There is no value stored!!!'}));
      } else {
        res.end(data);
      }
    } catch(err){ console.log(err)}
  });
};

// Create a number in the number.json file
const createNumber = (req, res) => {
  fs.readFile(p, (err, data) => {
    let length = Object.values(JSON.parse(data)).length;
    try{
      if ( length === 0){
        let body;
        req.on('data', (chunk) => {
          body = chunk;
        });

        req.on('end', () => {
          data = JSON.parse(data);
          Object.assign(data, JSON.parse(body));
          if (typeof Object.values(data)[0] === 'number'){
            fs.writeFile(p, JSON.stringify(data), (err) => console.log(err));
            res.statusCode = 201;
            res.end(JSON.stringify({message: 'Number successfully created', data}));
          } else {
            res.statusCode = 400;
            res.end(JSON.stringify({message: 'The value is not a number'}));
          }
        })
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({message: 'There is already a number, you cannot add another one!!!'}));
      }
    } catch(err){ console.log(err) }
  });
};

// Update the number from the number.json file
const updateNumber = (req, res) => {
  fs.readFile(p, (err, data) => {
    let length = Object.values(JSON.parse(data)).length;
    try{
      if ( length !== 0){
        let body;
        req.on('data', (chunk) => {
          body = chunk;
        });

        req.on('end', () => {
          data = JSON.parse(data);
          Object.assign(data, JSON.parse(body));
          if (typeof Object.values(data)[0] === 'number'){
            fs.writeFile(p, JSON.stringify(data), (err) => console.log(err));
            res.statusCode = 200;
            res.end(JSON.stringify({message: 'Number successfully updated', data}));
          } else {
            res.statusCode = 400;
            res.end(JSON.stringify({message: 'The value is not a number'}));
          }
        })
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({message: 'Theres is no value stored!!!'}));
      }
    } catch(err){ console.log(err) }
  });
};

// Multiply Number
const multiplyNumber = (req, res, multiplier) => {
  fs.readFile(p, (err, data) => {
    let number = Object.values(JSON.parse(data));
    try{
      if ( number.length === 0){
        res.statusCode = 404;
        res.end(JSON.stringify({message: 'There is no value stored!!!'}));
      } else {
        res.end(JSON.stringify({
          numberMultiplied: number[0]*multiplier,
        }));
      }
    } catch(err){ console.log(err)}
  });
} 

module.exports = {
  getNumber,
  createNumber,
  updateNumber,
  multiplyNumber,
}