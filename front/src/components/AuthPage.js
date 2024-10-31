import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import '../App.css';

const AuthPage = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        // Sauvegarde le token selon "Se souvenir de moi"
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        setAuthenticated(true);
        navigate('/landing');
      } else {
        alert("Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Connexion</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />

      <div className="form-group mb-3">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />{' '}
          Se souvenir de moi
        </label>
      </div>

      <button type="submit">Se connecter</button>
      <p className="switch-link text-center mt-3">
        Pas encore inscrit ? <Link to="/register">Inscrivez-vous ici</Link> {}
      </p>
    </form>
  );
};

export default AuthPage;
