import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    fetchCourse: String

    #Products
    fetchProducts: [Product]
    fetchProduct(id: ID!): Product
  }

  type User {
    name: String
    lastName: String
    email: String
    createdAt: String
  }

  type Token {
    token: String
  }

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createdAt: String
  }

  type Client {
    id: ID
    name: String
    lastName: String
    email: String
    company: String
    createdAt: String
    seller: ID
  }

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: Client
    seller: ID
    state: OrderState
  }

  type OrderGroup {
    id: ID
    quantity: Int
    name: String
    price: String
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  input inputAuth {
    email: String!
    password: String!
  }

  input productInput {
    name: String
    stock: Int
    price: Float
  }

  input ClientInput {
    name: String
    lastName: String
    email: String
    company: String
    phone: String
  }

  input OrderProductInput {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    seller: ID
    state: OrderState
  }

  enum OrderState {
    PENDING
    COMPLETED
    CANCELLED
  }

  type Mutation {
    #Users
    newUser(input: UserInput): User
    authUser(input: inputAuth): Token

    #Products
    newProduct(input: productInput): Product
    updateProduct(id: ID!, input: productInput): Product
    deleteProduct(id: ID!): String

    #Clients
    newClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client

    #Orders
    newOrder(input: OrderInput): Order
  }
`;

export default typeDefs;
