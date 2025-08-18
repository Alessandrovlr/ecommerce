import { useState } from 'react';
import { z } from 'zod';

// Esquema de validação com Zod
const produtoSchema = z.object({
  nome_produto: z.string().min(3, { message: "O nome do produto deve ter pelo menos 3 caracteres." }),
  descricao: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }),
  preco: z.number().positive({ message: "O preço deve ser um número positivo." }),
  estoque: z.number().int().nonnegative({ message: "O estoque deve ser um número inteiro não negativo." }),
  imagem: z.string().url({ message: "O link da imagem deve ser uma URL válida." }),
});

export const CadastroProdutos = () => {
  const [nome_produto, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagem, setImagem] = useState('');

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setSuccessMessage('');

    // Converter preco e estoque para números
    const precoNum = parseFloat(preco);
    const estoqueNum = parseInt(estoque);

    // Validação zod
    const result = produtoSchema.safeParse({ nome_produto, descricao, preco: precoNum, estoque: estoqueNum, imagem });

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        nome_produto: formatted.nome_produto?._errors[0],
        descricao: formatted.descricao?._errors[0],
        preco: formatted.preco?._errors[0],
        estoque: formatted.estoque?._errors[0],
        imagem: formatted.imagem?._errors[0],
      });
      return;
    }

    // Enviar para a API
    try {
      const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome_produto,
          descricao,
          preco: precoNum,
          estoque: estoqueNum,
          imagem,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        setServerError(`Erro ao cadastrar produto: ${text}`);
        return;
      }

      const data = await response.json();

      setSuccessMessage(`Produto "${data.nome_produto}" cadastrado com sucesso!`);
      // Limpar formulário
      setNome('');
      setDescricao('');
      setPreco('');
      setEstoque('');
      setImagem('');
    } catch (error) {
      setServerError('Erro na comunicação com o servidor.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-white text-center">Cadastro de Produtos</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Produto</label>
            <input
              type="text"
              value={nome_produto}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Nome do produto"
            />
            {errors.nome_produto && <p className="text-red-400 text-sm mt-2">{errors.nome_produto}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
              placeholder="Descrição detalhada do produto"
            />
            {errors.descricao && <p className="text-red-400 text-sm mt-2">{errors.descricao}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Ex: 49.90"
            />
            {errors.preco && <p className="text-red-400 text-sm mt-2">{errors.preco}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Estoque</label>
            <input
              type="number"
              min="0"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Quantidade em estoque"
            />
            {errors.estoque && <p className="text-red-400 text-sm mt-2">{errors.estoque}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Link da Imagem</label>
            <input
              type="url"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.imagem && <p className="text-red-400 text-sm mt-2">{errors.imagem}</p>}
          </div>

          {serverError && <p className="text-red-500 text-center">{serverError}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <button
            type="submit"
            className="w-full px-4 py-3 mt-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Cadastrar Produto
          </button>
        </form>
      </div>
    </div>
  );
};
