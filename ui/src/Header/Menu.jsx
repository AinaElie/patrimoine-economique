import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Menu() {
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
            <h1 className='text-center text-3xl py-9'>Bienvenu : {data.possesseur.nom} </h1>
            <div className='flex justify-center items-center'>
                <Link className='bg-gray-600 py-4 px-8 rounded-2xl mx-4 text-white' to="patrimoine" > Patrimoine </Link>
                <Link className='bg-gray-600 py-4 px-8 rounded-2xl mx-4 text-white' to="possession"> Possessions </Link>
            </div>
        </>
    )
}