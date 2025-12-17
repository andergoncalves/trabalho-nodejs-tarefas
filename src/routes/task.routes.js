const express = require('express');
const TaskController = require('../controllers/task.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas abaixo exigem login
router.use(authMiddleware);

// Lista de tarefas
router.get('/', TaskController.list);

// Nova tarefa
router.post('/', TaskController.create);

// Buscar tarefas
router.get('/search', TaskController.search);

// Estatísticas
router.get('/stats', TaskController.stats);

// Detalhe da tarefa
router.get('/:id', TaskController.findById);

// Editar tarefa
router.put('/:id', TaskController.update);

// Marcar como concluída
router.patch('/:id/complete', TaskController.complete);

// Excluir tarefa (opcional)
router.delete('/:id', TaskController.remove);

module.exports = router;