import { useState } from "react";
import { z } from "zod";

// Esquema de validação com zod
const productSchema = z.object({
  nome: z.string().min(3, { message: "O nome do produto deve ter pelo menos 3 caracteres." }),
  descricao: z.string().min(5, { message: "A descrição deve ter pelo menos 5 caracteres." }),
  preco: z.number().min(0.01, { message: "O preço deve ser maior que zero." }),
  estoque: z.number().int().min(0, { message: "O estoque não pode ser negativo." }),
  imagem: z.string().url({ message: "Deve ser uma URL válida." }),
});

export const CadastroProdutos = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [imagem, setImagem] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    // Converter preco e estoque para números
    const precoNum = parseFloat(preco);
    const estoqueNum = parseInt(estoque);

    const result = productSchema.safeParse({
      nome,
      descricao,
      preco: precoNum,
      estoque: estoqueNum,
      imagem,
    });

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        nome: formatted.nome?._errors[0],
        descricao: formatted.descricao?._errors[0],
        preco: formatted.preco?._errors[0],
        estoque: formatted.estoque?._errors[0],
        imagem: formatted.imagem?._errors[0],
      });
      return;
    }

    // Aqui você pode fazer o envio para backend, API ou localStorage

    setSuccessMessage("Produto cadastrado com sucesso!");
    setNome("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setImagem("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-100">
          Cadastro de Produto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Produto
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Digite o nome do produto"
            />
            {errors.nome && <p className="text-red-400 text-sm mt-2">{errors.nome}</p>}
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
              placeholder="Digite a descrição do produto"
              rows={4}
            />
            {errors.descricao && <p className="text-red-400 text-sm mt-2">{errors.descricao}</p>}
          </div>

          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-300 mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Digite o preço"
            />
            {errors.preco && <p className="text-red-400 text-sm mt-2">{errors.preco}</p>}
          </div>

          <div>
            <label htmlFor="estoque" className="block text-sm font-medium text-gray-300 mb-2">
              Estoque
            </label>
            <input
              type="number"
              id="estoque"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              min="0"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Quantidade em estoque"
            />
            {errors.estoque && <p className="text-red-400 text-sm mt-2">{errors.estoque}</p>}
          </div>

          <div>
            <label htmlFor="imagem" className="block text-sm font-medium text-gray-300 mb-2">
              Link da Imagem
            </label>
            <input
              type="text"
              id="imagem"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="URL da imagem do produto"
            />
            {errors.imagem && <p className="text-red-400 text-sm mt-2">{errors.imagem}</p>}
          </div>

          {successMessage && <p className="text-green-400 text-center font-semibold">{successMessage}</p>}

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
