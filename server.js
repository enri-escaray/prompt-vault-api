const express = require('express')
const app = express()
app.use(express.json()) // poder recibir informacion JSON
const port = 3000

const prompts = [
  { 
    id: 1, 
    rol: "system", 
    contenido: "Eres un asistente virtual para una barbería. Debes responder de forma amable, consultar disponibilidad y agendar turnos." 
  },
  { 
    id: 2, 
    rol: "user", 
    contenido: "Actúa como un experto en Data Science y explícame cómo funciona un perceptrón de manera sencilla." 
  }
];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api/prompts", (req,res) => {
  res.json(prompts)
} )

app.get("/api/prompts/:id", (req, res)=> {
  //Extraemos el ID de la URL usando req.params
  //todo lo que viaja por la URL es texto (String). 
  // Usamos parseInt() para convertir ese texto en un número matemático
  const promptId= parseInt(req.params.id)

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
  const nuevoPrompts = {
    id : prompts.length + 1,
    rol: req.body.rol,
    contenido: req.body.contenido
  }

  //guardamos el prompts en la base de datos temporal
  prompts.push(nuevoPrompts);

  //Responde con un codigo 201(creado) y enviamos el prompts guardado
  res.status(201).json(nuevoPrompts);
})

app.delete("/api/prompts/:id", (req, res) => {
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
});

app.put("/api/prompts/:id", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
