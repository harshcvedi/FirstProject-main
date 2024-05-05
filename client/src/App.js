import React from 'react'
import Header from './components/Header'
import Login from './components/Login'
import { Routes,Route } from 'react-router-dom'
import Register from './components/Register'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from './components/Dashboard.js'
import Error from './components/Error.js'
import Adduser from './components/Adduser.js'
import Edit from './components/Edit.js'
import Details from './components/Details.js'






function App() {
  return (
    <>
      <Header/>
        
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/adduser' element={<Adduser/>} />
        <Route  path='/dashboard/edit/:id' element={<Edit/>} />
        <Route path='/dashboard/view/:id' element={<Details/>} />
        
        <Route path='*' element={<Error/>}/>

        
      </Routes>
     

    </>
  )
}


export default App