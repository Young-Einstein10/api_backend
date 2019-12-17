const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);


const server = http.createServer(app);
const port = process.env.PORT || 3000
server.listen(port);
console.log(`Server running on port ${port}`)


module.exports = server;