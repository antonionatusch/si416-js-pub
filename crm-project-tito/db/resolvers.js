const Usuario = require('../Model/Usuario.js');
const Producto = require('../model/Producto.js');
const Cliente = require('../Model/Cliente.js');
const Pedido  = require('../Model/Pedido.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const crearToken = (usuario,secreta,expiresIn) => {
    const {id, nombre, apellido, email } = usuario
    return jwt.sign({id, nombre, apellido, email},secreta,{expiresIn})
}

const resolvers = {
    Query: {
        obtenerProductos: async () => {
           try {
               const productos = await Producto.find({});
               return productos;
           } catch (error){
               console.error(error)
           }
        },
        obtenerProducto: async (_, {id}) => {
            //Verificar si el producto con ese ID existe
            const producto = await Producto.findById(id);
            if (!producto) {
                throw new (`El producto con ese ID ${id} no existe`);
            }
            return producto;
        }
    },
    Mutation: {
        nuevoUsuario: async (_,{input})=>{
            //console.log(input);
            const {email, password} = input;
            // Revisar si ese usuario existe
            const existeUsuario = await Usuario.findOne({email});
            if(existeUsuario){
               throw new Error("El usuario no existe");
            }

            // Guardarlo en la base de datos
            try{
                const usuario = await Usuario(input)
                await usuario.save();
                return usuario;
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (_,{input})=>{
            const {email, password} = input;
            // Revisar si ese usuario existe
            const existeUsuario = await Usuario.findOne({email});
            if(!existeUsuario){
                throw new Error(`El usuario con ese email ${email} no existe`);
            }
            const passwordCorrecto = await bcrypt.compare(password, existeUsuario.password);


            return {
                token: crearToken(existeUsuario, process.env.CLAVE_SECRETA, '30000000')
            }
        },
        nuevoProducto: async (_,{input})=>{
           try {
               const producto =
                   new Producto(input);
               //Grabar en la Base de Datos
               const resultado = await producto.save()
               return resultado;
           } catch (error){
               console.log(error);
           }
        },
        actualizarProducto:async (_,{id, input})=>{
            //Verificar si el producto con ese ID existe
            let producto = await Producto.findById(id);
            if (!producto) {
                throw new (`El producto con ese ID ${id} no existe`);
            }
            //Guardar en la Base de Datos la actualizacion
            producto = await Producto.findOneAndUpdate({_id:id}, input,{new:true})
            return producto;
        },
        eliminarProducto: async (_,{ id })=>{
            //Verificar si el producto con ese ID existe
            let producto = await Producto.findById(id);
            if (!producto) {
                throw new (`El producto con ese ID ${id} no existe`);
            }
            try {
                await Producto.findOneAndDelete({_id:id});
                return "Producto Eliminado exitosamente!!!";
            } catch (error){
                console.log(error);
            }
        },
        nuevoCliente: async (_,{input}, ctx)=>{
            console.log(ctx.usuario);
            const { email } = input;
            //Verificar si el cliente ya esta registrado
            const existeCliente = await Cliente.findOne( { email });
            if(existeCliente){
                throw new Error("El cliente ya existe.");
            }
            const nuevoCliente = new Cliente(input);
            //Asignar el vendedor
            nuevoCliente.vendedor = ctx.usuario.id;
            //Grabar en la BASE DE DATOS
            try {
                return await nuevoCliente.save();
            } catch (error){
                console.log(error);
            }
        },
        actualizarCliente: async (_, {id, input}, ctx) => {
            console.log(ctx);
            console.log(id);
            let cliente = await Cliente.findById(id);
            console.log(cliente.vendedor);
            if (!cliente)
                throw new Error(`El cliente con ID: ${id} no existe.`);

            if  (cliente.vendedor.toString() !== ctx.usuario.id)
                throw new Error (`Usted no es el vendedor de este cliente. El ID del vendedor del cliente es ${cliente.vendedor} y el suyo ${ctx.usuario.id}`);

            const nuevoCliente = await Cliente.findByIdAndUpdate(id, input, {new:true});
            return nuevoCliente;
        },
        nuevoPedido: async (_,{ input }, ctx)=>{
            //console.log(input);
            const { cliente } = input;
            //Verificar si el cliente existe
            console.log(cliente)
            const clienteExiste =
                await Cliente.findById(cliente)
            console.log(clienteExiste)
            if (!clienteExiste) {
                throw new Error('Ese cliente no existe');
            }
            //Verificar si ese cliente pertenece al vendedor
            if (clienteExiste.vendedor.toString() !== ctx.usuario.id){
                throw new Error("No tiene las credenciales para ese cliente!!!")
            }
            //Verificar que haya suficiente stock para vender
            for await (const articulo of input.pedido){
                const { id } = articulo;
                const producto = await Producto.findById(id);
                if (articulo.cantidad > producto.existencia){
                    throw new Error("No existe la cantidad que quiere pedir.");
                } else {
                    //Restar la cantida que pedios del inventario
                    producto.stock = producto.stock - articulo.cantidad;
                    await producto.save();
                }
            }
            //Crear un nuevo pedido
            const nuevoPedido =
                new Pedido(input)
            //Asignarle un vendedor
            nuevoPedido.vendedor = ctx.usuario.id;
            //Guardar el pedido en la Base de Datos
            const resultado =  await nuevoPedido.save();
            return resultado.populate('cliente');
        }
    }
};
module.exports = resolvers;