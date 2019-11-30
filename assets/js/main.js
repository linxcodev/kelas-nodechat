const socket = io()

// ======== login =========
$('#submit_name').submit(e => {
  e.preventDefault()
  const username = $('#username').val()

  // check username jika kosong
  if (!username) {
    showValidate($('#username'))
    $('.danger').removeClass('hidden')
    $('.danger').text("username kosong")
  } else if (/\s/.test(username)) {
    showValidate($('#username'))
    $('.danger').removeClass('hidden')
    $('.danger').text("username mengandung spasi")
  } else {
    // kirim data username ke server
    // dengan membuat key, value
    socket.emit("loginUser", username)
  }
})

socket.on("loginResponse", status => {
  if (status) {
    $('#login').addClass('hidden')
    $('#chatroom').removeClass('hidden')
  }
})

// menampilkan list user inline
socket.on("onlineUsers", usernames => {
  console.log(usernames);
  $('.friend-list').empty()

  usernames.map(username => {
    $('.friend-list').append(`<li id="user_${username}" class="ml-1">
      <span>${username}</span>
    </li>`)
  })
})

const showValidate = input => {
  const alert = $(input).parent()

  $(alert).addClass('alert-validate')
}








//
