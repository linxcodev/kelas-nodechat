const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// permission file assets
app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

let users = {},
    usernames = []

io.on('connection', socket => {
  // mengirim pesan
  socket.on('newMessage', (msg) => {
    io.emit('newMessage', msg)
  })

  // login
  // mendeteksi informasi dari client side key, value
  socket.on("loginUser", username => {
      // menampilkan user online
      usernames.push(username)
      users[socket.id] = username
      // console.log(usernames);
      // kririm data untuk semua user
      io.emit('onlineUsers', usernames)

      // kririm data untuk kita sendiri
      socket.emit('loginResponse', true)
  })

  // chat message
  socket.on('newMessage', user => {
    io.emit('newMsg', user)
  })
});

http.listen(2000, () => {
  console.log('listening on *:2000')
});
