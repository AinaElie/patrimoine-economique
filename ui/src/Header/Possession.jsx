import React from 'react'
import ListPossession from '../Pages/ListPossession'
import Button from '../Components/Button'
// import ButtonCreate from '../Components/ButtonCreate'

export default function Possession() {
  return (
    <div>
        <ListPossession/>
        {/* <ButtonCreate/> */}
        <Button print={"Create Possession"} target={"create"} />
        <Button print={"Menu"} target={"/"} />
    </div>
  )
}