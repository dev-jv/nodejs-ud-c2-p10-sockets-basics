// HTML reference
const lblOnline = document.querySelector('#lblOnline');
const lblOfline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io(); // Socket/Conector to server

// ---------------------------------------- <> Listening Events on Server
socket.on('connect', () => { // "connect" event
    console.log('Connected > Server');
    lblOnline.style.display = '';
    lblOfline.style.display = 'none';
});

socket.on('disconnect', () => { // "disconnect" event
    console.log('Disconnected > Server');
    lblOnline.style.display = 'none';
    lblOfline.style.display = '';
});

socket.on('send-msg', (payload) => { // "send-msg" event
    console.log(payload) // view in client side
});

// ------------------------------------- <> Event activator
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

    socket.emit('send-msg', payload, ( k ) => { // Pass event to server
        console.log('From the server', k)
    });
});
