const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  console.log('test')
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return
  }
  console.log("Connecté à la base de données MySQL");
});

// Route d'inscription
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'Veuillez fournir un email, un mot de passe et un nom.' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`;
  db.query(query, [email, hashedPassword, name], (err) => {
    if (err) {
      console.error("Erreur lors de l'insertion dans la base de données :", err);
      return res.status(500).json({ success: false, message: "Erreur d'inscription" });
    }
    res.status(201).json({ success: true, message: "Utilisateur inscrit" });
  });
});
  
// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    }
    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
