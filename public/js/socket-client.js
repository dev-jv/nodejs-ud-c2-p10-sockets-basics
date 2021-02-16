
// HTML reference
const lblOnline = document.querySelector('#lblOnline');
const lblOfline = document.querySelector('#lblOffline');

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
