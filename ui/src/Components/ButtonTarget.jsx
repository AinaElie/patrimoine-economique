import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default function ButtonTarget({ target, print }) {
    return (
        <>
            <Button variant='primary' className='mx-3 py-2 px-3'> 
                <Link to={target} className='text-decoration-none text-white'> {print} </Link>
            </Button>
        </>
    )
}