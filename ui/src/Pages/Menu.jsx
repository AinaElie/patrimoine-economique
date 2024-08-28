import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ListPossession from '../Components/ListPossession';
import Header from '../Components/Header';

export default function Menu() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                let reponse = await axios.get('http://localhost:5000/possession');
                const dataDonne = await reponse.data
                setData(dataDonne);
            } catch (err) {
                console.log("Erreur de la recuperation : ", err);
            }
        }
        getData();
    }, []);

    if (!data) {
        return <h1>Aucune donne</h1>
    }

    return (
        <>
            <Header />
            <ListPossession/>
        </>
    )
}
