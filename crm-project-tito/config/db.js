const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
        })
        console.log("MongoDB Connected")
    } catch (error){
        console.log("Error al conectar la base de datos");
        console.error(error);
    }
}
module.exports = conectarDB;