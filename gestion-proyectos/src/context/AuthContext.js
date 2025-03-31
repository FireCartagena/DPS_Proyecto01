import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

  // Cargar el usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Indicar que la carga ha terminado
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Valor proporcionado por el contexto
  const value = {
    user, // Datos del usuario autenticado
    login, // Función para iniciar sesión
    logout, // Función para cerrar sesión
    isAuthenticated: !!user, // Booleano que indica si hay un usuario autenticado
    loading, // Estado de carga para manejar renderizados condicionales
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Renderizar hijos solo cuando la carga haya terminado */}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};