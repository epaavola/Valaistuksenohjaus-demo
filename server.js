const express = require("express");
const path = require("path");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/control', (req, res) => {
  res.sendFile(__dirname + '/control.html')
});

http.listen(process.env.PORT , () => {
  console.log('Listening on port *:' + process.env.PORT );
});

io.on('connection', (socket) => {
  let id_ = Math.floor((Math.random() * 1000000) + 1);
  socket.emit('connections', id_);

  socket.on('newState', function(id, state, room) {
    io.sockets.emit('changeState', id, state, room);
  });

  socket.on('changeRoom', function(room, id) {
    io.sockets.emit('changeRoom', room, id);
  });
});

