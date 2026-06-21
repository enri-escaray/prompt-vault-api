const express = require("express");
const router = express.Router(); // creamos un mini enrutador
const verificarToken = require('../middleware/authMiddleware');

// 1. Importamos el "trabajador" (la función) desde nuestra carpeta controllers
// Usamos '../' para salir de la carpeta routes y poder entrar a controllers
const {
  obtenerTodosLosPrompts, 
  obtenerPromptPorId, 
  crearPrompt, 
  actualizarPrompt, 
  eliminarPrompt
} = require("../controllers/promptController");

// 2. Definimos la ruta y le asignamos su trabajador
// ¡OJO!: Aquí ponemos solo '/' en lugar de '/api/prompts'. 
// Más adelante verás por qué esto hace que el código sea súper escalable.

/**
 * @swagger
 * /api/prompts:
 *   get:
 *     summary: Obtiene todos los prompts de la bóveda
 *     description: Devuelve un arreglo con todos los documentos de prompts almacenados en la base de datos de MongoDB.
 *     tags:
 *       - Prompts
 *     responses:
 *       200:
 *         description: Lista de prompts obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: El ID generado automáticamente por MongoDB
 *                   rol:
 *                     type: string
 *                     description: El rol del prompt (ej. system, user)
 *                   contenido:
 *                     type: string
 *                     description: El contenido o texto del prompt
 */
router.get('/', obtenerTodosLosPrompts);

/**
 * @swagger
 * /api/prompts/{id}:
 *   get:
 *     summary: Obtiene un prompt específico por su ID
 *     tags:
 *       - Prompts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del prompt generado por MongoDB
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt encontrado con éxito
 *       404:
 *         description: El prompt no existe en la base de datos
 */
router.get("/:id", obtenerPromptPorId);

/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Crea un nuevo prompt
 *     tags:
 *       - Prompts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rol
 *               - contenido
 *             properties:
 *               rol:
 *                 type: string
 *                 description: "El rol del prompt (ejemplo: system, user)"
 *               contenido:
 *                 type: string
 *                 description: "El texto del prompt"
 *     responses:
 *       201:
 *         description: "Prompt creado exitosamente"
 */
router.post("/", verificarToken ,crearPrompt);

/**
 * @swagger
 * /api/prompts/{id}:
 *   put:
 *     summary: Actualizar un nuevo prompt
 *     tags:
 *       - Prompts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del prompt generado por MongoDB
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rol
 *               - contenido
 *             properties:
 *               rol:
 *                 type: string
 *                 description: "El rol del prompt (ejemplo: system, user)"
 *               contenido:
 *                 type: string
 *                 description: "El texto del prompt"
 *     responses:
 *       200:
 *         description: "Prompt actualizado exitosamente"
 */
router.put("/:id", verificarToken ,actualizarPrompt);

/**
 * @swagger
 * /api/prompts/{id}:
 *   delete:
 *     summary: Elimina un prompt especifico por su ID
 *     tags:
 *       - Prompts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del prompt
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt eliminado
 *       404:
 *         description: El prompt no existe en la base de datos
 */
router.delete("/:id", verificarToken ,eliminarPrompt);

// 3. Exportamos el enrutador para que server.js lo pueda usar
module.exports = router;