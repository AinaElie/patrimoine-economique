import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
// import ButtonTarget from './ButtonTarget';
import { useNavigate } from 'react-router-dom';

export default function CreatePossession() {
    const navigate = useNavigate(null);

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
                alert('Possession ajoutée avec succès !');
                navigate('/');
            } else {
                throw new Error('Erreur lors de l\'ajout du Possession')
            };
        } catch (error) {
            console.error('Erreur:', error);
            alert(error.message);
        }
    };

    return (
        <>
            <div className='container flex-fill border w-50 py-5 px-5 my-5 bg-light rounded'>
                <h3 className='px-5'>Creation de possession : </h3>
                <Form onSubmit={handleSubmit} className='row py-5 px-5'>
                    <Form.Group className="mb-3 col col-6">
                        <Form.Label>Libelle : </Form.Label>
                        <Form.Control type="text" name="libelle" value={formData.libelle} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3 col col-6">
                        <Form.Label>Valeur : </Form.Label>
                        <Form.Control type="number" name="valeur" value={formData.valeur} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3 col col-6">
                        <Form.Label>Date debut : </Form.Label>
                        <Form.Control type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3 col col-6">
                        <Form.Label>Taux d'amortissement : </Form.Label>
                        <Form.Control type="number" name="tauxAmortissement" value={formData.tauxAmortissement} onChange={handleChange} required/>
                    </Form.Group>
                    <Button type='submit' className='col col-2 mx-3'>Creer</Button>
                </Form>
            </div>
        </>
    )
}