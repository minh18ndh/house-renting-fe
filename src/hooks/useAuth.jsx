import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rentahouse_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ 
        email: localStorage.getItem('rentahouse_user_email') || 'user@example.com', 
        name: localStorage.getItem('rentahouse_user_name') || 'Test User' 
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      if (email === "user@example.com" && password === "password") {
        const token = "mock_jwt_token";
        const userData = { email, name: "Test User" };

        localStorage.setItem('rentahouse_token', token);
        localStorage.setItem('rentahouse_user_email', email);
        localStorage.setItem('rentahouse_user_name', userData.name);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        return true;
      }
      throw new Error("Invalid credentials");
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const token = "mock_jwt_token_signup";
      const userData = { email, name };

      localStorage.setItem('rentahouse_token', token);
      localStorage.setItem('rentahouse_user_email', email);
      localStorage.setItem('rentahouse_user_name', name);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('rentahouse_token');
    localStorage.removeItem('rentahouse_user_email');
    localStorage.removeItem('rentahouse_user_name');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);