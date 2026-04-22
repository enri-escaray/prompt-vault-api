const fs = require("fs");
const express = require('express')
const app = express()
app.use(express.json()) // poder recibir informacion JSON
const port = 3000

// Funciones Auxiliares para manejar el archivo físico
function leerBoveda(){
  const datosTexto = fs.readFileSync("boveda.json", "utf-8");
  return JSON.parse(datosTexto);
}

function guardarBoveda(datos){
  // JSON.stringify traduce de JavaScript a texto. 
  // El 'null, 2' es un truco profesional para que el archivo
  // .json se guarde con tabulaciones ordenadas y
  //  no en una sola línea ilegible.
  const textoGuardar = JSON.stringify(datos, null, 2);

  //fs.writeFileSync es el hermano de readFileSync. 
  //Toma la ruta del archivo y el texto que quieres inyectarle.
  fs.writeFileSync("boveda.json", textoGuardar);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api/prompts", (req,res) => {
  const prompts = leerBoveda();

  res.json(prompts);
} )

app.get("/api/prompts/:id", (req, res)=> {
  //Extraemos el ID de la URL usando req.params
  //todo lo que viaja por la URL es texto (String). 
  // Usamos parseInt() para convertir ese texto en un número matemático
  const promptId= parseInt(req.params.id)

  const prompts = leerBoveda();
  // .find() es un método de JavaScript que recorre el arreglo uno por uno
  //buscamos el prompt que coincida con ese id
  const promptEncontrado = prompts.find(prompt => prompt.id === promptId)

  //manejo de errores
  // id inexistente
  if(!promptEncontrado) {
    //si no lo encuentra se responde con el error 404 (not found)
    return res.status(404).json({mensaje: "El prompt solicitado no existe en la base de datos"})

  }
  res.json(promptEncontrado);
})

app.post("/api/prompts", (req, res) => {
  const prompts = leerBoveda();

  const nuevoPrompts = {
    id : prompts.length + 1,
    rol: req.body.rol,
    contenido: req.body.contenido
  }

  //guardamos el prompts en la base de datos temporal
  prompts.push(nuevoPrompts);

  guardarBoveda(prompts)

  //Responde con un codigo 201(creado) y enviamos el prompts guardado
  res.status(201).json(nuevoPrompts);
})

app.delete("/api/prompts/:id", (req, res) => {
  const prompts = leerBoveda();
  //extraemos el id y lo convertimos a tipo int
  const promptId = parseInt(req.params.id);

  //buscamos la posicion del prompt
  const indice = prompts.findIndex(prompt => promptId === prompt.id)

  if(indice === -1){
    return res.status(404).json({mensaje: "Error al borrar: el prompt no existe"})
  }

  //aqui decimos que en el lugar del indice borre un dato
  const promptBorrado = prompts.splice(indice, 1);
  res.json({
    mensaje: "Prompt eliminado de la boveda con exito",
    prompt_eliminado: promptBorrado[0]
  });
  guardarBoveda(prompts)
});

app.put("/api/prompts/:id", (req, res) => {
  const prompts = leerBoveda();
  const promptId = parseInt(req.params.id);
  const promptEncontrado = prompts.find(prompt => promptId === prompt.id);

  if(!promptEncontrado){
    return res.status(404).json({mensaje: "Error al actualizar: el prompt no existe"});
  }

  // 3. Si existe, sobrescribimos sus propiedades con la nueva información que llega en req.body
  // Usamos el operador lógico || (OR) para que, si el usuario olvida enviar algún campo, se conserve el valor viejo
  promptEncontrado.rol = req.body.rol || promptEncontrado.rol;
  promptEncontrado.contenido = req.body.contenido || promptEncontrado.contenido;

  res.json({
    mensaje: "Prompt actualizado con exito",
    prompt: promptEncontrado
  });

  guardarBoveda(prompts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
