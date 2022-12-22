const { response, request } = require('express');
const  bcryptjs = require('bcryptjs');
const  Usuario  = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    
    const {limite = 5, desde = 0} = req.query;
    
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments({estado: true}),
            Usuario.find({estado: true})
            .limit(Number(limite))
            .skip(Number(desde))
        ])

    res.json({
       total,
       usuarios 
    })
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto } = req.body;

    if (password) { 
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: "Buenos Dias",
        usuario 
    })
}

const usuariosPost = async (req, res = response) => {

  

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const  existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'el correo ya esta registrado'
        })
    }

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt ); 

    await usuario.save()

    res.json({
        usuario
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params

    // //borrado fisico
    // const usuario = await Usuario.findByIdAndDelete( id );

    //borrado via estado en false

    const usuario = await Usuario.findByIdAndUpdate( id,{ estado: false });

    res.json({
        msg:'Borrado con exito'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}