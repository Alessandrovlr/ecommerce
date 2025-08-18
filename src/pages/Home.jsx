import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cors from 'cors'; 

// Exemplo de dados de produtos para visualização sem o backend
// Substitua este array pela chamada da sua API
const mockProducts = [
  {
    id: 1,
    nome_produto: "Camiseta Homem de Ferro",
    descricao: "Camiseta de alta qualidade com estampa do Homem de Ferro.",
    preco: 49.90,
    estoque: 15,
    imagem: "https://placehold.co/400x400/000000/FFFFFF?text=Homem+de+Ferro",
  },
  {
    id: 2,
    nome_produto: "Boneco Funko Pop Thanos",
    descricao: "Boneco colecionável do vilão Thanos, com a manopla do infinito.",
    preco: 129.50,
    estoque: 5,
    imagem: "https://placehold.co/400x400/5A2D5E/FFFFFF?text=Thanos+Funko",
  },
  {
    id: 3,
    nome_produto: "Caneca Capitão América",
    descricao: "Caneca de cerâmica com escudo do Capitão América.",
    preco: 29.90,
    estoque: 20,
    imagem: "https://placehold.co/400x400/003399/FFFFFF?text=Capitão+América",
  },
  {
    id: 4,
    nome_produto: "Mochila Thor",
    descricao: "Mochila resistente com martelo do Thor.",
    preco: 150.00,
    estoque: 8,
    imagem: "https://placehold.co/400x400/808080/FFFFFF?text=Mochila+Thor",
  },
  {
    id: 5,
    nome_produto: "Chaveiro Viúva Negra",
    descricao: "Chaveiro temático da Viúva Negra.",
    preco: 19.90,
    estoque: 30,
    imagem: "https://placehold.co/400x400/B80000/FFFFFF?text=Viúva+Negra",
  },
  {
    id: 6,
    nome_produto: "Mousepad Hulk",
    descricao: "Mousepad grande com estampa do Hulk esmagando.",
    preco: 35.00,
    estoque: 10,
    imagem: "https://placehold.co/400x400/4CAF50/FFFFFF?text=Hulk",
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
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
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
          <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative">
              {/* O `src` da imagem deve ser a coluna 'imagem' do seu banco de dados */}
              {/* Usando um placeholder como fallback caso a URL da imagem esteja vazia ou inválida */}
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
                <Link to={`/carrinho/${product.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Adicionar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* O link para o carrinho agora está em cada produto, mas você pode
      adicionar um link geral se necessário, como a sua versão anterior. */}
      {/* <Link to="/carrinho" className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition">
        Compras
      </Link> */}
    </div>
  );
};
