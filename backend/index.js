const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Importar o modelo de usuário

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = 'mongodb+srv://davicontatoedits:AIPUHe8dhX9J9jdN@cluster0.pfri7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.log(err));

// Rota de registro
app.post('/register', async (req, res) => {
    try {
      console.log('Requisição de registro recebida:', req.body);
      const { username, password } = req.body;
      // Lógica de registro
      console.log('Usuário registrado com sucesso');
      res.status(200).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ message: 'Erro ao registrar' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      console.log('Requisição de login recebida:', req.body);
      const { username, password } = req.body;
      // Lógica de login
      console.log('Usuário autenticado com sucesso');
      res.status(200).json({ message: 'Usuário autenticado com sucesso' });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: 'Erro ao fazer login' });
    }
  });
  

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
