import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../model/userModel.js';


// ==========================
// CADASTRO
// ==========================
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


// ==========================
// LOGIN
// ==========================
const login = async (req, res) => {

  const { email, password } = req.body;

  // Verifica se email e senha foram enviados
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios'
    });
  }

  // Procura o usuário pelo email
  const user = await userModel.findByEmail(email);

  // Se não encontrar o usuário
  if (!user) {
    return res.status(401).json({
      message: 'Credenciais inválidas'
    });
  }

  // Compara a senha digitada com a senha criptografada
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  // Se a senha estiver errada
  if (!validPassword) {
    return res.status(401).json({
      message: 'Credenciais inválidas'
    });
  }

  // ==========================
  // CRIAÇÃO DO TOKEN JWT
  // ==========================
  const token = jwt.sign(
    {
      id: user.id_usuarios
    },
    'minha-chave-secreta',
    {
      expiresIn: '1h'
    }
  );

  // Envia o token para o frontend
  res.status(200).json({
    message: 'Login realizado com sucesso',
    token: token
  });
};


// ==========================
// ATUALIZAR USUÁRIO
// ==========================
const update = async (req, res) => {

  const { id } = req.params;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios'
    });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

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


// ==========================
// EXCLUIR USUÁRIO
// ==========================
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


// ==========================
// EXPORTAÇÃO
// ==========================
export default {
  register,
  login,
  update,
  remove
};