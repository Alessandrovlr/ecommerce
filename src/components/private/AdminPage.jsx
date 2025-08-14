export function AdminPage({ children }) {
    const { user } = useContext(Context);
  
    return user ? children : <Navigate to="/login" />;
  }