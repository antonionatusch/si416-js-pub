const { ApolloServer } = require('apollo-server');

const conectarDB = require('./config/db');
const typeDefs = require('./db/schemas');
const resolvers = require('./db/resolvers');
const jwt = require("jsonwebtoken");

require('dotenv').config({ path: `variables.env` });

//Levantar la Base de Datos
conectarDB();

//Levantar el Servidor
const servidor = new ApolloServer(
    {
        typeDefs,
        resolvers,
        context: ({req}) => {
            const token = req.headers['authorization'] || '';
            if (token) {
                try {
                    const usuario = jwt.verify(token, process.env.CLAVE_SECRETA);
                    return {
                        usuario
                    }
                } catch (error){
                    console.log(error);
                }
            }
        }
    });

//Levantar el Servidor GraphQL
servidor.listen().then(({ url }) => {
    console.log(`Servidor levantado en la URL:${url}`);
});