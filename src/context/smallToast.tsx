// ToastContext.js
import  { createContext, useContext, useState, ReactNode } from 'react';
import SmallToast from '../components/SmallToast';

interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
  addToast: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const id = toastId++;
    const newToast = { id, message, type };
    setToasts([...toasts, newToast]);

    setTimeout(() => {
      setToasts(toasts => toasts.filter(toast => toast.id !== id));
    }, 2000); // 2 seconds
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <SmallToast toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
