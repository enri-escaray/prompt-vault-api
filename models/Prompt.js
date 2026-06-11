const mongoose = require("mongoose");

//estructura 
const promptSchema = new mongoose.Schema({
    rol: {
        type: String,
        required: [true, "El rol es obligatorio (ej: system, user, etc)"],
    },
    contenido: {
        type: String,
        required: [true, "El contenido del prompt no puede estar vacio"],
    }
    },
    {
        timestamps: true
    });

    module.exports = mongoose.model("Prompt", promptSchema);