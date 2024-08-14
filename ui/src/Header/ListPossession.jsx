import React, { useEffect, useState } from 'react'
// import axios from 'axios';

export default function ListPossession() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5173/possession')
            .then((response) => setData(response.data))
            .catch(error => console.log("Erreur : ", error)
            );
    }, []);

    // useEffect(() => {
    //     fetch('http://localhost:5000/data')
    //         .then(data => setData(data))
    //         .catch(error => setError(error));
    // }, []);

    return (
        <div>
            <h1>Données:</h1>
            <h2> {data.length} </h2>
        </div>
    );

    // return (
    //     <div>
    //         <h1>Les possessions :</h1>
    //         {data.map(element => element.possesseur.nom)}
    //     </div>
    // );
}