const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {

  async register(nome, email, senha) {

    if (!nome) {
      throw new Error('Nome tem preenchimento obrigatório!');
    }
    
    if (!senha) {
      throw new Error('Senha tem preenchimento obrigatório!');
    }
    
    if (!email) {
      throw new Error('E-mail tem preenchimento obrigatório!');
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error('Usuário já existe');
    }

    const senhaHash = await bcrypt.hash(senha, 8);
    try {
      const user = await User.create({
                                        nome,
                                        email,
                                        senha: senhaHash
                                      }
                                    );
    } catch (error) {
      throw new Error(error);
    } 

    return {
      id: user._id,
      nome: user.nome,
      email: user.email
    };
  }

  async login(email, senha) {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const senhaMatch = await bcrypt.compare(senha, user.senha);
    if (!senhaMatch) {
      throw new Error('Senha inválida');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não definido');
    }

    const token = jwt.sign({
      id: user._id.toString(),
      name: user.nome,
      email: user.email
    },
      process.env.JWT_SECRET,
      { expiresIn: '1d' });

    return {
      user: {
        id: user._id.toString(),
        nome: user.nome,
        email: user.email
      },
      token
    };
  }

  async me(userId) {
    const user = await User.findById(userId).select('-senha');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }
}

module.exports = new AuthService();
