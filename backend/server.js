// import express from "express";
// import cors from 'cors';

// const port = 5173;
// const app = express();
// app.use(cors());

// app.get('/possession', (req, res) => {
//     res.writeHead("Content-Type", "application/json");
//     res.json('../data/data.json')
// });

// app.listen(port, () => {
//     console.log(`Serveur : http://localhost:${port}`);
// })

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

// Fonction pour lire les données JSON
const getDataFromJson = async () => {
  // Chemin vers le fichier JSON dans le dossier data
  const filePath = path.join(__dirname, '../data/data.json');
  const fileData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileData);
};

app.get('/possession', async (req, res) => {
  try {
    const data = await getDataFromJson();
    res.json(data);
  } catch (error) {
    res.status(500).send('Erreur lors de la lecture des données');
  }
});

// app.get('/data', async (req, res) => {
//     res.send("Hello");
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
