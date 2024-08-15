import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonCreate() {

    return (
        <button className='py-10 mx-32'>
            <Link className='bg-blue-600 py-4 px-8 rounded-xl text-white' to="create">Create Possession</Link>
        </button>
    )
}