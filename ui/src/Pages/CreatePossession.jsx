import React, { useState } from 'react'

export default function CreatePossession() {
    const [libelle, setLibelle] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setLibelle(libelle);
    }

    return (
        <div>
            <h1 className="text-3xl py-2">Creer un possession</h1>
            <form className='px-32' onSubmit={handleSubmit}>
                <div className='py-4 px-2'>
                    <h1>Libelle : </h1>
                    <input type="text" className='border border-1 border-black rounded pl-4 py-2' value={libelle} onChange={(ev) => setLibelle(ev.target.value)} />
                </div>
                <div className='py-4 px-2'>
                    <h1>Valeur : </h1>
                    <input type="number" className='border border-1 border-black rounded pl-4 py-2' />
                </div>
                <div className='py-4 px-2'>
                    <h1>Date debut : </h1>
                    <input type="date" className='border border-1 border-black rounded px-9 py-2' />
                </div>
                <div className='py-4 px-2'>
                    <h1>Taux d'amortissement : </h1>
                    <input type="number" className='border border-1 border-black rounded pl-4 py-2' />
                </div>
                <button type="submit" className="bg-blue-600 py-4 px-7 rounded-xl text-white">Creer</button>
            </form>
        </div>
    )
}