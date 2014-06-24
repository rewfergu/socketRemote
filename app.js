var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
console.log('starting localhost:8080');
console.log('starting localhost:8080/interface');

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/interface', function (req, res) {
  res.sendfile(__dirname + '/interface.html');
});

io.on('connection', function (socket) {
  var active = { className: 'default' };

  socket.emit('start', { hello: 'world' });

  // get interface control message
  socket.on('sendActive', function(data) {
    io.emit('getActive', data);
  });

});