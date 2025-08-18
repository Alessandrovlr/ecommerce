// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { loginService } from '../services/script/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const result = await loginService(username, password);
    if (result.success) {
      setUser(result.data); // salva o usuário retornado pela API
    }
    return result;
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
