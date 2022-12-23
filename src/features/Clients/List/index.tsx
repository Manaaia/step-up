import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { deleteClient, selectAllClients, fetchClients } from "../slice"
import { Filter } from "../../../ui/Filter"
import { Client } from "../type"
import { RootState } from "../../../store"

const ClientItem: React.FC<{ client: Client, dispatch: any }> = ({ client, dispatch }) => {
  return (
    <article className="card" key={ client.id }>
      <header>{ client.name }</header>
      <button
        title="Delete"
        className="delete-button"
        onClick={ () => dispatch(deleteClient(client.id)) }
      >
        x
      </button>
      <Link className="App-link" to={ `/clients/${ client.id }` }>
        <button title="Edit" className="edit-button">Edit</button>
      </Link>
    </article>
  )
}

const List = ({ ...restProps }) => {
  const dispatch = useDispatch()<any>
  const clients = useSelector(selectAllClients)
  const clientStatus = useSelector((state: RootState) => state.clients.status)
  const error = useSelector((state: RootState) => state.clients.error)
  const [displayClients, setDisplayClients] = useState(clients)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (clientStatus === 'idle') {
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch])

  useEffect(() => {
    setDisplayClients(clients)
    filterClients(clients, filter)
  }, [clients])

  const filterClients = (clients: Client[], filter: string) => {
    setDisplayClients(clients.filter((client: Client) => {
      return client.name.includes(filter)
    } ))
  }

  let content

  if (clientStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (clientStatus === 'succeeded') {
    content =
    <>
      <div className="header">
        <Link className="App-link" to='add'><button title="Add a new client" className="add-button">+</button></Link>
      </div>
      <Filter filterValue={ filter } setFilterValue={ setFilter } listToFilter={ clients } filter={ filterClients } />
      <div className="cards">
        { displayClients.map((client: Client) => (
          <ClientItem key={ client.id } client={ client } dispatch={ dispatch } />
        )) }
      </div>
      <hr />
      <p className="footer">Number of clients in the list: { clients.length }</p>
    </>
  } else if (clientStatus === 'failed') {
    content = <div>{ error }</div>
  }

  return (
    <div { ...restProps }>
      <Link className="App-link" to="/"><button title="back" className="back-button">&#60;</button></Link>
      <h1>Client list</h1>
      { content }
    </div>
  )
}

export default styled(List)`
  padding: 20px;

  h1 {
    text-align: center;
  }

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
    justify-content: flex-end;
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
    margin: 0 0 10px;
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

  .back-button {
    background-color: rgb(173, 216, 230);
    border: none;
    border-radius: 50%;
    padding: 4px 9px;
    color: white;
    text-align: center;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  .back-button:hover {
    background-color: rgb(89, 173, 201);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }
`
