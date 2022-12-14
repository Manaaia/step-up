import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clients from './features/Clients/List'
import Home from './features/Home'

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
