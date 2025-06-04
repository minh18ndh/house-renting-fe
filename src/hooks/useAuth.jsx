import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, signupApi, getMeApi } from '../apis/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rentahouse_token');
    if (!token) {
      setLoading(false);
      return;
    }

    getMeApi()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('rentahouse_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const { token } = await loginApi(email, password);
      localStorage.setItem('rentahouse_token', token);

      const userData = await getMeApi();
      setUser(userData);

      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const signup = async (name, email, password, phone) => {
    try {
      const { token } = await signupApi(name, email, password, phone);
      localStorage.setItem('rentahouse_token', token);

      return true;
    } catch (err) {
      console.error('Signup failed:', err);
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