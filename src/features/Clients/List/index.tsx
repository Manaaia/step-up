import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import FlashMessage from "../../../ui/FlashMessage"
import { useSelector, useDispatch } from "react-redux"
import { clientAdded } from "../slice"

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
  const clients = useSelector((state: any) => state.clients)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [numberOfClients, setIncrement] = useState(clients.length)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [displayClients, setDisplayClients] = useState(clients)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setDisplayClients(clients)
    filterClients(clients, filter)
  }, [clients])

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
    dispatch(
      clientAdded({
        id: numberOfClients + 1,
        name: name,
        surname: surname
      })
    )

    setIncrement(numberOfClients + 1)

    reinitializeForm()

    setShouldShow(true)

    setTimeout(() => {
      setShouldShow(false)
    }, 2000)
  }

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

const FilterComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
`

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
