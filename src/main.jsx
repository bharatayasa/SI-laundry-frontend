import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './style/main.css'
import ScrollToTop from './context/ScrollToTop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </AuthProvider>,
)
