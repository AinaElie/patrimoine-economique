import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ButtonTarget from './ButtonTarget';

export default function UpdatePossession() {
    const { libelle } = useParams();

    let newLibelle = "";

    const libellePrev = libelle.split('').slice(1, libelle.length);
    for (let index = 0; index < libellePrev.length; index++) {
        const element = libellePrev[index];
        newLibelle += element;
    }

    const [newData, setNewData] = useState({
        "libelle": "",
        "dateFin": "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let response = await fetch(`http://localhost:5000/possession/${libelle}/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Réponse du serveur:', data);
            alert("Possession update successfully")
          } else {
            throw new Error(`Erreur HTTP! statut: ${response}`);
          }
        } catch (error) {
          console.error('Il y a eu une erreur lors de la mise à jour:', error);
          alert("Erreur, Veuiller ressayer");
        }
      };

    return (
        <div className='container py-5'>
            <h3>Update Possession : </h3>
            <form onSubmit={handleSubmit}>
                <div className='py-4'>
                    <h4>Libelle : </h4>
                    <input type="text" placeholder={newLibelle} className='py-2 px-4' name="libelle" value={newData.libelle} onChange={handleChange} required />
                </div>
                <div className='py-4'>
                    <h4>Date fin : </h4>
                    <input type='date' className='py-2 px-5' name="dateFin" value={newData.dateFin} onChange={handleChange} required />
                </div>
                <button className='btn btn-primary py-2 px-4'>Update</button>
            </form>
            <div className='py-3'>
                <ButtonTarget target={"/"} print={"Retour"} />
            </div>
        </div>
    )
}