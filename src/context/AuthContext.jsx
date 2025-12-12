import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('techstore_user');
        const storedToken = localStorage.getItem('techstore_token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('techstore_user');
        localStorage.removeItem('techstore_token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      // Simulação de API - em produção, isso seria uma chamada real
      // Por enquanto, vamos usar um mock simples
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validação simples (em produção, isso viria do backend)
      if (email && password.length >= 6) {
        const userData = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };

        const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        setUser(userData);
        localStorage.setItem('techstore_user', JSON.stringify(userData));
        localStorage.setItem('techstore_token', token);

        toast.success(`Bem-vindo, ${userData.name}!`);
        return { success: true, user: userData };
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error(error.message || 'Erro ao fazer login');
      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      // Simulação de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email && password.length >= 6 && name) {
        const userData = {
          id: Date.now().toString(),
          email,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };

        const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        setUser(userData);
        localStorage.setItem('techstore_user', JSON.stringify(userData));
        localStorage.setItem('techstore_token', token);

        toast.success(`Conta criada com sucesso, ${name}!`);
        return { success: true, user: userData };
      } else {
        throw new Error('Dados inválidos');
      }
    } catch (error) {
      toast.error(error.message || 'Erro ao criar conta');
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('techstore_user');
    localStorage.removeItem('techstore_token');
    toast.success('Logout realizado com sucesso!');
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

