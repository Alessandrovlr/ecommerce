import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cors from 'cors'; 
import axios from 'axios';

// Exemplo de dados de produtos para visualização sem o backend
// Substitua este array pela chamada da sua API
const mockProducts = [
  {
    id_produto: 1, // Corrigido para 'id_produto' para consistência
    nome_produto: "Camiseta Homem de Ferro",
    descricao: "Camiseta de alta qualidade com estampa do Homem de Ferro.",
    preco: 49.90,
    estoque: 15,
    imagem: "https://images.unsplash.com/photo-1627845348873-10e9f65c1926?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1080&fit=max",
  },
  {
    id_produto: 2,
    nome_produto: "Boneco Funko Pop Thanos",
    descricao: "Boneco colecionável do vilão Thanos, com a manopla do infinito.",
    preco: 129.50,
    estoque: 5,
    imagem: "https://images.unsplash.com/photo-1627447477610-8d51b3f96f9a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1080&fit=max",
  },
  {
    id_produto: 3,
    nome_produto: "Caneca Capitão América",
    descricao: "Caneca de cerâmica com escudo do Capitão América.",
    preco: 29.90,
    estoque: 20,
    imagem: "https://images.unsplash.com/photo-1627850849206-a537f86f7f6f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1080&fit=max",
  },
  {
    id_produto: 4,
    nome_produto: "Mochila Thor",
    descricao: "Mochila resistente com martelo do Thor.",
    preco: 150.00,
    estoque: 8,
    imagem: "https://images.unsplash.com/photo-1627845350352-78d2b2f6b8c9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1080&fit=max",
  },
  {
    id_produto: 5,
    nome_produto: "Chaveiro Viúva Negra",
    descricao: "Chaveiro temático da Viúva Negra.",
    preco: 19.90,
    estoque: 30,
    imagem: "https://images.unsplash.com/photo-1627447477610-8d51b3f96f9a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1080&fit=max",
  },
  {
    id_produto: 6,
    nome_produto: "Mousepad Hulk",
    descricao: "Mousepad grande com estampa do Hulk esmagando.",
    preco: 35.00,
    estoque: 10,
    imagem: "https://images.unsplash.com/photo-1627845348873-10e9f65c1926?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1080&fit=max",
  },
];


export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para buscar os produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos');
        setProducts(response.data);
        setError(null);
      } catch (e) {
        // Se a requisição falhar, usamos os dados mockados
        console.error("Erro ao buscar produtos do backend. Usando dados mockados...", e);
        setError("Não foi possível carregar os produtos do servidor. Exibindo dados de exemplo.");
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">Nossos Produtos</h1>
      {error && (
        <div className="bg-red-500 text-white text-center p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id_produto} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative">
              {/* O `src` da imagem agora é diretamente a URL completa retornada do backend */}
              <img
                src={product.imagem || "https://placehold.co/400x400/374151/FFFFFF?text=Imagem+indisponível"}
                alt={product.nome_produto}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 bg-gray-900 text-white text-sm font-semibold px-2 py-1 rounded-full">
                {product.estoque > 0 ? `Estoque: ${product.estoque}` : 'Esgotado'}
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold text-white mb-2">{product.nome_produto}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{product.descricao}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-green-400">
                  R$ {parseFloat(product.preco).toFixed(2)}
                </span>
                <Link to={`/carrinho/${product.id_produto}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Adicionar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
