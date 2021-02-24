// HTML reference
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io(); // Socket/Conector to server

// ---------------------------------------- <> Listening Events on Server > Client
socket.on('connect', () => { // "connect" event
    console.log('Connected > Server');
    lblOnline.style.display = '';
    lblOffline.style.display = 'none';
});

socket.on('disconnect', () => { // "disconnect" event
    console.log('Disconnected > Server');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('send-msg', (payload) => { // "send-msg" event
    console.log(payload) // view in client side
});

// ---------------------------------------- <> Sending data | Event activator
// socket.emit('send-msg', { // Test direct send - Send from client
//    user: 'User',
//    msg: 'From the clt... ...'
// }, function (res) {  // res to requesting client
//     console.log('Response from server:', res);
// });

btnSend.addEventListener('click', () => {
    const msg = txtMessage.value;
    console.log(msg);

    const payload = {
        msg,
        id: '123ABC',
        date: new Date().getTime()
    };

    // socket.emit('send-msg', msg);

    // socket.emit('send-msg', payload);

    socket.emit('send-msg', payload, ( kallback ) => { // Pass event to server
        console.log('Response from server:', kallback); // res to requesting client
    });
});
