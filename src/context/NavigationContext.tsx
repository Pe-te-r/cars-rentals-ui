// NavigationContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationContextProps {
  navigateTo: (path: string) => void;
  currentPath: string;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationContext.Provider value={{ navigateTo, currentPath: location.pathname }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
