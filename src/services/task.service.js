const Task = require('../models/Task');

class TaskService {

  // Lista de tarefas do usuário
  async list(userId) {
    return Task.find({ usuario: userId })
      .sort({ createdAt: -1 });
  }

  // Criar nova tarefa
  async create(data, userId) {
    return Task.create({
      titulo: data.titulo,
      descricao: data.descricao,
      usuario: userId
    });
  }

  // Detalhe da tarefa
  async findById(id, userId) {
    const task = await Task.findOne({ _id: id, usuario: userId });
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }
    return task;
  }

  // Atualizar tarefa
  async update(id, data, userId) {
    const task = await Task.findOneAndUpdate(
      { _id: id, usuario: userId },
      {
        titulo: data.titulo,
        descricao: data.descricao
      },
      { new: true }
    );

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return task;
  }

  // Marcar como concluída
  async complete(id, userId) {
    const task = await Task.findOneAndUpdate(
      { _id: id, usuario: userId },
      {
        status: 'CONCLUIDA',
        dataConclusao: new Date()
      },
      { new: true }
    );

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return task;
  }

  // Buscar tarefas por título
  async search(titulo, userId) {
    return Task.find({
      usuario: userId,
      titulo: { $regex: titulo, $options: 'i' }
    });
  }

  // Estatísticas
  async stats(userId) {
    const total = await Task.countDocuments({ usuario: userId });
    const concluidas = await Task.countDocuments({
      usuario: userId,
      status: 'CONCLUIDA'
    });
    const pendentes = total - concluidas;

    return {
      total,
      concluidas,
      pendentes
    };
  }

  // Excluir tarefa (opcional)
  async remove(id, userId) {
    const task = await Task.findOneAndDelete({
      _id: id,
      usuario: userId
    });

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return true;
  }

}

module.exports = new TaskService();