import React from 'react'
import data from './../../../data/data.json';
import { Table } from 'react-bootstrap';

export default function App() {
  return (
    <div>
      <h1> {data.possesseur.nom} </h1>
      <Table bordered>
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
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.libelle} </p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{Math.abs(element.valeur) || Math.abs(element.valeurConstante)}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{new Date(element.dateDebut).toISOString().split('T')[0]}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.dateFin || "..."}</p>
            ))}</td>
            <td className='border-1'>{data.possessions.map(element => (
              <p className='py-2 border-2'>{element.tauxAmortissement || 0}</p>
            ))}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}