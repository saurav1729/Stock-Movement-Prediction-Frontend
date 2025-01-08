import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './auth/context/AuthContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
);
