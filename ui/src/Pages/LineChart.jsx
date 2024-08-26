import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from 'chart.js';
import Possession from '../../../models/possessions/Possession';
import Flux from '../../../models/possessions/Flux';
import InstancePatrimoine from '../../../models/Patrimoine.js';
import Personne from '../../../models/Personne.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title);

const LineChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        let reponse = await fetch('http://localhost:5000/patrimoine', { method: 'GET' });

        if (reponse.ok) {
          const data = await reponse.json();
          setData(data.data);
          // console.log("Les donnes : ", data);
        } else {
          console.log("Erreur : ", reponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  if (!data) {
    return <div>Aucune donnée trouvée</div>;
  }

  const LesPossessions = data.possessions.filter(element => element.valeur !== 0);
  const newPossession = LesPossessions.map(element => new Possession(element.possesseur, element.libelle, element.valeur, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement));
  const LesFlux = data.possessions.filter(element => element.valeur == 0);
  const newFlux = LesFlux.map(element => new Flux(element.possesseur, element.libelle, element.valeurConstante, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement, element.jour));
  const possessions = newPossession.concat(newFlux);

  const personne = new Personne(data.possesseur.nom);
  const patrimoine = new InstancePatrimoine(personne, possessions);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  // const dateToday = new Date(year'-'+month+'-'+day);

  const donne = {
    labels: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui"],
    datasets: [
      {
        label: 'Patrimoine',
        data: [0, 40, 45, 60, 80, 10],
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      }
    ]
  }

  return (
    <div className='p-8'>
      {/* {console.log(patrimoine.getValeur(new Date()).toFixed(0))}
      {console.log(patrimoine.getValeur(new Date(year, month + 1, day)).toFixed(0))} */}
      {/* {console.log(year)} */}
      <div className='border w-10/12 h-96 flex justify-center items-center'>
        <Line data={donne} className='w-full' />
      </div>
    </div>
  );
};

export default LineChart;
