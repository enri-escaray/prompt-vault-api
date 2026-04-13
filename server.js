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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
