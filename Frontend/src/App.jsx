import { useState } from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Signup from './components/Signup'

function App() {

  return (
    <>
      <Routes>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
