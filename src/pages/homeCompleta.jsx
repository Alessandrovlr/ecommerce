import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeCompleta() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome_produto: "",
    descricao: "",
    preco: "",
    estoque: "",
  });

  const baseURL = "http://localhost:3000"; // sua API

  // Buscar todos os produtos
  const getProdutos = async () => {
    try {
      const response = await axios.get(`${baseURL}/produtos`);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Criar um novo produto
  const criarProduto = async () => {
    try {
      await axios.post(`${baseURL}/produtos`, novoProduto);
      setNovoProduto({ nome_produto: "", descricao: "", preco: "", estoque: "" });
      getProdutos();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  // Atualizar um produto
  const atualizarProduto = async (id, produtoAtualizado) => {
    try {
      await axios.put(`${baseURL}/produtos/${id}`, produtoAtualizado);
      getProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  // Deletar um produto
  const deletarProduto = async (id) => {
    try {
      await axios.delete(`${baseURL}/produtos/${id}`);
      getProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Produtos</h1>

      {/* Formulário para criar produto */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={novoProduto.nome_produto}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome_produto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <input
          type="number"
          placeholder="Estoque"
          value={novoProduto.estoque}
          onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
        />
        <button onClick={criarProduto}>Adicionar</button>
      </div>

      {/* Lista de produtos */}
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>
            {p.nome_produto} - R${p.preco} ({p.estoque} unid.)
            <button onClick={() => deletarProduto(p.id)}>Excluir</button>
            <button
              onClick={() =>
                atualizarProduto(p.id, {
                  ...p,
                  nome_produto: p.nome_produto + " (Atualizado)",
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
