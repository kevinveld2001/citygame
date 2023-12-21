const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  path: '/socket.io',
});

io.on('connection', function (socket) {
  console.log("connection by " + socket.handshake.query.userId);
  socket.emit('test', "hallo");
});

http.listen(3001, function () {
  console.log('listening on *:3001');
});