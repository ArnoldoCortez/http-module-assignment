const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'number.json');

// Reset the file number.json 
const resetNumber = (req, res) => {
  fs.readFile(p, (err, data) => {
    let length = Object.values(JSON.parse(data)).length;
    try{
      if ( length !== 0){
        fs.writeFile(p, '{}', (err) => console.log(err));
        res.statusCode = 200;
        res.end(JSON.stringify({message: 'File successfully reseted!!'}));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({message: 'There is no value stored!!!'}));
      }
    } catch(err){ console.log(err) }
  });
};

module.exports = {
  resetNumber,
}