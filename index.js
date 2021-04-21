let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html'); 
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    let username; 
    socket.on('crearUsuario', function(data){
        username = data;
    });

    socket.on('mjsNuevo', function(data){
        socket.emit('mensaje', {
            usuario: username,
            mensaje: data
        });
    });
});

http.listen(3000 , () => {
    console.log('Servidor en marcha por puerto 3000');
});

