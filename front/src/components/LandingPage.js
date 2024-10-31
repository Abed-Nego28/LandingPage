import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LandingPage = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprime le token pour déconnecter l'utilisateur
    localStorage.removeItem('token'); 
    setAuthenticated(false);
    // Redirige l'utilisateur vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Bienvenue sur ma page</h1>
      <p>
        Bienvenue sur votre espace personnel. Je suis un développeur web et je veux acquérir de nouvelles compétences en entreprise. Apprendre avec les professionnels serait pour moi un énorme avantage.
      </p>

      <div className="features">
        {}
      </div>

      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default LandingPage;
