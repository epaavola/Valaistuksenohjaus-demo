const express = require("express");
const path = require("path");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let control_id;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/control', (req, res) => {
  control_id = req.query.id;
  res.sendFile(__dirname + '/control.html')
});

http.listen(3000, () => {
  console.log('Listening on port *: 3000');
});

io.on('connection', (socket) => {
  let ids = Math.floor((Math.random() * 10000) + 1);
  socket.emit('connections', ids);

  socket.on('newState', function(id, state) {
    io.sockets.emit('changeState', id, state);
  });
  });

