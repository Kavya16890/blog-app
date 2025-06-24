import { useState } from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
