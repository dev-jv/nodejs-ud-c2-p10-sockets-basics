
// HTML reference
const lblOnline = document.querySelector('#lblOnline');
const lblOfline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
    console.log('Connected');
    lblOnline.style.display = '';
    lblOfline.style.display = 'none';
});

socket.on('disconnect', () => {
    console.log('Disconnected');
    lblOnline.style.display = 'none';
    lblOfline.style.display = '';
});

socket.on('sd-mssg', (payload) => {
    console.log(payload)
});

btnSend.addEventListener('click', () => {
    const msg = txtMessage.value;
    console.log(msg);

    const payload = {
        msg,
        id: '123ABC',
        date: new Date().getTime()
    };

    socket.emit('sd-mssg', payload);
});
