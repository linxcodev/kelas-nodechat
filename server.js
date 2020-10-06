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
    io.emit('newMessage', user)
  })

  socket.on('disconnect', () => {
    // menghapus data user logout
    const index = usernames.indexOf(users[socket.id])
    if (users[socket.id]) {
      // hapus user di data array (posisi array, jumlah yg dihapus)
      usernames.splice(index, 1)
    }

    // hapus user di data json
    delete users[socket.id]

    io.emit('onlineUsers', usernames)
  })
});

http.listen(2000, () => {
  console.log('listening on *:2000')
});
socket.on('reconnect', () => {
    // menghapus data user logout
    const index = usernames.indexOf(users[socket.id])
    if (users[socket.id]) {
      // hapus user di data array (posisi array, jumlah yg dihapus)
      usernames.splice(index, 1)
    }

    // hapus user di data json
    delete users[socket.id]

    io.emit('reUsers', reusernames)
  })
