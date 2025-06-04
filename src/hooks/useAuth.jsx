import { createContext, useContext, useState, useEffect } from 'react';
import apiFetch from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto login on page load if token exists
  useEffect(() => {
    const token = localStorage.getItem('rentahouse_token');
    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch('/auth/me', { method: 'GET', token })
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('rentahouse_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const { token } = await apiFetch('/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      localStorage.setItem('rentahouse_token', token);

      const userData = await apiFetch('/auth/me', { token });
      setUser(userData);

      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const signup = async (name, email, password, phone) => {
    try {
      const { token } = await apiFetch('/auth/register', {
        method: 'POST',
        body: {
          fullName: name,
          email,
          password,
          phone,
        },
      });

      localStorage.setItem('rentahouse_token', token);

      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('rentahouse_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);