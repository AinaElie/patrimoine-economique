import React, { useState } from 'react'

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
            const response = await fetch('http://localhost:5000/possession/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            });

            if (response.ok) {
                alert('Possession ajoutée avec succès !');
            } else {
                alert('Erreur lors de l\'ajout de la possession.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la connexion au serveur.');
        }
    };

    return (
        <div>
            <h1 className="text-3xl py-2">Creer un possession</h1>
            <form className='px-32' onSubmit={handleSubmit}>
                <div className='py-4 px-2'>
                    <h1>Libelle : </h1>
                    <input type="text" className='border border-1 border-black rounded pl-4 py-2' name="libelle" value={formData.libelle} onChange={handleChange} required />
                </div>
                <div className='py-4 px-2'>
                    <h1>Valeur : </h1>
                    <input type="number" className='border border-1 border-black rounded pl-4 py-2' name="valeur" value={formData.valeur} onChange={handleChange} required />
                </div>
                <div className='py-4 px-2'>
                    <h1>Date debut : </h1>
                    <input type="date" className='border border-1 border-black rounded px-9 py-2' name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
                </div>
                <div className='py-4 px-2'>
                    <h1>Taux d'amortissement : </h1>
                    <input type="number" className='border border-1 border-black rounded pl-4 py-2' name="tauxAmortissement" value={formData.tauxAmortissement} onChange={handleChange} required />
                </div>
                <button type="submit" className="bg-blue-600 py-4 px-7 rounded-xl text-white">Creer</button>
            </form>
        </div>
    )
}