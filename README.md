# Boveda de Prompts API

Este es un proyecto en el que desarrollé una API RESTful robusta y segura para la gestión, almacenamiento y organización de Prompts de Inteligencia Artificial. Toda la arquitectura está construida con Node.js y cuenta con un sistema de seguridad basado en tokens JWT.

[Puedes probar la API en vivo aquí](https://mi-boveda-api.onrender.com/api-docs/) (Documentación interactiva con Swagger).

---

## Tecnologias Utilizadas

Para este desarrollo implementé las siguientes herramientas:

* Backend: Node.js, Express.js
* Base de Datos: MongoDB, Mongoose
* Seguridad: JSON Web Tokens (JWT), Bcryptjs (Cifrado de contraseñas)
* Documentacion: Swagger UI Express
* Despliegue: Render

---

## Caracteristicas Principales

* Autenticacion Segura: Diseñé un sistema de registro y login que encripta las contraseñas antes de guardarlas en la base de datos.
* Rutas Protegidas: Implementé un middleware de seguridad que intercepta y verifica tokens JWT para asegurar que solo los usuarios autorizados puedan alterar la información.
* Operaciones CRUD Completas: La API permite crear, leer, actualizar y eliminar prompts de forma eficiente.
* Developer Experience (DX): Integré documentación completa e interactiva mediante Swagger, permitiendo a otros desarrolladores probar los endpoints directamente desde el navegador sin depender de herramientas externas.
* Integridad de Datos: Agregué validaciones a nivel de esquema en la base de datos para prevenir registros duplicados y manejar errores de servidor de forma controlada.

---

## Instalacion y Uso Local

Si deseas correr este proyecto en tu entorno local para revisarlo a profundidad, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/TU_USUARIO/prompt-vault-api.git](https://github.com/TU_USUARIO/prompt-vault-api.git)
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y agrega las credenciales necesarias:
   ```env
   PORT=3000
   MONGO_URI= tu_cadena_de_conexion_de_mongodb en mi caso use MONGOATLAS (https://www.mongodb.com/)
   JWT_SECRET= tu_firma_secreta (Por ej: 123495secreto)
   ```

4. Inicia el servidor:
   ```bash
   npm start
   ```
   El servidor estará disponible en `http://localhost:3000` y la documentación interactiva en `http://localhost:3000/api-docs`.

---

## Endpoints Principales

### Autenticacion (Rutas Publicas)
* POST /api/auth/registro - Registra un nuevo usuario en la base de datos.
* POST /api/auth/login - Autentica al usuario y devuelve el token JWT.

### Prompts (Rutas Protegidas)
* GET /api/prompts - Obtiene la lista de todos los prompts (Publico).
* POST /api/prompts - Crea un nuevo prompt en la base de datos.
* PUT /api/prompts/:id - Actualiza los datos de un prompt existente.
* DELETE /api/prompts/:id - Elimina un prompt especifico.

---
Desarrollado por Enrique Orlando Escaray