// Modules
const http = require('http');
const myRouter = require('./routes/router');

const PORT = 9000;

// Create server
const server = http.createServer((req, res) => {

  myRouter(req, res);

});

// Start server
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
