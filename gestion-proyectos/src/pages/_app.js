
import { useEffect } from 'react';
import { initializeData } from '../utils/initialData';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initializeData(); // Configura los datos iniciales al cargar la app
  }, []);

  return (<AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>);
}

export default MyApp;