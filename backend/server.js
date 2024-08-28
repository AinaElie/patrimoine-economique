import express from "express";
import cors from 'cors';
import {readFile} from '../data/index.js'

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/possession', async (req, res) => {
    try {
        const dataPrev = await readFile('./data/data.json', 'utf8');

        if (dataPrev.status === 'OK') {
            const data = await dataPrev.data
            res.status(200).json(data);
        } else {
            res.status(500).json({message: "Donne non trouver"})
        }
    } catch (error) {
        res.send(500).json({messge: "Erreur", error});
    }
})

app.listen(port, () => {
    console.log(`Serveur lancer : http://localhost:${port}`);
})