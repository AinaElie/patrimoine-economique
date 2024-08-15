import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

const getDataFromJson = async () => {
  const fileData = fileURLToPath(import.meta.url);
  const dirname = path.dirname(fileData);
  const filePath = path.join(dirname, '../data/data.json');
  const folderData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(folderData);
};

app.get('/possession', async (req, res) => {
  try {
    const data = await getDataFromJson();
    res.json(data);
  } catch (error) {
    res.status(500).send('Erreur lors de la lecture des données : ' + error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
