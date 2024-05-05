import React from 'react'
import { useNavigate } from 'react-router-dom'



function Error() {
  const navigate = useNavigate();
  return (
    <>
    <div style={{textAlign:"center"}}>
        <h1>Error</h1>
        <button style={{cursor:"pointer"}} onClick={()=>navigate("/")}>Login</button>
    </div>
    </>
  )
}




export default Error

