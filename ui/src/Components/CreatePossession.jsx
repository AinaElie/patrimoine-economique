import React, { useState } from 'react'
import ButtonTarget from './ButtonTarget';

export default function CreatePossession() {
    const [formData, setFormData] = useState({
        libelle: '',
        valeur: '',
        dateDebut: '',
        tauxAmortissement: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://localhost:5000/possession/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json()
                console.log("Possession ajouté", data);
                alert('Possession ajoutée avec succès !');
            } else {
                throw new Error('Erreur lors de l\'ajout du Possession')
            };
        } catch (error) {
            console.error('Erreur:', error);
            alert(error.message);
        }
    };

    return (
        <div className='container py-5'>
            <h3>Creation de possession : </h3>
            <form className='container' onSubmit={handleSubmit}>
                <div className='py-4'>
                    <h4>Libelle : </h4>
                    <input type="text" className='py-2 px-3' name="libelle" value={formData.libelle} onChange={handleChange} required />
                </div>
                <div className='py-4'>
                    <h4>Valeur : </h4>
                    <input type="number" className='py-2 px-3' name="valeur" value={formData.valeur} onChange={handleChange} required />
                </div>
                <div className='py-4'>
                    <h4>Date debut : </h4>
                    <input type="date" className='py-2 px-4' name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
                </div>
                <div className='py-4'>
                    <h4>Taux d'amortissement : </h4>
                    <input type="number" className='py-2 px-3' name="tauxAmortissement" value={formData.tauxAmortissement} onChange={handleChange} required />
                </div>
                <button className='btn btn-primary py-2 px-4'>Creer</button>
            </form>
            <div className='py-3'>
                <ButtonTarget target={"/"} print={"Retour"} />
            </div>
        </div>
    )
}