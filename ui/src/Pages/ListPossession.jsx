import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function ListPossession() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('http://localhost:5000/possession');
                setData(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        }
        getData();
    }, []);

    if (!data) {
        return <div>Aucune donnée trouvée</div>;
    }

    return (
        <>
            <div>
                <h1 className='text-center text-3xl py-9'>Liste des possessions de : {data.data.possesseur.nom} </h1>
            </div>
            <div class="mx-8 my-4 shadow-md rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 border">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="py-3 px-6 text-lg text-gray-700 font-medium text-left">
                                Libellé
                            </th>
                            <th scope="col" class="py-3 px-6 text-lg text-gray-700 font-medium text-left">
                                Valeur
                            </th>
                            <th scope="col" class="py-3 px-6 text-lg text-gray-700 font-medium text-left">
                                Date de début
                            </th>
                            <th scope="col" class="py-3 px-6 text-lg text-gray-700 font-medium text-left">
                                Date Fin
                            </th>
                            <th scope="col" class="py-3 px-6 text-lg text-gray-700 font-medium text-left">Taux d'amortissement</th>
                            <th scope="col" class="py-3 px-6 text-lg text-gray-700 font-medium text-left"></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                        {data.data.possessions.map((possession, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white" >{possession.libelle}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{Math.abs(possession.valeur) || Math.abs(possession.valeurConstante)}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(possession.dateDebut).toLocaleDateString()}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{"..."}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {possession.tauxAmortissement !== null ? `${possession.tauxAmortissement}%` : 'N/A'}
                                </td>
                                <td scope="col" class="py-3 px-6 text-lg text-gray-700 text-left flex items-center">
                                    <Link to=":libelle/update" className='bg-blue-600 px-4 py-2 mr-2 text-white rounded-lg'>Edit</Link>
                                    <Link className='px-4 py-2 bg-red-600 text-white rounded-lg'>Close</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}