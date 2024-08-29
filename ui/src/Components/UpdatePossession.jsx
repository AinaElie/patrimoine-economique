import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import ButtonTarget from './ButtonTarget';
import { Button, Form } from 'react-bootstrap';

export default function UpdatePossession() {
  const { libelle } = useParams();
  const navigate = useNavigate(null);

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
        alert("Possession update successfully");
        navigate('/');
      } else {
        throw new Error(`Erreur HTTP! statut: ${response}`);
      }
    } catch (error) {
      console.error('Il y a eu une erreur lors de la mise à jour:', error);
      alert("Erreur, Veuiller ressayer");
    }
  };

  return (
    <> 
      <div className='container flex-fill border w-50 py-5 px-5 my-5 bg-light rounded'>
        <h3 className='px-5'>Update possession : </h3>
        <Form onSubmit={handleSubmit} className='row py-5 px-5'>
          <Form.Group className="mb-3 col col-6">
            <Form.Label>Libelle : </Form.Label>
            <Form.Control type="text" name="libelle" value={newData.libelle} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-3 col col-6">
            <Form.Label>Date fin : </Form.Label>
            <Form.Control type="date" name="dateFin" value={newData.dateFin} onChange={handleChange} required/>
          </Form.Group>
          <Button type='submit' className='col col-2 mx-3'>Update</Button>
        </Form>
      </div>
    </>
  )
}