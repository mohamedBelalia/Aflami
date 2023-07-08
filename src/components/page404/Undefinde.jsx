import React from 'react'
import { useNavigate } from 'react-router-dom'
import './undefinde.css'

const Undefinde = () => {
    const navigate = useNavigate()
  return (
    <div className='undefinde'>
        <div>
          <h1>404 Page Undefinde</h1>
          <button onClick={()=>navigate('/')}>Back To Home</button>
        </div>
    </div>
  )
}

export default Undefinde