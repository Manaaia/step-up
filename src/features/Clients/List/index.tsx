import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { deleteClient } from "../slice"

type Client = {
  id: number
  name: string
  surname: string
}

const ClientItem: React.FC<{ client: Client, dispatch: any }> = ({ client, dispatch }) => {
  return (
    <article className="card" key={ client.id }>
      <header>{ client.name } { client.surname }</header>
      <button
        title="Delete"
        className="delete-button"
        onClick={ () => dispatch(deleteClient(client.id)) }
      >
        x
      </button>
    </article>
  )
}

const List = ({ ...restProps }) => {
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
    <div { ...restProps }>
      <Link className="App-link" to="/">Go back home</Link>
      <div className="header">
        <h1>Client list</h1>
        <Link className="App-link" to='add'><button title="Add a new client" className="add-button">+</button></Link>
      </div>
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
      <div className="cards">
        { displayClients.map((client: Client) => (
          <ClientItem key={ client.id } client={ client } dispatch={ dispatch } />
        )) }
      </div>
      <hr />
      <p className="footer">Number of clients in the list: { clients.length }</p>
    </div>
  )
}

const FilterComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 15px;
  padding: 5px 15px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
`

export default styled(List)`
  padding: 20px;

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 20px;
  }

  .card {
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px;
    display: grid;
    grid-template-columns: 10fr 1fr;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .add-button {
    background-color: rgb(173, 216, 230);
    border: none;
    border-radius: 50%;
    padding: 3px 11px;
    color: white;
    text-align: center;
    display: inline-block;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }

  .add-button:hover {
    background-color: rgb(89, 173, 201);
  }

  .delete-button {
    background-color: rgb(255, 99, 71);
    border: none;
    border-radius: 50%;
    padding: 4px 8px;
    color: white;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: rgb(255, 0, 0);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }
`
