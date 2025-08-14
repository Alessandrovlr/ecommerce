import { Link } from "react-router-dom";

export const Menu = () =>{
    return (
        <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
            <div className="flex space-x-2">
            <i className="fas fa-film text-purple-400 text-3xl"></i>
              <Link to="/" className="text-white text-xl font-bold">
                Loja Vingadores x DC
              </Link>
              <Link to="/Login">LOGIN</Link>
            </div>
          </div>
        
        </nav>
    );      
}       