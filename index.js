let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mysql = require('mysql');

let conn = mysql.createConnection({
    host: 'localhost',
    database: 'chat_progra',
    user: 'root',
    password: ''    
});

conn.connect(function(err){
    if(err){
        throw err 
    }else{
        console.log('Conexion exitosa!');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html'); 
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    let username; 
    socket.on('crearUsuario', function(data){
        username = data;

        conn.query('INSERT INTO usuarios(nombre_usuario, fecha) VALUES ("'+ username +'", CURDATE())')

    });

    socket.on('mjsNuevo', function(data){

        socket.broadcast.emit('mensaje',{
            usuario: username,
            mensaje: data
        });

        socket.emit('mensaje', {
            usuario: username,
            mensaje: data
        });
    });
});

http.listen(3000 , () => {
    console.log('Servidor en marcha por puerto 3000');
});

