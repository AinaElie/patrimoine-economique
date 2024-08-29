// import React, { useEffect, useState } from 'react'
// import Possession from '../../../models/possessions/Possession';
// import Flux from '../../../models/possessions/Flux';
// import InstancePatrimoine from '../../../models/Patrimoine.js';
// import Personne from '../../../models/Personne.js';
// // import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { Button } from 'react-bootstrap';
// import LineChart from '../Components/LineChart';

// export default function Patrimoine() {
//   const [data, setData] = useState(null);
//   const [value, setValue] = useState("");
//   const [date, setDate] = useState("");
//   // const navigate = useNavigate();

//   function handleDate(event) {
//     event.preventDefault();
//     setValue("");
//     setDate(value);
//     // navigate(`:${value}`);
//   }

//   useEffect(() => {
//     async function getData() {
//         try {
//             let reponse = await axios.get('http://localhost:5000/possession');
//             const dataPrev = await reponse.data;
//             setData(dataPrev);
//         } catch (err) {
//             console.log("Erreur : ", err);
//         }
//     }
//     getData();
// }, []);

//   if (!data) {
//     return <div>Aucune donnée trouvée</div>;
//   }

//   const LesPossessions = data.possessions.filter(element => element.valeur !== 0);
//   const newPossession = LesPossessions.map(element => new Possession(element.possesseur, element.libelle, element.valeur, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement));
//   const LesFlux = data.possessions.filter(element => element.valeur == 0);
//   const newFlux = LesFlux.map(element => new Flux(element.possesseur, element.libelle, element.valeurConstante, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement, element.jour));
//   const possessions = newPossession.concat(newFlux);

//   const personne = new Personne(data.possesseur.nom);
//   const patrimoine = new InstancePatrimoine(personne, possessions);

//   return (
//     <>
//       <div>
//         <LineChart />
//       </div>
//       <div className='flex'>
//         <form onSubmit={handleDate} className="container" >
//           <h3>Selectionner la date : </h3>
//           <input type="date" onChange={(event) => setValue(event.target.value)} value={value} className='border border-gray-600 py-2 px-4 rounded-lg' />
//           {/* <button type='submit'>Valider</button> */}
//           <Button className='mx-3' type='submit'>Valider</Button>
//           <p className='py-2 text-xl'>La valeur du patrimoine est :
//             <span className='mx-1' style={{fontWeight: 'bolder'}}>
//               {patrimoine.getValeur(new Date(date)).toFixed(0)}
//             </span>
//           </p>
//         </form>
//       </div>
//     </>
//   )
// }

import React from 'react'

export default function Patrimoine() {
  return (
    <div>Patrimoine</div>
  )
}