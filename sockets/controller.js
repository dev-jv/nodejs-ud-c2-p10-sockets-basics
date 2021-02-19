
const socketController = socketClient => { // "connection" event / Server connection!

    console.log('Connected client'.gray, socketClient.id);

    socketClient.on('disconnect', () => { // "disconnect" event
        console.log('Disconnected client'.brightWhite, socketClient.id);
    });

    socketClient.on('send-msg', (payload, callback) => { // "send-msg" event
        // ---- With a DB!
        // async... save in DB... here!

        // ---- view in server
        // console.log(payload);

        // ---- view in all clients / io.emit ...or some cases..
        // socketClient.broadcast.emit('send-msg', payload); // view in others clients / pass event to client

        // ---- res to client req
        // const id = 123456;
        // callback(id);
        // callback({id, date: new Date().getTime()});
        // callback({id: id, mss: "DB response"});

        // ---- view in others clients and return msg in client req
        const id = 123456;
        callback({id: id, mss: "DB response"});
        socketClient.broadcast.emit('send-msg', payload); // view in others clients / pass event to client
    })
};

module.exports = {
    socketController
};
