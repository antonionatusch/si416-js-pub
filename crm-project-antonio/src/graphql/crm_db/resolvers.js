import User from '../model/User.js';
import Product from '../model/Product.js';
import Client from '../model/Client.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Order from '../model/Order.js';

/**
 * @description Generates a JWT token
 * @param {Object} user - The user object containing user information
 * @param {string} secret - The secret key for signing the token
 * @param {string} expiresIn - The expiration time for the token
 * @return {string} - The generated JWT token
 */

const createToken = (user, secret, expiresIn) => {
  const { id, name, lastName, email } = user;
  return jwt.sign({ id, name, lastName, email }, secret, { expiresIn });
};

/**
 * @description Resolvers for GraphQL queries and mutations
 * @type {import('graphql').GraphQLSchema}
 */

const resolvers = {
  // Some desired queries are: Getting the best client (a.k.a the one that has bought the most),
  // Getting the best seller (a.k.a the one that has sold the most)
  Query: {
    /**
     * @description Fetches products from the database
     * @param {Object} _ - The parent object (not used)
     * @return {Promise<Array>} - A promise that resolves to an array of products
     */
    fetchProducts: async () => {
      try {
        const products = await Product.find({});
        return products;
      } catch (error) {
        console.error(error);
      }
    },
    fetchProduct: async (_, { id }) => {
      const product = await Product.findById(id);
      if (!product) {
        throw new `Product with id ${id} does not exist.`();
      }
      return product;
    },
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error('User already exists.');
      }

      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(password, salt);

      try {
        const user = await User(input);
        await user.save();
        return user;
      } catch (error) {
        console.error(error);
      }
    },
    authUser: async (_, { input }) => {
      const { email, password } = input;

      const userExists = await User.findOne({ email });
      if (!userExists) {
        throw new Error(`User with email ${email} does not exist.`);
      }

      const isCorrectPassword = await bcrypt.compare(
        password,
        userExists.password,
      );

      if (!isCorrectPassword) {
        throw new Error('Incorrect password.');
      }

      return {
        token: createToken(userExists, process.env.SECRET_KEY, '30000000'),
      };
    },
    newProduct: async (_, { input }) => {
      try {
        const product = new Product(input);

        const result = await product.save();
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    updateProduct: async (_, { id, input }) => {
      let product = await Product.findById(id);
      if (!product) {
        throw new `Product with ID ${id} does not exist.`();
      }

      product = await Product.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return product;
    },
    deleteProduct: async (_, { id }) => {
      let product = await Product.findById(id);
      if (!product) {
        throw new `Product with ID ${id} does not exist.`();
      }
      try {
        await Product.findOneAndDelete({ _id: id });
        return 'Product deleted successfully.';
      } catch (error) {
        console.error(error);
      }
    },
    newClient: async (_, { input }, ctx) => {
      const { email } = input;

      const clientExists = await Client.findOne({ email });
      if (clientExists) {
        throw new Error('Client already exists.');
      }
      const newClient = new Client(input);

      newClient.seller = ctx.user.id;

      try {
        return await newClient.save();
      } catch (error) {
        console.log(error);
      }
    },
    updateClient: async (_, { id, input }, ctx) => {
      let client = await Client.findById(id);
      if (!client) throw new Error(`Client with ID: ${id} does not exist.`);

      if (client.seller.toString() !== ctx.user.id)
        throw new Error(
          `You are not this client's seller. The client's seller ID is ${client.seller} and yours is ${ctx.user.id}`,
        );

      const newClient = await Client.findByIdAndUpdate(id, input, {
        new: true,
      });
      return newClient;
    },

    newOrder: async (_, { input }, ctx) => {
      const { client: clientId, order } = input;

      let client = await Client.findById(clientId);
      let totalPrice = 0;
      if (!client)
        throw new Error(`Client with ID: ${clientId} does not exist.`);

      if (client.seller.toString() !== ctx.user.id)
        throw new Error(
          `You are not this client's seller. The client's seller ID is ${client.seller} and yours is ${ctx.user.id}`,
        );

      for (const item of order) {
        const { id } = item;

        const product = await Product.findById(id);
        if (!product) throw new Error(`Product with ID: ${id} does not exist.`);

        if (item.quantity > product.stock) {
          throw new Error(
            `Product with name: ${product.name} exceeds the available stock.`,
          );
        } else {
          product.stock -= item.quantity;
          totalPrice += product.price * item.quantity;
          await product.save();
        }
      }

      const newOrder = await Order(input);
      newOrder.seller = ctx.user.id;
      newOrder.client = clientId;
      newOrder.total = totalPrice;

      console.log(newOrder);
      try {
        const result = await newOrder.save();
        return result.populate('client');
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default resolvers;
