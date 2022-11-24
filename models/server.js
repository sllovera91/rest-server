const express = require('express')
const cors = require('cors')


class Server {

    constructor() {
        this.app = express();    
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    middlewares() {
        //direc. publico
        this.app.use( express.static('public') );
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use( express.json() )
    }

    routes() {

    this.app.use(this.usuariosPath, require('../routes/user'));


    }

    listen() {
        this.app.listen(this.PORT)
    }

}

module.exports = Server;