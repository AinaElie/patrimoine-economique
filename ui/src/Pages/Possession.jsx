import React from 'react'
import ListPossession from '../Components/ListPossession'
import Header from '../Components/Header'
import ButtonTarget from '../Components/ButtonTarget'

export default function Possession() {
  return (
    <div className='container'>
      <Header />
      <ListPossession />
      <ButtonTarget target={"/possession/create"} print={"Create Possession"} />
    </div>
  )
}