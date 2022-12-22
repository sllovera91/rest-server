const Rols = require('../models/rol');
const Usuario = require('../models/usuario');

 const esRolValido = async(Rol = '') => {
    const existeRol = await Rols.findOne({ Rol });
    if(!existeRol) {
        throw new Error(`El rol ${Rol} no esta en la DB`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta en registrado`)
}
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario no esta registrado`)
}
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}