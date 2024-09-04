import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Possession from '/public/models/possessions/Possession.js';
import Flux from '/public/models/possessions/Flux.js';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ListPossession() {
    const [data, setData] = useState(null);
    const {libelle} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function closePossession() {
            try {
                let response = await fetch(`http://localhost:5000/possession/${libelle}/close`, {
                    method: 'PUT',
                });
                if (response.ok) {
                    alert("Possession close successfully");
                    navigate('/possession');
                } else {
                    const data = await response.json()
                    console.log("Erreur : ", data);
                }
            } catch (error) {
                console.error("Erreur sur le transfert de donne :", error);
            }
        }

        if (libelle) {
            closePossession();
        }
    }, [libelle, navigate]);

    useEffect(() => {
        async function getData() {
          try {
            let reponse = await fetch('http://localhost:5000/possession', {method: "GET"});
            const data = await reponse.json();
            setData(data);
          } catch (error) {
            console.log(error);
          }
        }
        getData();
      }, []);

    if (!data) {
        return <div>Aucune donne trouver</div>
    }

    const LesPossessions = data.possessions.filter(element => element.valeur !== 0);
    const newPossession = LesPossessions.map(element => new Possession(element.possesseur, element.libelle, element.valeur, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement));
    const LesFlux = data.possessions.filter(element => element.valeur == 0);
    const newFlux = LesFlux.map(element => new Flux(element.possesseur, element.libelle, element.valeurConstante, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement, element.jour));
    const possessions = newPossession.concat(newFlux);

    return (
        <div className='container'>
            <div className='py-3 px-5'>
                <h3>Listes des possessions : </h3>
            </div>
            <Table bordered bgcolor='green' className='table rounded-3' hover striped>
                <thead striped>
                    <tr>
                        <th>Libelle</th>
                        <th>Valeur</th>
                        <th>Date de Debut</th>
                        <th>Date de Fin</th>
                        <th>Valeur Actuelle</th>
                        <th>Taux d'amortissement</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.map((possession, index) => (
                        <tr key={index}>
                            <td className='py-3'>{possession.libelle}</td>
                            <td className='py-3'>{Math.abs(possession.valeur) || Math.abs(possession.valeurConstante)}</td>
                            <td className='py-3'>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                            <td className='py-3'>{possession.dateFin === "..." ? "..." : new Date(possession.dateFin).toLocaleDateString()}</td>
                            <td className='py-3'>{possession.getValeur(new Date()).toFixed(0)}</td>
                            <td className='py-3'>{possession.tauxAmortissement !== null ? `${possession.tauxAmortissement}%` : 0 + '%'}</td>
                            <td className='py-3'>
                                <Link to={`:${possession.libelle}/update`} className='text-decoration-none mx-2'>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <Link to={`:${possession.libelle}/close`} onClick={() => closePossession()} className='text-decoration-none text-danger'>
                                    Close
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}