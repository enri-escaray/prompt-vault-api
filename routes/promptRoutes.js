const express = require("express");
const router = express.Router(); // creamos un mini enrutador

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
router.get("/", obtenerTodosLosPrompts);
router.get("/:id", obtenerPromptPorId);
router.post("/", crearPrompt);
router.put("/:id", actualizarPrompt);
router.delete("/:id", eliminarPrompt);

// 3. Exportamos el enrutador para que server.js lo pueda usar
module.exports = router;