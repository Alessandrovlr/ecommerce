import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";


export const Menu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redireciona para login após logout
  };

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
        <div className="flex space-x-4 items-center">
          <i className="fas fa-film text-purple-400 text-3xl"></i>
          <Link to="/" className="text-white text-xl font-bold">
            Loja Vingadores x DC
          </Link>
          <Link to="/cadastroProdutos" className="text-white hover:text-gray-300">
            Cadastro de Produtos
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">Olá, {user.nome}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
