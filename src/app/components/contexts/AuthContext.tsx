import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, status: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (email: string, status: boolean) => {
    setIsAdmin(status);
    // Aqui você pode armazenar o email do usuário, etc.
  };

  const logout = () => {
    setIsAdmin(false);
    // Limpa qualquer informação do usuário, como o email
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
