import React from 'react';

// Dados de produtos de exemplo. Em uma aplicação real, estes viriam do seu backend.
const products = [
  {
    id: 1,
    name: 'Capitão América - Escudo de Combate',
    description: 'Réplica fiel do escudo icônico do Capitão América, feito de Vibranium.',
    price: 350.00,
    imageUrl: 'https://placehold.co/400x400/0000FF/FFFFFF?text=Escudo+CA', // Placeholder de imagem
  },
  {
    id: 2,
    name: 'Martelo do Thor - Mjolnir',
    description: 'Réplica do poderoso martelo Mjolnir, forjado nas estrelas.',
    price: 450.00,
    imageUrl: 'https://placehold.co/400x400/808080/FFFFFF?text=Martelo+Thor', // Placeholder de imagem
  },
  {
    id: 3,
    name: 'Armadura do Homem de Ferro - Mark 50',
    description: 'Miniatura detalhada da armadura Mark 50 do Homem de Ferro.',
    price: 280.00,
    imageUrl: 'https://placehold.co/400x400/FF0000/FFFFFF?text=Armadura+IM', // Placeholder de imagem
  },
  {
    id: 4,
    name: 'Batrang do Batman',
    description: 'Réplica do batarang, a arma letal do Batman.',
    price: 120.00,
    imageUrl: 'https://placehold.co/400x400/000000/FFFFFF?text=Batrang', // Placeholder de imagem
  },
];

export const Home = () => {
  return (
    <div className="bg-gray-950 min-h-screen p-8 text-white">
      {/* Carrinho de Compras */}
      <div className="flex justify-end mb-8">
        <a href="#" className="relative flex items-center bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 transition">
          <span className="sr-only">Carrinho de compras</span>
          {/* Ícone de carrinho de compras (SVG do Lucide React) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart text-gray-100">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center -mt-2 -mr-2">0</span>
        </a>
      </div>

      <h1 className="text-4xl font-bold text-gray-50 text-center mb-10">Nossos Produtos</h1>
      
      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-50 mb-2">{product.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-50">R$ {product.price.toFixed(2)}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


