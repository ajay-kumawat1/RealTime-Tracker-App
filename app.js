const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('User connected');
    
    socket.on('updateLocation', (data) => {
        io.emit('locationUpdate',{ id: socket.id, ...data});
    });

    socket.on('disconnect', (data) => {
        console.log('User disconnected', socket.id);
    }); 
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
