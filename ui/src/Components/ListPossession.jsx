import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Possession from '../../../models/possessions/Possession.js';
import Flux from '../../../models/possessions/Flux.js';
import { Link } from 'react-router-dom';

export default function ListPossession() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                let reponse = await axios.get('http://localhost:5000/possession');
                const dataPrev = await reponse.data;
                setData(dataPrev);
            } catch (err) {
                console.log("Erreur : ", err);
            }
        }
        getData();
    }, []);

    if (!data) {
        return <h1>Aucune donne trouver</h1>
    }

    const LesPossessions = data.possessions.filter(element => element.valeur !== 0);
    const newPossession = LesPossessions.map(element => new Possession(element.possesseur, element.libelle, element.valeur, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement));
    const LesFlux = data.possessions.filter(element => element.valeur == 0);
    const newFlux = LesFlux.map(element => new Flux(element.possesseur, element.libelle, element.valeurConstante, new Date(element.dateDebut), element.dateFin === null ? "..." : new Date(element.dateFin), element.tauxAmortissement, element.jour));
    const possessions = newPossession.concat(newFlux);

    return (
        <div className='container'>
            <div className='py-4 d-flex justify-content-around align-items-center'>
                <h1>Liste des possessions de : {data.possesseur.nom} </h1>
            </div>
            <Table bordered className='table rounded-3'>
                <thead striped>
                    <tr>
                        <th>Libelle</th>
                        <th>Valeur</th>
                        <th>Date de Debut</th>
                        <th>Date de Fin</th>
                        <th>Valeur Actuelle</th>
                        <th>Taux d'amortissement</th>
                        <th></th>
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
                            <td>
                                <Link to={`:${possession.libelle}/update`}>
                                    {/* <i className="fa-solid fa-pen-to-square"></i> */}
                                    Edit
                                </Link>
                                <Link to={`:${possession.libelle}/close`}>
                                    <i className="fa-regular fa-circle-xmark"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}