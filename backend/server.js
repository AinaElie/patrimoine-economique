import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { readFile, writeFile } from '../data/index.js';
import Personne from '../models/Personne.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())

const getDataFromJson = async () => {
  const fileData = fileURLToPath(import.meta.url);
  const dirname = path.dirname(fileData);
  const filePath = path.join(dirname, '../data/data.json');
  const data = readFile(filePath, 'utf8');
  return data
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

    const dataPrev = readFile(filePath, 'utf8');

    const request = req.body;
    const possesseur = new Personne("John Doe");
    
    const newPossession = {
      possesseur: possesseur,
      libelle: request.libelle,
      valeur: request.valeur,
      dateDebut: request.dateDebut,
      dateFin: null,
      tauxAmortissement: request.tauxAmortissement
    };

    (await dataPrev).data.possessions.push(newPossession)
    
    writeFile(filePath, (await dataPrev).data.possessions);

    res.status(201).send('Nouvelle possession ajoutée avec succès.');
  } catch (error) {
    res.status(500).send(error);
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
