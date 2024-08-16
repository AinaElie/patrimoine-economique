import express from 'express';
// import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { readFile, writeFile } from '../data/index.js';
import Possession from '../models/possessions/Possession.js';
import Personne from '../models/Personne.js';

const app = express();
const port = 5000;

app.use(cors());

const getDataFromJson = async () => {
  const fileData = fileURLToPath(import.meta.url);
  const dirname = path.dirname(fileData);
  const filePath = path.join(dirname, '../data/data.json');
  const folderData = readFile(filePath, 'utf8');
  return folderData
};

app.get('/possession', async (req, res) => {
  try {
    const data = await getDataFromJson();
    res.json(data);
  } catch (error) {
    res.status(500).send('Erreur lors de la lecture des données : ' + error);
  }
});

app.post('/possession/create', async (req, res) => {
  try {
    const fileData = fileURLToPath(import.meta.url);
    const dirname = path.dirname(fileData);
    const filePath = path.join(dirname, '../data/data.json');

    // const folderData = readFile(filePath, 'utf8');

    const request = req.body;
    const possesseur = new Personne("John Doe");
    const newPossession = new Possession(possesseur, request.libelle, request.valeur, request.dateDebut, null, request.tauxAmortissement);
    
    // const possessionObject = {
    //   possesseur: newPossession.possesseur,
    //   libelle: newPossession.libelle,
    //   valeur: newPossession.valeur,
    //   dateDebut: newPossession.dateDebut,
    //   dateFin: null,
    //   tauxAmortissement: newPossession.tauxAmortissement
    // };

    // folderData.data.possessions.push(possessionObject);

    writeFile(filePath, newPossession);

    res.status(201).send('Nouvelle possession ajoutée avec succès.');
  } catch (error) {
    res.status(500).send(error);
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
