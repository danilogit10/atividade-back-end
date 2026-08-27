import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios'
    });
  }

  const userExists = await userModel.findByEmail(email);

  if (userExists) {
    return res.status(400).json({
      message: 'Email já cadastrado'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create(
    email,
    hashedPassword
  );

  res.status(201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: 'Credenciais inválidas'
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return res.status(401).json({
      message: 'Credenciais inválidas'
    });
  }

  const token = jwt.sign(
    { id: user.id_usuarios },
    'minha-chave-secreta',
    { expiresIn: '1h' }
  );

  res.json({
    token
  });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.update(
    id,
    email,
    hashedPassword
  );

  if (!user) {
    return res.status(404).json({
      message: 'Usuário não encontrado'
    });
  }

  res.json(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.remove(id);

  if (!user) {
    return res.status(404).json({
      message: 'Usuário não encontrado'
    });
  }

  res.json({
    message: 'Usuário excluído com sucesso'
  });
};

export default {
  register,
  login,
  update,
  remove
};
