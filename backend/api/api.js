  import pool from '../connection/ConnectionDb.js';
  import express from 'express';

  const app = express();
  app.use(express.json());

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

  // Inicia o servidor
  const PORT = 5173;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });