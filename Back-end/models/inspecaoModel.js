const mongoose = require('mongoose');

const InspecaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  datahora: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reciclagem: { type: mongoose.Schema.Types.ObjectId, ref: 'Reciclagem', required: true },
});

module.exports = mongoose.model('Inspecao', InspecaoSchema);
