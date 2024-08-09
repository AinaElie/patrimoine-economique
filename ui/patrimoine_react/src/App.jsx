import React, { useState } from 'react'
import data from './../../../data/data.json';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './App.css';
import Result from './Components/Result';

export default function App() {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  function handleDate(event) {
    event.preventDefault();
    setValue("");
    setDate(value);
  }

  return (
    <div className='container'>
      <div className='py-2 d-flex justify-content-around align-items-center'>
        <h1>Patrimoine de : {data.possesseur.nom} </h1>
      </div>
      <Table bordered className='table'>
        <thead striped>
          <tr>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date de Debut</th>
            <th>Date de Fin</th>
            <th>Taux d'amortissement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.libelle} </p>
            ))}</td>
            <td>{data.possessions.map(element => (
              <p className='py-2 border-2'>{Math.abs(element.valeur) || Math.abs(element.valeurConstante)}</p>
            ))}</td>
            <td>{data.possessions.map(element => (
              <p className='py-2 border-2'>{new Date(element.dateDebut).toISOString().split('T')[0]}</p>
            ))}</td>
            <td>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.dateFin || "..."}</p>
            ))}</td>
            <td>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.tauxAmortissement || 0}</p>
            ))}</td>
          </tr>
        </tbody>
      </Table>

      <form onSubmit={handleDate} className='py-5 container'>
        <h3>Selectionner une date : </h3>
        <input type="date" onChange={(event) => setValue(event.target.value)} value={value} className='py-2 px-4' />
        <Button variant="primary" type='submit' className='mx-3'>Valider</Button>
      </form>
      <Result value={date} />
    </div>
  )
}