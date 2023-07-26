import React from 'react'

export default function Globalfilter({filter,setFilter}) {
  return (
    <div>
        Search:{''}
        <input value={filter}
        onChange={(e)=>setFilter(e.target.value)}/>
    </div>
  )
}
