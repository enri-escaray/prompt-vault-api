const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  }
}, { timestamps: true });

// VERSIÓN MODERNA DE MONGOOSE:
// Si usamos 'async', Mongoose se encarga de guardar automáticamente.
// Ya no necesitamos (ni podemos) pasarle la palabra 'next'.
userSchema.pre('save', async function() {
  
  // 1. Si la contraseña es la misma, simplemente salimos de la función con 'return'
  if (!this.isModified('password')) {
    return;
  }
  
  // 2. Si es nueva, la encriptamos y Mongoose continuará automáticamente
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);