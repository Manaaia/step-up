import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clients from './features/Clients/List'
import AddClient from './features/Clients/Add'
import UpdateClient from './features/Clients/Update'
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
        <Route
          path="clients/add"
          element={ <AddClient /> }
        />
        <Route
          path="clients/:clientId"
          element={ <UpdateClient /> }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
