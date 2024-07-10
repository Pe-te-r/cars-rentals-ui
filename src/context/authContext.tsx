// AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';
import { ToastResponseType } from '../types/types';
// import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  isAuthModalOpen: boolean;
  isLogin: boolean;
  openAuthModal: (isLogin: boolean) => void;
  closeAuthModal: () => void;
  responseToast: ToastResponseType | undefined;
  setResponseToast: (response: ToastResponseType | undefined) => void;
  clearResponse: () => void;
  // navigate: any

}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [responseToast, setResponseToast] = useState<ToastResponseType>();

  const clearResponse = () => {
    setResponseToast(undefined);
  };


  const openAuthModal = (isLogin: boolean) => {
    setIsLogin(isLogin);
    setIsAuthModalOpen(true);
  };

  // const navigate = useNavigate()

  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ isAuthModalOpen, isLogin, openAuthModal, closeAuthModal, responseToast, setResponseToast, clearResponse}}>
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
