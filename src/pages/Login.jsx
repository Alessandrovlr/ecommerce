import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';

// Esquema de validação
const loginSchema = z.object({
  username: z.string().min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export const Login = () => {
  const { login } = useAuth(); // <- contexto real
  const navigate = useNavigate(); // <- navegação real

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    // 1. Validação com Zod
    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // 2. Chama login do contexto (que faz POST na API)
    const response = await login(username, password);

    if (response.success) {
      navigate('/'); // redireciona ao fazer login
    } else {
      setServerError(response.message || 'Usuário ou senha inválidos.');
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

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

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
