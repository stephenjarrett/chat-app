// Server Creation
//  -Create express app
const express = require('express');
const app = express();
//  -Create plain HTTP server
const http = require('http');
const server = http.createServer(app);
const port = 5000;
//  -Create websocket server
const WebSocket = require('ws');
//  -Attach WS to express/http
const wss = new WebSocket.Server({ server: server });
//  -Add event listeners
//  -Listen for new connections
wss.on('connection', (socket) => {
    //When someone connects send the confirmation message
    socket.send('Hey, you are now connected');
    //listen for messages on this socket
    socket.on('message', (msg) => {
        //convert plain text to json
        // msg = JSON.parse(msg);
        console.log(msg);
        //send messages back to all users
        wss.clients.forEach((client) => {
            client.send(msg);
        });
    });
});
//  -Test using wscat
//  -installed globally - lets the CLI talk to a websocket server
//  -With app running.. new terminal.. wscat -c ws://localhost:5000


//listen on server rather than typically the express app since it ties the 2 together
server.listen(port, () => {
    console.log(`Your server is running on localhost:${port}`);
});
