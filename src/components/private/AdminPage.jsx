// pages/AdminPage.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminPage({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;

  }else if (user.tipo_usuario !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}
