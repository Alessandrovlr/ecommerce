import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (nome, senha) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        nome,
        senha
      });

      // Suponha que a API retorne o usuário autenticado
      setUser(response.data);
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, message: error.response?.data || 'Erro ao fazer login' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};