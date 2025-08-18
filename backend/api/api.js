  import pool from '../connection/ConnectionDb.js';
  import express from 'express';
  import cors from 'cors';

  const app = express();
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5173', // ou '*' para permitir todas as origens (não recomendado em produção)
    credentials: true
  }));

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
  app.get('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Produto não encontrado');
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro no metodo get');
    }
  });

  // Rota para criar um novo produto
  app.post('/produtos', async (req, res) => {
    const { nome_produto, descricao, preco, estoque} = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO produtos (nome_produto, descricao, preco, estoque) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome_produto, descricao, preco, estoque]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao metodo post');
    }
  });

  // Rota para atualizar um produto
  app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_produto, preco, descricao } = req.body;
    try {
      const result = await pool.query(
        'UPDATE produtos SET nome_produto = $1, preco = $2, descricao = $3 WHERE id = $4 RETURNING *',
        [nome_produto, preco, descricao, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send('Produto não encontrado');
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar produto');
    }
  });

  // Rota para deletar um produto
  app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
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
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// POST novo usuário
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario } = req.body;

    const result = await pool.query(
      `INSERT INTO usuarios 
      (nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [nome, sobrenome, cpf, telefone, endereco, forma_pagamento, email, senha, tipo_usuario]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// DELETE usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM usuarios WHERE id_usuario = $1", [id]);
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
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

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});