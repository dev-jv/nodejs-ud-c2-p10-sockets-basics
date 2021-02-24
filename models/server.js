const express = require('express');
const cors = require('cors');
const colors = require('colors');

const {socketController} = require('../sockets/controller');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); // Data of all connected sockets

        this.paths = {};
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
        // Sockets / Conectores
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Public directory
        this.app.use( express.static('public') );
    }

    routes() {
        // this.app.use( this.paths.auth, require('../routes/auth'));
    }

    sockets() { // Socket(conector) to client
        // ---------------------------------------------- <> Listening Events on Server > Server
        this.io.on('connect', socketController ); // "connection" event / Server connection!
    }

    // sockets() { // Socket(conector) to client
    //     // ---------------------------------------------- <> Listening Events on Server > Server
    //     this.io.on('connect', socketClient => { // "connection" event / Server connection!
    //
    //         console.log('Connected client'.gray, socketClient.id);
    //
    //         socketClient.on('disconnect', () => { // "disconnect" event
    //             console.log('Disconnected client'.brightWhite, socketClient.id);
    //         });
    //
    //         socketClient.on('send-msg', (payload, callback) => { // "send-msg" event
    //             // ---- With a DB!
    //             // async... save in DB... here!
    //
    //             // ---- view in server
    //             console.log(payload);
    //
    //             // ---- view in all clients / io.emit ...or some cases..
    //             // this.io.emit('send-msg', payload); // pass event to client
    //
    //             // ---- view in others clients
    //             // socketClient.broadcast.emit('send-msg', payload); // pass event to client
    //
    //             // // ---- res to requesting client
    //             // const id = 123456;
    //             // // callback(id);
    //             // // callback({id, date: new Date().getTime()});
    //             // callback({id: id, mss: "DB response"});
    //
    //             //---- view in others clients, res to requesting client
    //             const id = 123456;
    //             socketClient.broadcast.emit('send-msg', payload);
    //             callback({id: id, mss: "DB response"});
    //         });
    //     });
    // }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Server running on port'.blue, this.port );
        });
    }
}

module.exports = Server;
