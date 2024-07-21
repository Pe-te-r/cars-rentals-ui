import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the user details
interface UserDetails {
  id:string;
  name: string;
  email: string;
  login: boolean;
  role: string;
  contact_phone: string;
  token: string;
}

interface DetailsContextType {
  user: UserDetails | null;
  setUserDetail: (detail: UserDetails) => void;
  clearUserDetail: () => void;
}

const DetailsContext = createContext<DetailsContextType | undefined>(undefined);

export const DetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedUser =() => {
    // Retrieve the initial state from local storage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  const [user, setUser] = useState<UserDetails | null>(storedUser);

  useEffect(() => {
    // Store user details in local storage whenever they change
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const setUserDetail = (detail: UserDetails) => {
    setUser(detail);
  };

 
  const clearUserDetail = () => {
    setUser(null);
  };

  return (
    <DetailsContext.Provider value={{ user, setUserDetail, clearUserDetail }}>
      {children}
    </DetailsContext.Provider>
  );
};

export const useDetails = () => {
  const context = useContext(DetailsContext);
  if (!context) {
    throw new Error('useDetails must be used within a DetailsProvider');
  }
  return context;
};
