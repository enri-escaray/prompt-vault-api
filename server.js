require("dotenv").config();
const express = require('express');
const swaggerUI = require(`swagger-ui-express`);
const swaggerJsDoc = require(`swagger-jsdoc`);
const conectarDB = require("./config/db") //conexion a Mongo
conectarDB();
const app = express();
const promptRoutes = require("./routes/promptRoutes");
app.use(express.json()) // poder recibir informacion JSON
const port = process.env.port;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

///

// 1. Configuración básica de Swagger (OpenAPI)
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versión del estándar
    info: {
      title: 'Boveda de Prompts API',
      version: '1.0.0',
      description: 'Documentacion interactiva de la API para gestionar prompts de IA',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor Local'
      },
    ],
  },
  // 2. ¿Dónde debe buscar Swagger nuestros comentarios? En la carpeta de rutas.
  apis: ['./routes/*.js'], 
};

// 3. Generamos las especificaciones y creamos la ruta visible
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

///

app.use("/api/prompts", promptRoutes);

app.listen(port, () => {
  console.log(`Bóveda de Prompts Activa en el puerto ${port}`);
});