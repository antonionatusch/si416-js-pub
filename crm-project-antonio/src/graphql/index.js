import { ApolloServer } from 'apollo-server';
import connectDB from './config/crm_db.js';
import typeDefs from './crm_db/schemas.js';
import resolvers from './crm_db/resolvers.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers['authorization'] || '';
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return {
          user,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running in URL: ${url}`);
});
