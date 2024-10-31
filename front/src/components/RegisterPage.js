import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {

// valeurs des champs de formulaire
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // formulaire d'inscription
   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('clicked')
  
    try {
      console.log('ahi')
       // Requête POST informations au serveur 
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      console.log(response)
  
      // Vérification réponse JSON
      if (!response.ok) {
        throw new Error("Erreur réseau ou erreur serveur");
      }
  
      const data = await response.json(); 
      console.log("Réponse du serveur:", data);
  
      if (data.success) {

        // Redirige vers la page de connexion
        alert("Inscription réussie. Veuillez vous connecter.");
        navigate('/login');
      } else {
        alert("Erreur d'inscription.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de l'inscription. Veuillez vérifier le serveur.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Inscription</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        required
      />
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
      <button type="submit">S'inscrire</button>
      <p className="switch-link text-center mt-3">
        Déjà inscrit ? <Link to="/login">Connectez-vous ici</Link>
      </p>
    </form>
  );
};

export default RegisterPage;
