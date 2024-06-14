"use client"
import { createContext, useState } from 'react';
import AuthService from '../services/AuthService';
import { useEffect } from 'react';



export const AuthContext = createContext();


// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}