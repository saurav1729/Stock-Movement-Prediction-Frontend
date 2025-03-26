import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './auth/context/AuthContext.jsx';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import store from './store/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
    </AuthContextProvider>

  </StrictMode>,
);
