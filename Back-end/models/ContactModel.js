const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // Opcional se quiser vincular a um usuário
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
