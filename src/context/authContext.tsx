// AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
  isAuthModalOpen: boolean;
  isLogin: boolean;
  openAuthModal: (isLogin: boolean) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openAuthModal = (isLogin: boolean) => {
    setIsLogin(isLogin);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ isAuthModalOpen, isLogin, openAuthModal, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
