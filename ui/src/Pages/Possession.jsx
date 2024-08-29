import React, { useState, useEffect } from 'react'
import ListPossession from '../Components/ListPossession'
import Header from '../Components/Header'
import ButtonTarget from '../Components/ButtonTarget'
import axios from 'axios'

export default function Possession() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        let reponse = await axios.get('http://localhost:5000/possession');
        const dataDonne = await reponse.data
        setData(dataDonne);
      } catch (err) {
        console.log("Erreur de la recuperation : ", err);
      }
    }
    getData();
  }, []);

  if (!data) {
    return <h1>Aucune donne</h1>
  }

  return (
    <div className='container'>
      {/* <Header user={data.possesseur.nom} /> */}
      <ListPossession listpossession={true} />
      <ButtonTarget target={"/possession/create"} print={"Create Possession"} />
    </div>
  )
}