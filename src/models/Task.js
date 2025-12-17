const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },

  descricao: {
    type: String,
    trim: true
  },

  status: {
    type: String,
    enum: ['PENDENTE', 'CONCLUIDA'],
    default: 'PENDENTE'
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  dataConclusao: {
    type: Date
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
