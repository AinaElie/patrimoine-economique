import React, { useState, useEffect } from 'react'
import Button from '../Components/Button'
import { useParams } from 'react-router-dom'
// import axios from 'axios';

export default function UpdatePossession() {
  const { libelle } = useParams();
  const [possession, setPossession] = useState(null);
  const [newData, setNewData] = useState({
    "libelle": "",
    "dateFin": ""
  });

  let vide = "";

  const libellePrev = libelle.split('').slice(1, libelle.length);
  for (let index = 0; index < libellePrev.length; index++) {
    const element = libellePrev[index];
    vide += element;
  }

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await fetch(`/possession/${encodeURIComponent(libelle)}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        setPossession(response);
      } catch (error) {
        console.error('Erreur lors du chargement de la possession:', error);
      }
    };

    fetchPossession();
  }, [libelle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newData);
    try {
      const response = await fetch(`/possession/${encodeURIComponent(libelle)}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newData}),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.json()}`);
      }

      const data = await response.json();
      console.log('Réponse du serveur:', data);
    } catch (error) {
      console.error('Il y a eu une erreur lors de la mise à jour:', error);
    }
  };

  if (!possession) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-3xl py-2">Update possession : </h1>
      <form className='px-32' onSubmit={handleSubmit}>
        <div className='py-4 px-2'>
          <h1>Libelle : </h1>
          <input type="text" className='border border-1 border-black rounded pl-4 py-2' placeholder={vide} value={newData.libelle} onChange={(e) => setNewData({ ...newData, "libelle": e.target.value })} required />
        </div>
        <div className='py-4 px-2'>
          <h1>Date Fin : </h1>
          <input type="date" className='border border-1 border-black rounded px-9 py-2' value={newData.dateFin} onChange={(e) => setNewData({ ...newData, "dateFin": e.target.value })} />
        </div>
        <button type="submit" className="bg-blue-600 py-4 px-7 rounded-xl text-white">Update</button>
      </form>
      <Button print={"Retour"} target={"/possession"} />
    </div>
  )
}