import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import AuthPage from './components/AuthPage'; 
import RegisterPage from './components/RegisterPage'; 
import './App.css'; 


// Fonction principale de l'application
function App() {

  //  authentification de l'utilisateur
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Routes>
      {}
      <Route
        path="/"
        element={authenticated ? <LandingPage setAuthenticated={setAuthenticated} /> : <AuthPage setAuthenticated={setAuthenticated} />}
      />
      
      {}
      <Route
        path="/login"
        element={<AuthPage setAuthenticated={setAuthenticated} />}
      />

      {}
      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {}
      <Route
        path="/landing"
        element={<LandingPage setAuthenticated={setAuthenticated} />}
      />
    </Routes>
  );
}


export default App;
