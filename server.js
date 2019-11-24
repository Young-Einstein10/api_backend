const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);


const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
console.log('Server running on port 3000')


module.exports = server;