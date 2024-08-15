import React from 'react'

export default function UpdatePossession() {
  return (
    <div>
      <h1 className="text-3xl py-2">Update possession : </h1>
      <form className='px-32'>
        <div className='py-4 px-2'>
          <h1>Libelle : </h1>
          <input type="text" className='border border-1 border-black rounded pl-4 py-2' />
        </div>
        <div className='py-4 px-2'>
          <h1>Date Fin : </h1>
          <input type="date" className='border border-1 border-black rounded px-9 py-2' />
        </div>
        <button type="submit" className="bg-blue-600 py-4 px-7 rounded-xl text-white">Update</button>
      </form>
    </div>
  )
}