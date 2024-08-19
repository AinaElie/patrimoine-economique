import express from 'express';
import path from 'path';
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

app.put('/possession/:libelle/update', async (req, res) => {
  try {
    const fileData = fileURLToPath(import.meta.url);
    const dirname = path.dirname(fileData);
    const filePath = path.join(dirname, '../data/data.json');

    const request = req.body;
    const { libelle } = req.params;

    let vide = "";

    const libellePrev = libelle.split('').slice(1, libelle.length);
    for (let index = 0; index < libellePrev.length; index++) {
      const element = libellePrev[index];
      vide += element;
    }

    const dataPrev = readFile(filePath);
    const possesseur = (await dataPrev).data.possesseur;
    const possession = (await dataPrev).data.possessions.filter(p => p.libelle === vide);
    const AllPossession = (await dataPrev).data.possessions.filter(p => p.libelle !== vide);

    let newPossession = {
      possesseur: possesseur,
      libelle: request.libelle,
      valeur: parseInt(possession[0].valeur),
      dateDebut: new Date(possession[0].dateDebut),
      dateFin: new Date(request.dateFin),
      tauxAmortissement: parseInt(possession[0].tauxAmortissement)
    }

    AllPossession.push(newPossession);

    res.json({
      "new Possession" : newPossession,
      "data": AllPossession
    });

    const newPatrimoine = {
      "possesseur": possesseur,
      "possessions": AllPossession
    }

    writeFile(filePath, newPatrimoine);

  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de l\'analyse du fichier JSON.' });
  }
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
