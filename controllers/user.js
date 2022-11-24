const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const {q, edad = 20, id} = req.query;

    res.json({
        msg: "Buenos Dias",
        q,
        edad,
        id
    })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params

    res.json({
        msg: "Buenos Dias",
        id
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body

    res.json({
        msg: 'Peticion PUT',
        nombre,
        edad
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "Buenos Dias",
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}