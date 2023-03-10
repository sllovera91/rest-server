const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN )
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la DB');
    }

    console.log('Db Online')


}

module.exports = {
    dbConnection
}