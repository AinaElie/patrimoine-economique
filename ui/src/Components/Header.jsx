import React from 'react'
import ButtonTarget from './ButtonTarget'

export default function Header() {
    return (
        <header className='container py-4'>
            <ButtonTarget print={"Patrimoine"} target={"/patrimoine"} />
            <ButtonTarget print={"Possession"} target={"/possession"} />
        </header>
    )
}