import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod'; // Importa o Zod para validação

// Define o esquema de validação com Zod
const loginSchema = z.object({
  nome: z.string().min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres." }),
  senha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

// Cria um contexto de autenticação de exemplo
const AuthContext = createContext(null);

// Hook para usar o contexto de autenticação
const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de autenticação de exemplo
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (newUser) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Mock do hook `useAuth` e `useNavigate` para que o código seja executável no Canvas
  const auth = {
    login: (username) => console.log(`Usuário logado: ${username}`),
  };
  const navigate = () => console.log('Navegação para a home');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Limpa erros anteriores

    try {
      // Valida os dados do formulário com Zod
      loginSchema.parse({ username, password });

      // Se a validação passar, continua com a lógica de login
      auth.login(username);
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-950 text-gray-100 p-4">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-100">Acesse sua conta</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Usuário</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder-gray-500"
              placeholder="Digite seu nome de usuário"
            />
            {errors.username && <p className="text-red-400 text-sm mt-2">{errors.username}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder-gray-500"
              placeholder="Digite sua senha"
            />
            {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full px-4 py-3 mt-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};


