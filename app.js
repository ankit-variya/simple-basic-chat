var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  let add;
  socket.username = "Anonymous"

  socket.on('username', (data) => {
    console.log("data", data)
    //  io.emit('username', data)
    return add = data;
    // socket.username = data.username
  })


  socket.on('chat message', (msg) => {
    console.log('add', add);
    console.log("msg", msg)
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = ' ' + time;
    io.emit('chat message', add + " : " + msg + "     "+ dateTime);
  });

});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });

http.listen(9000, () => {
  console.log('listening on *:9000');
});