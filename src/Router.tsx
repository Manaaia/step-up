import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clients from './components/Clients'
import Home from './components/Home'


const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={ <Home /> }
        />
        <Route
          path="clients"
          element={ <Clients /> }
        />
      </Routes>
    </BrowserRouter>
  )
}


export default Router
