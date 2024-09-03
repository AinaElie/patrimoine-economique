import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from '../data/index.js'

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/possession', async (req, res) => {
    try {
        const fileData = fileURLToPath(import.meta.url);
        const dirname = path.dirname(fileData);
        const filePath = path.join(dirname, '../data/data.json');
        const dataPrev = await readFile(filePath, 'utf8');

        if (dataPrev.status === 'OK') {
            const data = await dataPrev.data
            res.status(200).json(data);
        } else {
            res.status(500).json({ message: "Donne non trouver" })
        }
    } catch (error) {
        res.status(500).json({ messge: "Erreur", error });
    }
})

app.post('/possession/create', async (req, res) => {
    try {
        const fileData = fileURLToPath(import.meta.url);
        const dirname = path.dirname(fileData);
        const filePath = path.join(dirname, '../data/data.json');
        const dataPrev = await readFile(filePath, 'utf8');

        const requeste = req.body;

        if (dataPrev.status === 'OK') {
            const data = await dataPrev.data;
            const possesseur = data.possesseur
            const possession = data.possessions

            const newPossession = {
                possesseur: possesseur,
                libelle: requeste.libelle,
                valeur: parseInt(requeste.valeur),
                dateDebut: new Date(requeste.dateDebut),
                dateFin: null,
                tauxAmortissement: parseInt(requeste.tauxAmortissement)
            };

            possession.push(newPossession);

            await writeFile('./data/data.json', data);

            res.status(200).json({ possession });
        } else {
            res.status(500).json({ message: "Donne non trouver" })
        }
    } catch (error) {
        res.status(500).json({ messge: "Erreur", error });
    }
});

app.put('/possession/:libelle/update', async (req, res) => {
    try {
        const fileData = fileURLToPath(import.meta.url);
        const dirname = path.dirname(fileData);
        const filePath = path.join(dirname, '../data/data.json');
        const dataPrev = await readFile(filePath, 'utf8');

        const {libelle} = req.params;
        const requeste = req.body;

        let newLibelle = "";

        const libellePrev = libelle.split('').slice(1, libelle.length);
        for (let index = 0; index < libellePrev.length; index++) {
            const element = libellePrev[index];
            newLibelle += element;
        }

        if (dataPrev.status === 'OK') {
            const data = await dataPrev.data;
            const possession = data.possessions.find(p => p.libelle === newLibelle);

            possession.libelle = requeste.libelle;
            possession.dateFin = new Date(requeste.dateFin);
        
            await writeFile('./data/data.json', data);
            res.status(200).json({message: possession});
        } else {
            res.status(500).json({ message: "Donne non trouver" })
        }
    } catch (error) {
        res.status(500).json({ messge: "Erreur", error });
    }
});


app.put('/possession/:libelle/close', async (req, res) => {
    try {
        const fileData = fileURLToPath(import.meta.url);
        const dirname = path.dirname(fileData);
        const filePath = path.join(dirname, '../data/data.json');
        const dataPrev = await readFile(filePath, 'utf8');

        const {libelle} = req.params;

        let newLibelle = "";

        const libellePrev = libelle.split('').slice(1, libelle.length);
        for (let index = 0; index < libellePrev.length; index++) {
            const element = libellePrev[index];
            newLibelle += element;
        }

        if (dataPrev.status === 'OK') {
            const data = await dataPrev.data;
            const possession = data.possessions.find(p => p.libelle === newLibelle);

            possession.dateFin = new Date();
        
            await writeFile('./data/data.json', data);
            res.status(200).json({message: possession});
        } else {
            res.status(500).json({ message: "Donne non trouver" })
        }
    } catch (error) {
        res.status(500).json({ messge: "Erreur", error });
    }
});

app.listen(port, () => {
    console.log(`Serveur lancer : http://localhost:${port}`);
})