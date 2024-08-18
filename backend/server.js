import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { readFile, writeFile } from '../data/index.js';

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
    const possesseur = (await dataPrev).data.possesseur;

    const newPossession = {
      possesseur: possesseur,
      libelle: request.libelle,
      valeur: parseInt(request.valeur),
      dateDebut: new Date(request.dateDebut),
      dateFin: null,
      tauxAmortissement: parseInt(request.tauxAmortissement)
    };

    (await dataPrev).data.possessions.push(newPossession)

    let newPatrimoine = {
      "possesseur": possesseur,
      "possessions": (await dataPrev).data.possessions
    }

    writeFile(filePath, newPatrimoine);

    res.status(201).send('Nouvelle possession ajoutée avec succès.');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/possession/:libelle', (req, res) => {
  const { libelle } = req.params;

  const fileData = fileURLToPath(import.meta.url);
  const dirname = path.dirname(fileData);
  const filePath = path.join(dirname, '../data/data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la lecture du fichier.' });
    }

    try {
      const jsonData = JSON.parse(data);
      const possession = jsonData.possessions.find(p => p.libelle === libelle);
      if (possession) {
        return res.json(possession);
      } else {
        return res.status(404).json({ message: 'Possession non trouvée.' });
      }
    } catch (parseErr) {
      return res.status(500).json({ message: 'Erreur lors de l\'analyse du fichier JSON.' });
    }
  });
});

app.put('/possession/:libelle/update', (req, res) => {
    const newData = req.body;
    const {libelle} = req.params;

    const fileData = fileURLToPath(import.meta.url);
    const dirname = path.dirname(fileData);
    const filePath = path.join(dirname, '../data/data.json');

    const dataPrev = readFile(filePath);
    res.json(dataPrev)
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
