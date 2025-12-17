const TaskService = require('../services/task.service');

class TaskController {

  // GET /tasks
  async list(req, res) {
    try {
      const tasks = await TaskService.list(req.userId);
      return res.json(tasks);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST /tasks
  async create(req, res) {
    try {
      const task = await TaskService.create(req.body, req.userId);
      return res.status(201).json(task);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET /tasks/:id
  async findById(req, res) {
    try {
      const task = await TaskService.findById(req.params.id, req.userId);
      return res.json(task);

    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT /tasks/:id
  async update(req, res) {
    try {
      const task = await TaskService.update(
        req.params.id,
        req.body,
        req.userId
      );
      return res.json(task);

    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PATCH /tasks/:id/complete
  async complete(req, res) {
    try {
      const task = await TaskService.complete(
        req.params.id,
        req.userId
      );
      return res.json(task);

    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  // GET /tasks/search
  async search(req, res) {
    try {
      const { titulo } = req.query;

      const tasks = await TaskService.search(titulo, req.userId);
      return res.json(tasks);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET /tasks/stats
  async stats(req, res) {
    try {
      const stats = await TaskService.stats(req.userId);
      return res.json(stats);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE /tasks/:id
  async remove(req, res) {
    try {
      await TaskService.remove(req.params.id, req.userId);
      return res.status(204).send();

    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

}

module.exports = new TaskController();
