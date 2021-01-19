import React from 'react'
import spinner from '../../assets/gif/spinner.gif'
export default function Spinner() {
  return (
    <div>
        <img src={spinner}
            style={{width: '200px', margin: 'auto', display: 'block'}}
            alt="Loading..."
        />
    </div>
  )
}
