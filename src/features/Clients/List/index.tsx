import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import ClientsStore from "../clients.json"
import styled from "styled-components"
import FlashMessage from "../../../ui/FlashMessage"
import { Filter, FilterComponent } from "../../../ui/FilterComponent"

type Client = {
  id: number
  name: string
  surname: string
}

type ClientListProps = {
  displayClients: Client[]
}

const ClientList: React.FC<ClientListProps> = ({ displayClients }) => {
  return (
    <div>
      <h2>Client list</h2>
      <ul>
        { displayClients.map((client: Client) => (
          <li key={ client.id }>{ client.name } { client.surname }</li>
        )) }
      </ul>
    </div>
  )
}

const List = ({ ...restProps }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [numberOfClients, setIncrement] = useState(ClientsStore.length)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [clients, setClients] = useState(ClientsStore)
  const [displayClients, setDisplayClients] = useState(clients)

  const reinitializeForm = () => {
    setName('')
    setSurname('')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value)
  }

  const handleClick = () => {
    setClients([...clients, { id: numberOfClients + 1, name: name, surname: surname }])
    setDisplayClients([...clients, { id: numberOfClients + 1, name: name, surname: surname }])

    setIncrement(numberOfClients + 1)

    reinitializeForm()

    setShouldShow(true)

    setTimeout(() => {
      setShouldShow(false)
    }, 2000)
  }

  return (
    <div { ...restProps }>
      <h1>Clients</h1>
      <FilterComponent>
        <Filter isOpen={ isOpen } list={ clients } setter={ setDisplayClients } />
        <button onClick={ () => setIsOpen(!isOpen) }>Toggle Filter</button>
      </FilterComponent>
      <FlashMessage shouldShow={ shouldShow } message="Client added" />
      <ClientList displayClients={ displayClients } />
      <hr />
      <div className="add-client-container">
        <h2>Add a new client</h2>
        <label htmlFor="name">Name: </label>
        <input name="name" type="text" onChange={ handleNameChange } value={ name }/>
        <label htmlFor="surname">Surname: </label>
        <input name="surname" type="text" onChange={ handleSurnameChange } value={ surname } />
        <button onClick={ handleClick }>Add</button>
      </div>
      <hr />
      <p>Number of clients of the list: { numberOfClients }</p>
      <Link
        className="App-link"
        to="/"
      >
        Go back home
      </Link>
    </div>
  )
}

export default styled(List)`
  .add-client-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button {
      margin-top: 10px;
    }
  }
`
