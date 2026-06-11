const Prompt = require("../models/Prompt")

// Definimos la función que contiene la lógica de nuestro GET principal
const obtenerTodosLosPrompts = async (req, res) => {
  try {
  // le pedimos a mongoose que busque TODOS los documentos en BD
  //y usamos await para que el servidor no se congele mientras espera
    const prompts = await Prompt.find();
    res.json(prompts);
  }catch (error) {
    res.status(500).json({mensaje: "Error al obtener los prompts de la BD" });
  }
};

const obtenerPromptPorId = async(req, res) => {
  try{
    const promptId= req.params.id;

    // 2. Le pedimos a Mongoose que busque exactamente ese ID en la nube
    const promptEncontrado = await Prompt.findById(promptId);

    if(!promptEncontrado) {
      //si no lo encuentra se responde con el error 404 (not found)
      return res.status(404).json({mensaje: "El prompt solicitado no existe en la base de datos"})

    }
    res.json(promptEncontrado);
  } catch (error) {
    // Si el usuario envía un ID con formato inválido (ej. muy corto), MongoDB lanzará un error y caeremos aquí
    res.status(500).json({mensaje: "Error de formato o conexion al buscar el prompt", detalles: error.message});

  }
};

const crearPrompt = async (req, res) => {
  try {
    //le pasamos a mongose los datos que llegaron al cuerpo (req.body)
    //mongoose automaticamente verificara que cumplan con las reglas de Schema
    const nuevoPrompt = await Prompt.create({
      rol: req.body.rol,
      contenido: req.body.contenido
    });

    //2. respondemos con el codigo 201 (creado) y mostramos el doc final
    res.status(201).json(nuevoPrompt);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al guardar en la base de datos",
      detalles: error.message
    });
  }
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
};

const actualizarPrompt = async(req, res) => {
  try{
    const promptId = req.params.id;

    // findByIdAndUpdate toma 3 parámetros: El ID, la nueva información, y configuraciones extra
    const promptActualizado = await Prompt.findByIdAndUpdate(
      promptId,
      {
        rol: req.body.rol,
        contenido: req.body.contenido
      },

      // { new: true } obliga a Mongoose a devolverte el objeto ya modificado (por defecto devuelve el viejo)
      // { runValidators: true } obliga a revisar que no estén intentando mandar campos vacíos
      {new: true, runValidators: true}

    );

    if (!promptActualizado){
      return res.status(404).json({mensaje: "Error al actualizar: el prompt no existe"});
    }

    res.json({
      mensaje: "Prompt actualizado ",
      prompt: promptActualizado
    }
    );
  }catch (error){
    res.status(500).json({mensaje: "Error de formato o conexion al actualizar", detalles: error.message });

  }};

const eliminarPrompt = async(req, res) => {
  try{
    const promptId = req.params.id;

    // Mongoose busca el ID y lo demuele directamente en la base de datos
    const promptBorrado = await Prompt.findByIdAndDelete(promptId);

    if (!promptBorrado){
      return res.status(404).json({mensaje: "Error al borrar: el prompt no existe"});

    }
    res.json({
      mensaje: "Prompt eliminado con exito",
      prompt_eliminado: promptBorrado
    });
  }catch (error){
    res.status(500).json({mensaje: "Error de formato o conexion al eliminar", detalles: error.message});
  }
};


// En Node.js, si queremos que otros archivos (como server.js) 
// puedan usar estas funciones, tenemos que exportarlas al final del archivo:
module.exports = {
  obtenerTodosLosPrompts,
  obtenerPromptPorId,
  crearPrompt,
  actualizarPrompt,
  eliminarPrompt
};