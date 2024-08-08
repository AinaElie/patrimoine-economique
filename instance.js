import { writeFile } from "./data/index.js";
import Patrimoine from "./models/Patrimoine.js";
import Personne from "./models/Personne.js";
import Flux from "./models/possessions/Flux.js";
import Possession from "./models/possessions/Possession.js";
import BienMateriel from "./models/possessions/BienMateriel.js"
import path from 'path';
import { fileURLToPath } from 'url';

const john = new Personne("John Doe");
const dateToday = new Date();

const macBookPro = new Possession(john, "MacBook Pro", 4000000, dateToday, null, 5);
const salaire = new Flux(john,"Alternance",500_000, dateToday,null,null,1);
const traindevie = new Flux(john,"Survie",-300_000, dateToday,null,null,2)
const bienMateriel = new BienMateriel(john, "Effet vestimentaire", 1_000_000, dateToday, null, 20);

const possessions = [macBookPro,salaire,traindevie,bienMateriel];


const johnPatrimoine  = new Patrimoine(john,possessions);

const fileData = fileURLToPath(import.meta.url);
const dirname =  path.dirname(fileData);
const folderData = path.resolve(dirname, './data/data.json');

writeFile(folderData, johnPatrimoine);