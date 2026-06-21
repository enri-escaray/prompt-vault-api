const User = require('../models/User'); 
const bcrypt = require('bcryptjs');     
const jwt = require('jsonwebtoken');    

const registrarUsuario = async (req, res) => {
    try {
        // Extraemos los datos que el usuario nos envió desde el cliente (Thunder Client/Frontend)
        const { username, password } = req.body;

        // 1. Verificamos si el usuario ya existe.
        // Hacemos una consulta a MongoDB buscando alguien con ese exacto nombre.
        const usuarioExistente = await User.findOne({ username });
        
        // Si la base de datos devuelve un documento, significa que el nombre está ocupado.
        if (usuarioExistente) {
            // Retornamos un estado 400 (Petición Incorrecta) y terminamos la ejecución.
            return res.status(400).json({ mensaje: "El nombre de usuario ya está en uso" });
        }

        // 2. Creamos al usuario.
        // Al llamar a create(), Mongoose primero ejecutará el 'pre-save' de User.js
        // encriptará la contraseña y luego guardará el documento final en Atlas.
        const nuevoUsuario = await User.create({ username, password });

        // 3. Enviamos la respuesta de éxito.
        // Retornamos un estado 201 (Creado) y mostramos los datos del usuario omitiendo la contraseña.
        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            usuario: { id: nuevoUsuario._id, username: nuevoUsuario.username }
        });

    } catch (error) {
        // Si hay un error de conexión o un fallo de sintaxis, capturamos el error aquí.
        res.status(500).json({ mensaje: "Error al registrar usuario", detalles: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        // Extraemos las credenciales enviadas
        const { username, password } = req.body;

        // 1. Verificamos la existencia del usuario en la base de datos.
        const usuario = await User.findOne({ username });
        
        // Si no devuelve nada, el usuario no está registrado.
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // 2. Verificamos la contraseña.
        // bcrypt.compare toma el texto plano ('password') y lo procesa para ver si coincide
        // con el hash guardado en la base de datos ('usuario.password'). Devuelve true o false.
        const contraseñaValida = await bcrypt.compare(password, usuario.password);
        
        // Si es false, detenemos el proceso por credenciales inválidas.
        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // 3. Fabricación del Token JWT.
        // jwt.sign requiere 3 cosas: los datos públicos a guardar (payload), la firma secreta, y la configuración.
        const token = jwt.sign(
            { id: usuario._id, username: usuario.username }, // Payload
            process.env.JWT_SECRET,                          // Firma configurada en el archivo .env
            { expiresIn: '1h' }                              // El token será inválido después de 1 hora
        );

        // 4. Enviamos la respuesta de éxito.
        // Devolvemos el mensaje y el token recién generado.
        res.json({
            mensaje: "Login exitoso",
            token: token
        });

    } catch (error) {
        // Captura cualquier error de servidor durante el proceso de login.
        res.status(500).json({ mensaje: "Error al iniciar sesión", detalles: error.message });
    }
};
module.exports = {
    registrarUsuario,
    loginUsuario
};