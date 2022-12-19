import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { deleteClient } from "../slice"
import AddClient from "../Add"

type Client = {
  id: number
  name: string
  surname: string
}

type ClientListProps = {
  displayClients: Client[],
  dispatch: any
}

const ClientList: React.FC<ClientListProps> = ({ displayClients, dispatch }) => {
  return (
    <div>
      <h2>Client list</h2>
      <ul>
        { displayClients.map((client: Client) => (
            <li key={ client.id }>
              { client.name } { client.surname }
              <button onClick={ () => dispatch(deleteClient(client.id)) }>Delete</button>
            </li>
        )) }
      </ul>
    </div>
  )
}

const List = () => {
  const clients = useSelector((state: any) => state.clients)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [displayClients, setDisplayClients] = useState(clients)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setDisplayClients(clients)
    filterClients(clients, filter)
  }, [clients])

  const filterClients = (clients: Client[], filter: string) => {
    setDisplayClients(clients.filter((client: Client) => {
      return client.name.includes(filter) || client.surname.includes(filter) || `${ client.name } ${ client.surname }`.includes(filter)
    } ))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleFilterClick = () => {
    filterClients(clients, filter)
  }

  return (
    <div>
      <h1>Clients</h1>
      <FilterComponent key="component">
        <div>
          <p>Filter</p>
          { isOpen &&
            <div>
              <input type="text" onChange={ handleChange } value={ filter } />
              <button onClick={ handleFilterClick }>Filter</button>
            </div>
          }
        </div>
        <button onClick={ () => setIsOpen(!isOpen) }>Toggle Filter</button>
      </FilterComponent>
      <ClientList displayClients={ displayClients } dispatch={ dispatch } />
      <Link className="App-link" to='add'>
        <button>Add a new client</button>
      </Link>
      <hr />
      <p>Number of clients in the list: { clients.length }</p>
      <Link className="App-link" to="/">
        Go back home
      </Link>
    </div>
  )
}

const FilterComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
`

export default List
