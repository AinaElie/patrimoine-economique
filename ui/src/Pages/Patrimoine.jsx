import React, { useEffect, useState } from 'react'
import Possession from '../../../models/possessions/Possession';
import Flux from '../../../models/possessions/Flux';
import InstancePatrimoine from '../../../models/Patrimoine.js';
import Personne from '../../../models/Personne.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import LineChart from '../Components/ComponentsChart.jsx';

export default function Patrimoine() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [value, setValue] = useState("");

  const [valueDebut, setValueDebut] = useState("");
  const [dateDebut, setDateDebut] = useState("");

  const [valueFin, setValueFin] = useState("");
  const [dateFin, setDateFin] = useState("");

  const [valueJour, setValueJour] = useState("");
  const [jour, setJour] = useState("");

  function handleDate(event) {
    event.preventDefault();
    setValue("");
    setDate(value);
    navigate(`:${value}`);
  }

  useEffect(() => {
    async function getData() {
      try {
        let reponse = await axios.get('http://localhost:5000/possession');
        const dataPrev = await reponse.data;
        setData(dataPrev);
      } catch (err) {
        console.log("Erreur : ", err);
      }
    }
    getData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setValueDebut("");
    setDateDebut(valueDebut);
    setValueFin("");
    setDateFin(valueFin);
    setValueJour("");
    setJour(valueJour);
    navigate("range");
  }

  useEffect(() => {
    async function getData() {
      try {
        let reponse = await axios.get('http://localhost:5000/possession');

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

  const obtenirMoisEntreDates = (dateDebut, dateFin, jour) => {
    let mois = [];
    let valeurPatrimoine = [];
    let dateActuelle = new Date(dateDebut);

    while (
      dateActuelle.getFullYear() < new Date(dateFin).getFullYear() ||
      (dateActuelle.getFullYear() === new Date(dateFin).getFullYear() &&
        (dateActuelle.getMonth() < new Date(dateFin).getMonth() ||
          (dateActuelle.getMonth() === new Date(dateFin).getMonth() && dateActuelle.getDate() <= new Date(dateFin).getDate())))
    ) {
      let dateToday = new Date(dateActuelle.getFullYear(), dateActuelle.getMonth(), jour);
      mois.push(dateToday.toLocaleString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }));
      valeurPatrimoine.push(patrimoine.getValeur(dateToday));

      // Passe au mois suivant
      dateActuelle.setMonth(dateActuelle.getMonth() + 1);
    }

    return { mois, valeurPatrimoine };
  }

  const valueFinal = obtenirMoisEntreDates(dateDebut, dateFin, jour);

  return (
    <>
      <Accordion defaultActiveKey="0" className='my-5' alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Valeur du patrimoine : </Accordion.Header>
          <Accordion.Body>
            {/* <form className='flex items-end py-4' onSubmit={handleSubmit}>
              <div className='mx-4'>
                <h1>Date debut : </h1>
                <input type="date" className='border border-gray-600 py-2 px-4 rounded-lg' value={valueDebut} onChange={(ev) => setValueDebut(ev.target.value)} required />
              </div>
              <div className='mx-4'>
                <h1>Date fin : </h1>
                <input type="date" className='border border-gray-600 py-2 px-4 rounded-lg' value={valueFin} onChange={(ev) => setValueFin(ev.target.value)} required />
              </div>
              <div className='mx-4'>
                <h1>Jour : </h1>
                <input type="number" className='border border-gray-600 py-2 pl-4 rounded-lg' value={valueJour} onChange={(ev) => setValueJour(ev.target.value)} required />
              </div>
              <button className='bg-blue-600 mx-2 py-3 px-4 rounded-xl text-white' type='submit'>Range</button>
            </form> */}
            <div className='container flex-fill border w-50 py-5 px-5 my-5 bg-light rounded'>
              <Form onSubmit={handleSubmit} className='row py-5 px-5'>
                <Form.Group className="mb-3 col col-6">
                  <Form.Label>Date debut : </Form.Label>
                  <Form.Control type="date" value={valueDebut} onChange={(ev) => setValueDebut(ev.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3 col col-6">
                  <Form.Label>Date fin : </Form.Label>
                  <Form.Control type="date" value={valueFin} onChange={(ev) => setValueFin(ev.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3 col col-6">
                  <Form.Label>Jour: </Form.Label>
                  <Form.Control type="date" value={valueJour} onChange={(ev) => setValueJour(ev.target.value)} required />
                </Form.Group>
                <Button type='submit'>Range</Button>
              </Form>
            </div>
            {/* <LineChart key="chartMy" /> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Calcul de patrimoine : </Accordion.Header>
          <Accordion.Body>
            <div className='container flex-fill border w-50 py-3 px-5 my-5 bg-light rounded'>
              <h4 className='px-5 py-3'>Selectionne la date :</h4>
              <Form onSubmit={handleDate} className='row px-5'>
                <Form.Group className="mb-3 col col-6">
                  <Form.Control type="date" onChange={(event) => setValue(event.target.value)} value={value} required className='py-3 px-3' />
                  <Button type='submit' className='mx-3 col col-6 my-3'>Valider</Button>
                </Form.Group>
              </Form>
              <h3 className='py-2 text-xl'>La valeur du patrimoine est :
                <span className='mx-1' style={{ fontWeight: 'bolder' }}>
                  {patrimoine.getValeur(new Date(date)).toFixed(0)}
                </span>
              </h3>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}