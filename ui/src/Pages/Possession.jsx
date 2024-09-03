import React from 'react'
import ListPossession from '../Components/ListPossession'
import ButtonTarget from '../Components/ButtonTarget'
import Header from '../Components/Header';

export default function Possession() {

  return (
    <div className='container'>
      <Header page={"possession"} />
      <ListPossession listpossession={true} />
      <ButtonTarget target={"/possession/create"} print={"Create Possession"} />
    </div>
  )
}