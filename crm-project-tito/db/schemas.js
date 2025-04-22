const {gql} = require("apollo-server");

const typeDefs = gql`
    type Query {
        obtenerCurso: String
        
        #Productos
        obtenerProductos:[Producto]
        obtenerProducto(id:ID!):Producto
    },
    
    type Usuario {
        nombre: String,
        apellido: String,
        email: String,
        creado: String,
    }
    
    type Token {
        token: String
    }
    
    type Producto {
        id: ID,
        nombre: String,
        stock: Int,
        precio : Float,
        creado: String,
    }
    
    type Cliente {
        id: ID,
        nombre: String,
        apellido: String,
        email: String,
        empresa: String,
        creado: String,
        vendedor: ID
    }
    
    type Pedido {
      id: ID,
      pedido: [PedidoGrupo]
      total: Float
      cliente: Cliente
      vendedor: ID
      estado: EstadoPedido
    }
    type PedidoGrupo {
       id: ID,
       cantidad: Int,
       nombre: String,
       precio: Float,
    }
    
    input UsuarioInput {
        nombre: String,
        apellido: String,
        email: String,
        password: String,
    }
    
    input inputAutenticar {
        email: String!,
        password: String!,
    }
    
    input productoInput {
        nombre: String,
        stock: Int,
        precio : Float,
    }
    
    input ClienteInput {
        nombre: String,
        apellido: String,
        email: String,
        empresa: String,
        telefono: String,
    }
    input PedidoProductoInput {
       id: ID
       cantidad: Int
       nombre: String,
       precio: Float,
    }
    input PedidoInput {
        pedido: [PedidoProductoInput]
        total: Float
        cliente: ID
        vendedor: ID
        estado: EstadoPedido
    }
    enum EstadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }
    type Mutation {
        #Usuarios
        nuevoUsuario(input: UsuarioInput):Usuario
        autenticarUsuario(input: inputAutenticar): Token
        
        #Productos
        nuevoProducto(input: productoInput):Producto
        actualizarProducto(id:ID!, input: productoInput):Producto
        eliminarProducto(id:ID!):String
        
        #Clientes
        nuevoCliente(input:ClienteInput):Cliente
        actualizarCliente(id:ID!, input: ClienteInput):Cliente
        
        #Pedidos
        nuevoPedido(input:PedidoInput):Pedido
     
    }
    
`

module.exports = typeDefs;