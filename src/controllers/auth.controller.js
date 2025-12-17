const AuthService = require('../services/auth.service');

class AuthController {

  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const user = await AuthService.register(nome, email, senha);
      return res.status(201).json(user);

    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const result = await AuthService.login(email, senha);
      return res.json(result);

    } catch (error) {
      return res.status(401).json({
        error: error.message
      });
    }
  }

  async me(req, res) {
    try {
      const userId = req.userId;

      const user = await AuthService.me(userId);
      return res.json(user);

    } catch (error) {
      return res.status(404).json({
        error: error.message
      });
    }
  }
}

module.exports = new AuthController();