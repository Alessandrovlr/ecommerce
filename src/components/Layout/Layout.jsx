import { Outlet } from "react-router-dom";
import { Menu } from "../Menu/Menu";


export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      {/* O menu agora está com px-8 para consistência de espaçamento */}
      <Menu className="px-8" />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Seção 1: Informações da loja */}
            <div className="col-span-1">
              <h3 className="text-2xl font-bold text-white mb-4">DC VS AVENGERS</h3>
              <p className="text-sm">Sua loja dos Sonhos</p>
            </div>
            {/* Seção 2: Links */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold text-white mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Início</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Produtos</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contato</a></li>
              </ul>
            </div>
            {/* Seção 3: Redes Sociais */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold text-white mb-4">Siga-nos</h3>
              <div className="flex space-x-3 text-2xl">
                <a href="#" className="hover:text-white transition-colors duration-300"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:text-white transition-colors duration-300"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-white transition-colors duration-300"><i className="fab fa-instagram"></i></a>
                <a href="#" className="hover:text-white transition-colors duration-300"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-2 pt-4 text-center text-sm">
            <p>&copy; 2024 DC VS AVENGERS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
