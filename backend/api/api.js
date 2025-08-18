import pool from '../connection/ConnectionDb.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Rota para criar um novo produto. O campo 'imagem' agora espera uma URL.
app.post('/produtos', async (req, res) => {
  const { nome_produto, descricao, preco, estoque, imagem } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO produtos (nome_produto, descricao, preco, estoque, imagem) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome_produto, descricao, preco, estoque, imagem]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir produto:', error);
    res.status(500).send('Erro ao metodo post');
  }
});

// Rota para listar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao listar produtos metodo get');
  }
});

// Rota para buscar um produto por ID
app.get('/produtos/:id_produto', async (req, res) => {
  const { id_produto } = req.params;
  try {
    const result = await pool.query('SELECT * FROM produtos WHERE id_produto = $1', [id_produto]);
    if (result.rows.length === 0) {
      return res.status(404).send('Produto não encontrado');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no metodo get');
  }
});

// Rota para atualizar um produto. O campo 'imagem' agora espera uma URL.
app.put('/produtos/:id_produto', async (req, res) => {
  const { id_produto } = req.params;
  const { nome_produto, descricao, preco, estoque, imagem } = req.body;

  try {
    const result = await pool.query(
      'UPDATE produtos SET nome_produto = COALESCE($1, nome_produto), descricao = COALESCE($2, descricao), preco = COALESCE($3, preco), estoque = COALESCE($4, estoque), imagem = COALESCE($5, imagem) WHERE id_produto = $6 RETURNING *',
      [nome_produto, descricao, preco, estoque, imagem, id_produto]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Produto não encontrado');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).send('Erro ao atualizar produto. Verifique se os dados estão corretos.');
  }
});

// Rota para deletar um produto
app.delete('/produtos/:id_produto', async (req, res) => {
  const { id_produto } = req.params;
  try {
    const result = await pool.query('DELETE FROM produtos WHERE id_produto = $1 RETURNING *', [id_produto]);
    if (result.rows.length === 0) {
      return res.status(404).send('Produto não encontrado');
    }
    res.send('Produto deletado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar produto');
  }
});

//========================USUARIOS==============================================================
// Rotas de usuários
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao listar os usuarios no metodo get');
    }
});


app.get('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (result.rows.length === 0) {
            return res.status(404).send('Usuario não encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no metodo get');
    }
});

app.post('/usuarios', async (req, res) => {
    const { nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        res.status(500).send('Erro ao criar usuário. Verifique se todos os campos estão preenchidos corretamente.');
    }
});

app.put('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nome = COALESCE($1, nome), sobrenome = COALESCE($2, sobrenome), cpf = COALESCE($3, cpf), telefone = COALESCE($4, telefone), endereco = COALESCE($5, endereco), forma_pagamento = COALESCE($6, forma_pagamento), email = COALESCE($7, email), senha = COALESCE($8, senha), tipo_usuario = COALESCE($9, tipo_usuario) WHERE id_usuario = $10 RETURNING *',
            [nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario, id_usuario]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).send('Erro ao atualizar usuário. Verifique se os dados estão corretos.');
    }
});

app.delete('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id_usuario]);
        if (result.rows.length === 0) {
            return res.status(404).send('usuario não encontrado');
        }
        res.send('usuario deletado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar usuario');
    }
});

//==============================LOGIN===========================================================
app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE nome = $1 AND senha = $2',
      [nome, senha]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const usuarioEncontrado = result.rows[0];

    // Retorna dados essenciais, sem a senha
    res.json({
      id: usuarioEncontrado.id_usuario,  // ajuste conforme sua coluna de id
      nome: usuarioEncontrado.nome,
      role: usuarioEncontrado.tipo_usuario // ou outra coluna que representa o papel
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});




// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}🚀`);
});
