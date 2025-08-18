import { Outlet } from "react-router-dom";
import { Menu } from "../Menu/Menu";


export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Menu />
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">VingadoresXdc</h3>
              <p>Sua loja dos Sonhos</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-white transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-white transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-white transition"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
